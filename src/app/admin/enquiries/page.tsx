"use client";

import { useEffect, useState } from "react";

export default function AdminEnquiriesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch("/api/enquiries");
    const data = await res.json();
    if (data.success) setItems(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`/api/api/enquiries/${id}`, { method: "DELETE" }); // Using existing route if possible or creating a new one
      // Actually, I'll check if temp_repo/app/api/enquiries/[id]/route.ts exists
      if (res.ok) fetchItems();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Manage Enquiries</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Email</th>
              <th className="px-6 py-3 font-semibold">Service</th>
              <th className="px-6 py-3 font-semibold">Message</th>
              <th className="px-6 py-3 font-semibold">Date</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={6} className="px-6 py-4 text-center">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-4 text-center text-slate-500">No enquiries found</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="text-sm text-slate-700">
                  <td className="px-6 py-4 font-medium">{item.fullName}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.service || "General"}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{item.message}</td>
                  <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 font-semibold">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
