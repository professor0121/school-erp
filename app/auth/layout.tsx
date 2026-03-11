import React from 'react';
import { School } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden min-h-[600px]">
        {/* Branding Section */}
        <div className="bg-indigo-600 text-white p-12 flex flex-col justify-between hidden md:flex relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/50 rounded-full blur-3xl -ml-20 -mb-20"></div>
          
          <div className="relative z-10 flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <School className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">EduCore</span>
          </div>

          <div className="relative z-10 space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Manage your institution with ease
            </h1>
            <p className="text-indigo-100/90 text-lg leading-relaxed">
              A comprehensive ERP solution designed to streamline academic, administrative, and financial operations.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-sm text-indigo-200">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600 bg-indigo-400 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt={`User ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span>Trusted by 500+ schools</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
          {children}
        </div>
      </div>
    </div>
  );
}
