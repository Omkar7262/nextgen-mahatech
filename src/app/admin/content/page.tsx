"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ContentManager() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") || "";

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    page: "home",
    section: "",
    key: "",
    value: "",
    type: "text",
  });

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content");
    const data = await res.json();
    if (data.success) {
      let filtered = data.data;
      if (pageParam) {
        filtered = data.data.filter((i: any) => i.page === pageParam);
      }
      setItems(filtered);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [pageParam]);

  useEffect(() => {
    if (pageParam) {
        setFormData(prev => ({ ...prev, page: pageParam }));
    }
  }, [pageParam]);

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
      setFormData({ ...formData, value: data.url });
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingItem 
      ? `/api/admin/content/${editingItem.id}` 
      : "/api/admin/content";
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
        page: pageParam || "home",
        section: "",
        key: "",
        value: "",
        type: "text",
      });
      fetchItems();
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      page: item.page,
      section: item.section,
      key: item.key,
      value: item.value,
      type: item.type,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`/api/admin/content/${id}`, { method: "DELETE" });
      if (res.ok) fetchItems();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 capitalize">
          {pageParam ? `${pageParam} Content` : "All Page Content"}
        </h1>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({
              page: pageParam || "home",
              section: "",
              key: "",
              value: "",
              type: "text",
            });
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Add Content
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-semibold">Section / Key</th>
              <th className="px-6 py-3 font-semibold">Content Preview</th>
              <th className="px-6 py-3 font-semibold">Type</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-slate-500">No content found</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="text-sm text-slate-700">
                  <td className="px-6 py-4">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.section}</div>
                    <div className="font-bold text-slate-900">{item.key}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-md truncate text-slate-500 italic">
                      {item.type === "image" ? (
                        <div className="flex items-center gap-2">
                          <img src={item.value} alt="" className="h-8 w-12 object-cover rounded border" />
                          <span className="text-[10px] text-indigo-500 font-bold">IMAGE</span>
                        </div>
                      ) : (
                        item.value
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold uppercase text-slate-500">{item.type}</span>
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
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{editingItem ? "Edit Content" : "Add Content"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Page</label>
                  <input type="text" required value={formData.page} onChange={(e) => setFormData({ ...formData, page: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="home, about, etc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Section</label>
                  <input type="text" required value={formData.section} onChange={(e) => setFormData({ ...formData, section: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="hero, mission, etc." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Key</label>
                  <input type="text" required value={formData.key} onChange={(e) => setFormData({ ...formData, key: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="title, subtitle, etc." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="text">Text</option>
                    <option value="html">HTML</option>
                    <option value="image">Image URL</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Value</label>
                {formData.type === "image" ? (
                  <div className="space-y-2">
                    <input type="file" onChange={handleImageUpload} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                    <input type="text" value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Image URL" />
                    {uploading && <p className="text-xs text-indigo-600">Uploading...</p>}
                  </div>
                ) : (
                  <textarea required rows={5} value={formData.value} onChange={(e) => setFormData({ ...formData, value: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                )}
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

export default function AdminContentPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading Content Manager...</div>}>
            <ContentManager />
        </Suspense>
    );
}
