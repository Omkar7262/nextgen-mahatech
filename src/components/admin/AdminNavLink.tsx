"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminNavLink({ 
  href, 
  children,
  className = ""
}: { 
  href: string, 
  children: React.ReactNode,
  className?: string
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Extract base path and query params for comparison
  const [basePath, queryStr] = href.split('?');
  const isActive = pathname === basePath && (!queryStr || searchParams.toString() === queryStr.split('=')[1] || searchParams.get('page') === queryStr.split('=')[1]);

  return (
    <Link 
      href={href} 
      className={cn(
        "block px-4 py-2 rounded-lg transition-colors text-sm font-medium",
        isActive 
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
          : "text-slate-400 hover:bg-slate-800 hover:text-white",
        className
      )}
    >
      {children}
    </Link>
  );
}
