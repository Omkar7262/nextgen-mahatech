"use client";

import { useEffect, useState } from "react";

export default function AdminTeamPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    bio: "",
    sortOrder: 0,
    active: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/team");
    const data = await res.json();
    if (data.success) setItems(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json();
    if (data.success) setFormData({ ...formData, image: data.url });
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingItem ? `/api/admin/team/${editingItem.id}` : "/api/admin/team";
    const method = editingItem ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setIsModalOpen(false);
      fetchItems();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Team</h1>
        <button onClick={() => { setEditingItem(null); setFormData({ name: "", role: "", image: "", bio: "", sortOrder: 0, active: true }); setIsModalOpen(true); }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700">Add Member</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-semibold">Member</th>
              <th className="px-6 py-3 font-semibold">Role</th>
              <th className="px-6 py-3 font-semibold">Bio Preview</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (<tr><td colSpan={4} className="px-6 py-4 text-center">Loading...</td></tr>) : items.length === 0 ? (<tr><td colSpan={4} className="px-6 py-4 text-center text-slate-500">No members found</td></tr>) : (
              items.map((item) => (
                <tr key={item.id} className="text-sm text-slate-700">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden border">
                      {item.image ? (
                        <img src={item.image} className="h-full w-full object-cover" alt="" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold uppercase">{item.name[0]}</div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className={`text-[10px] font-bold uppercase ${item.active ? 'text-green-600' : 'text-red-600'}`}>
                        {item.active ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{item.role}</td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs truncate text-slate-500 italic text-xs">
                      {item.bio || "No bio provided"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => { setEditingItem(item); setFormData({ name: item.name, role: item.role, image: item.image || "", bio: item.bio || "", sortOrder: item.sortOrder, active: item.active }); setIsModalOpen(true); }} className="text-indigo-600 hover:text-indigo-900 font-semibold">Edit</button>
                    <button onClick={async () => { if(confirm("Are you sure?")) { await fetch(`/api/admin/team/${item.id}`, { method: "DELETE" }); fetchItems(); } }} className="text-red-600 hover:text-red-900 font-semibold">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{editingItem ? "Edit Member" : "Add Member"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Name</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" /></div>
                <div><label className="block text-sm font-medium mb-1">Role</label><input type="text" required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-2 border rounded-lg" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Bio</label><textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="w-full px-4 py-2 border rounded-lg" rows={3} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium mb-1">Image</label>
                   <input type="file" onChange={handleImageUpload} className="text-xs" />
                   {uploading && <p className="text-xs text-indigo-600">Uploading...</p>}
                   {formData.image && <p className="text-xs text-green-600">Uploaded: {formData.image}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <div><label className="block text-sm font-medium mb-1">Sort Order</label><input type="number" value={formData.sortOrder} onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })} className="w-20 px-2 py-2 border rounded-lg" /></div>
                  <label className="flex items-center gap-2 mt-6"><input type="checkbox" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} /> Active</label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
