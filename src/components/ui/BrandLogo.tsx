"use client";

import Image from "next/image";
import { useState } from "react";

export default function BrandLogo({ 
  light = false,
  className = "h-12 w-auto"
}: { 
  light?: boolean,
  className?: string 
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <span className={`text-xl font-black tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}>
        NextGen <span className={light ? 'text-indigo-400' : 'text-indigo-600'}>MahaTech</span>
      </span>
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="NextGen MahaTech"
      width={120}
      height={48}
      className={className}
      onError={() => setError(true)}
    />
  );
}
