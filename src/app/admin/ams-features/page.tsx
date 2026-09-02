"use client";

import { useEffect, useState } from "react";
import { AMSFeatureSchema } from "@/lib/validations";

export default function AdminAMSFeaturesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "code",
    tone: "from-indigo-500 to-blue-600",
    sortOrder: 0,
    active: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/ams-features");
    const data = await res.json();
    if (data.success) setItems(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = AMSFeatureSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    const url = editingItem ? `/api/admin/ams-features/${editingItem.id}` : "/api/admin/ams-features";
    const method = editingItem ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({
        title: "",
        description: "",
        icon: "code",
        tone: "from-indigo-500 to-blue-600",
        sortOrder: 0,
        active: true,
      });
      fetchItems();
    } else {
      const data = await res.json();
      if (data.details) setErrors(data.details);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      icon: item.icon,
      tone: item.tone,
      sortOrder: item.sortOrder,
      active: item.active,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`/api/admin/ams-features/${id}`, { method: "DELETE" });
      if (res.ok) fetchItems();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage AMS Features</h1>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({
              title: "",
              description: "",
              icon: "code",
              tone: "from-indigo-500 to-blue-600",
              sortOrder: 0,
              active: true,
            });
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Add Feature
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-semibold">Feature</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={3} className="px-6 py-4 text-center">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-4 text-center text-slate-500">No features found</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="text-sm text-slate-700">
                  <td className="px-6 py-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${item.tone} flex items-center justify-center text-white text-[10px]`}>
                            ICON
                        </div>
                        {item.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900 font-bold uppercase text-[10px] tracking-widest">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 font-bold uppercase text-[10px] tracking-widest">Delete</button>
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
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{editingItem ? "Edit Feature" : "Add Feature"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={`w-full px-4 py-2 border rounded-lg ${errors.title ? 'border-red-500' : ''}`} />
                  {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title[0]}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Icon Key</label>
                  <input type="text" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full px-4 py-2 border rounded-lg" placeholder="e.g., monitor, code, mobile" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`w-full px-4 py-2 border rounded-lg ${errors.description ? 'border-red-500' : ''}`} rows={3} />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description[0]}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Gradient Tone</label>
                  <select value={formData.tone} onChange={(e) => setFormData({ ...formData, tone: e.target.value })} className="w-full px-4 py-2 border rounded-lg">
                    <option value="from-indigo-500 to-blue-600">Indigo to Blue</option>
                    <option value="from-sky-500 to-blue-600">Sky to Blue</option>
                    <option value="from-rose-500 to-red-600">Rose to Red</option>
                    <option value="from-emerald-500 to-teal-600">Emerald to Teal</option>
                    <option value="from-amber-500 to-orange-600">Amber to Orange</option>
                    <option value="from-violet-500 to-purple-600">Violet to Purple</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sort Order</label>
                  <input type="number" value={formData.sortOrder} onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })} className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <input type="checkbox" checked={formData.active} onChange={(e) => setFormData({ ...formData, active: e.target.checked })} />
                 <label className="text-sm font-medium">Active on Frontend</label>
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-lg font-bold text-slate-500 uppercase text-xs tracking-widest">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold uppercase text-xs tracking-widest">Save Feature</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
