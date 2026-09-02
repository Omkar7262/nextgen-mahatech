"use client";

import { useEffect, useState } from "react";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    client: "",
    role: "",
    quote: "",
    rating: 5,
    image: "",
    active: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/testimonials");
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

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body,
    });
    const data = await res.json();
    if (data.success) {
      setFormData({ ...formData, image: data.url });
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingItem 
      ? `/api/admin/testimonials/${editingItem.id}` 
      : "/api/admin/testimonials";
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
        client: "",
        role: "",
        quote: "",
        rating: 5,
        image: "",
        active: true,
      });
      fetchItems();
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      client: item.client,
      role: item.role || "",
      quote: item.quote,
      rating: item.rating,
      image: item.image || "",
      active: item.active,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) fetchItems();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Testimonials</h1>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({
              client: "",
              role: "",
              quote: "",
              rating: 5,
              image: "",
              active: true,
            });
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Add Testimonial
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-semibold">Client</th>
              <th className="px-6 py-3 font-semibold">Feedback Preview</th>
              <th className="px-6 py-3 font-semibold">Rating</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-slate-500">No testimonials found</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="text-sm text-slate-700">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden border">
                      {item.image ? (
                        <img src={item.image} className="h-full w-full object-cover" alt="" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold uppercase">{item.client[0]}</div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{item.client}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{item.role}</div>
                      <div className={`text-[10px] font-bold uppercase ${item.active ? 'text-green-600' : 'text-red-600'}`}>
                        {item.active ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs truncate text-slate-500 italic text-xs">
                        “{item.quote}”
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-0.5 text-amber-400">
                       {Array.from({ length: item.rating }).map((_, r) => (
                           <svg key={r} className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                       ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900 font-semibold">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 font-semibold">Delete</button>
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
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{editingItem ? "Edit Testimonial" : "Add Testimonial"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                  <input type="text" required value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                  <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quote</label>
                <textarea required rows={3} value={formData.quote} onChange={(e) => setFormData({ ...formData, quote: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rating (1-5)</label>
                  <input type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Client Image</label>
                   <input type="file" onChange={handleImageUpload} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                   {uploading && <p className="text-xs text-indigo-600 mt-1">Uploading...</p>}
                   {formData.image && <p className="text-xs text-green-600 mt-1">Uploaded: {formData.image}</p>}
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">{editingItem ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
