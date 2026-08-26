"use client";

import { useState } from "react";
import type { EnquiryInput } from "../lib/types";
import { Reveal3D } from "../lib/anim";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const payload: EnquiryInput = {
      fullName: String((form.elements.namedItem("fullName") as HTMLInputElement)?.value ?? ""),
      company: String((form.elements.namedItem("company") as HTMLInputElement)?.value ?? ""),
      email: String((form.elements.namedItem("email") as HTMLInputElement)?.value ?? ""),
      phone: String((form.elements.namedItem("phone") as HTMLInputElement)?.value ?? ""),
      service: String((form.elements.namedItem("service") as HTMLSelectElement)?.value ?? ""),
      message: String((form.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? ""),
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result?.success) {
        setSent(true);
      } else {
        setError(result?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to reach the server. Please try again.");
    }
    setLoading(false);
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal3D className="h-full">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-5">
              Get in touch
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Let's talk about your{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                next project
              </span>
            </h2>
            <p className="mt-5 text-slate-600 text-lg">
              Reach out for a no-obligation consultation. We usually respond
              within one working day.
            </p>

            <div className="mt-10 space-y-5">
              <ContactRow icon={phoneIcon} label="Phone" value="+91 95794 95373" href="tel:9579495373" />
              <ContactRow icon={mailIcon} label="Email" value="nextgenmahatech@gmail.com" href="mailto:nextgenmahatech@gmail.com" />
              <ContactRow
                icon={pinIcon}
                label="Office"
                value={`Shree Ganesh Park, Near Patil Park,\nJadhav Township, Ambad Link Road,\nNashik – 422010, Maharashtra, India`}
              />
              <ContactRow icon={clockIcon} label="Working Hours" value={`Mon – Sat: 9:30 AM – 7:00 PM\nSunday: Closed`} />
            </div>

            <div className="mt-10 flex items-center gap-3">
              {[
                { l: "LinkedIn", d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" },
                { l: "Facebook", d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { l: "Twitter", d: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
              ].map((s) => (
                <a key={s.l} href="#" aria-label={s.l} className="h-10 w-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 flex items-center justify-center transition">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </Reveal3D>

          <Reveal3D delay={0.1} className="h-full">
          <div className="rounded-3xl bg-white p-8 md:p-10 shadow-xl shadow-slate-200/60 border border-slate-100">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Thank you!</h3>
                <p className="mt-2 text-slate-600 max-w-sm">
                  Your enquiry has been received. Our team will get back to you within one working day.
                </p>
                <button onClick={() => { setSent(false); setError(null); }} className="mt-6 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold text-slate-900">Send us a message</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full name" name="fullName" required />
                  <Field label="Company" name="company" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Service of interest</label>
                  <select name="service" defaultValue="" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white outline-none transition">
                    <option value="" disabled>Select a service</option>
                    {["Custom Software Development", "Website Design & Development", "Mobile App Development", "Cloud & DevOps", "Cybersecurity & Networking", "ERP / CRM Solutions", "IT Support & AMC", "Other"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Tell us about your project</label>
                  <textarea name="message" rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white outline-none transition resize-none" placeholder="A few sentences about what you need..." />
                </div>

                {error && <div className="rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-sm">{error}</div>}

                <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all disabled:opacity-60">
                  {loading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                        <path d="M21 12a9 9 0 1 1-6.2-8.56" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Enquiry
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-500 text-center">
                  By submitting you agree to be contacted by NextGen Mahatech regarding your enquiry.
                </p>
              </form>
            )}
          </div>
          </Reveal3D>
        </div>
      </div>
    </section>
  );
}

const phoneIcon = <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />;
const mailIcon = <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>;
const pinIcon = <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>;
const clockIcon = <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>;

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input type={type} name={name} required={required} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white outline-none transition" />
    </div>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex gap-4">
      <div className="shrink-0 h-11 w-11 rounded-xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center shadow-sm">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</div>
        <div className="mt-1 text-slate-800 font-medium whitespace-pre-line leading-relaxed">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-80 transition">{content}</a>
  ) : (
    content
  );
}
