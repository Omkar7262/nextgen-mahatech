import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const enquiryCount = await prisma.enquiry.count();
  const serviceCount = await prisma.service.count();
  const testimonialCount = await prisma.testimonial.count();
  const teamCount = await prisma.teamMember.count();
  const portfolioCount = await prisma.portfolio.count();

  const stats = [
    { name: "Enquiries", value: enquiryCount, href: "/admin/enquiries", color: "bg-blue-500" },
    { name: "Services", value: serviceCount, href: "/admin/services", color: "bg-indigo-500" },
    { name: "Testimonials", value: testimonialCount, href: "/admin/testimonials", color: "bg-purple-500" },
    { name: "Team", value: teamCount, href: "/admin/team", color: "bg-rose-500" },
    { name: "Portfolio", value: portfolioCount, href: "/admin/portfolio", color: "bg-cyan-500" },
  ];

  const recentEnquiries = await prisma.enquiry.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <div className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.name}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Enquiries</h2>
            <a href="/admin/enquiries" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View all</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Service</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="text-sm text-slate-700">
                    <td className="px-6 py-4 font-medium">{enquiry.fullName}</td>
                    <td className="px-6 py-4">{enquiry.service || "General"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        enquiry.status === "NEW" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                      }`}>
                        {enquiry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Content Status */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
           <h2 className="text-lg font-bold text-slate-900 mb-6">Live Website Status</h2>
           <div className="space-y-4">
              <StatusRow label="Home Page" pages={["hero", "vision_mission", "cta"]} />
              <StatusRow label="About Page" pages={["about"]} />
              <StatusRow label="AMS Product" pages={["ams"]} />
              <StatusRow label="Contact Details" pages={["contact"]} />
           </div>
           
           <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Active Data Modules</h3>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-2xl font-black text-indigo-600">{serviceCount}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Services</div>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-2xl font-black text-rose-600">{teamCount}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Team Members</div>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-2xl font-black text-cyan-600">{portfolioCount}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Portfolio</div>
                 </div>
                 <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-2xl font-black text-purple-600">{testimonialCount}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Testimonials</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatusRow({ label, pages }: { label: string, pages: string[] }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-sm font-bold text-slate-700">{label}</span>
            <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase">Dynamic</span>
            </div>
        </div>
    )
}
