'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Extract role from the first path segment (e.g., /admin/... => admin)
  // Default to 'admin' if not found for UI demonstration purposes
  const roleMatch = pathname.match(/^\/([^\/]+)/);
  const role = roleMatch ? roleMatch[1] : 'admin';

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar for Desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 text-white z-50">
        <Sidebar role={role} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:pl-64 w-full transition-all duration-300">
        <Header role={role} />
        <main className="flex-1 overflow-y-auto w-full">
          <div className="p-6 sm:p-8 w-full max-w-7xl mx-auto">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}
