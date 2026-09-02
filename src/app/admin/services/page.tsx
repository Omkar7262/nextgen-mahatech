"use client";

import { useEffect, useState } from "react";

import { ServiceSchema } from "@/lib/validations";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    tagline: "",
    description: "",
    icon: "code",
    image: "",
    active: true,
    sortOrder: 0,
  });
  const [uploading, setUploading] = useState(false);

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

  const fetchServices = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    if (data.success) setServices(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Client-side validation
    const result = ServiceSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    const url = editingService 
      ? `/api/admin/services/${editingService.id}` 
      : "/api/admin/services";
    const method = editingService ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingService(null);
      setFormData({
        title: "",
        slug: "",
        tagline: "",
        description: "",
        icon: "code",
        image: "",
        active: true,
        sortOrder: 0,
      });
      fetchServices();
    } else {
        const data = await res.json();
        if (data.details) setErrors(data.details);
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      tagline: service.tagline || "",
      description: service.description,
      icon: service.icon || "code",
      image: service.image || "",
      active: service.active,
      sortOrder: service.sortOrder,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) fetchServices();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Manage Services</h1>
        <button
          onClick={() => {
            setEditingService(null);
            setFormData({
              title: "",
              slug: "",
              tagline: "",
              description: "",
              icon: "code",
              image: "",
              active: true,
              sortOrder: 0,
            });
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Add Service
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-semibold">Service Name</th>
              <th className="px-6 py-3 font-semibold">Description Preview</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center">Loading...</td></tr>
            ) : services.length === 0 ? (
              <tr><td colSpan={4} className="px-6 py-4 text-center text-slate-500">No services found</td></tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="text-sm text-slate-700">
                  <td className="px-6 py-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold uppercase">{service.icon[0]}</div>
                        {service.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs truncate text-slate-500 italic text-xs">
                        {service.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      service.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {service.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-indigo-600 hover:text-indigo-900 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-900 font-semibold"
                    >
                      Delete
                    </button>
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
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {editingService ? "Edit Service" : "Add New Service"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.title ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 outline-none`}
                  />
                  {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title[0]}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.slug ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 outline-none`}
                  />
                  {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug[0]}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.description ? 'border-red-500' : 'border-slate-300'} focus:ring-2 focus:ring-indigo-500 outline-none`}
                />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description[0]}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="code">Code</option>
                    <option value="monitor">Monitor</option>
                    <option value="phone">Phone</option>
                    <option value="cloud">Cloud</option>
                    <option value="shield">Shield</option>
                    <option value="grid">Grid</option>
                    <option value="chart">Chart</option>
                    <option value="wrench">Wrench</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Service Image (Optional)</label>
                  <input type="file" onChange={handleImageUpload} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                  {uploading && <p className="text-xs text-indigo-600 mt-1">Uploading...</p>}
                  {formData.image && <p className="text-xs text-green-600 mt-1">Uploaded: {formData.image}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="flex items-end pb-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded"
                    />
                    <span className="text-sm font-medium text-slate-700">Active</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                >
                  {editingService ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
