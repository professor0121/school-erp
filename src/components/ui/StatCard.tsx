import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 truncate">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className={`font-medium ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
          <span className="text-slate-500">vs last month</span>
        </div>
      )}
      
      {/* Decorative background element */}
      <div className="absolute -right-4 -top-4h-24 w-24 rounded-full bg-gradient-to-br from-indigo-100 to-transparent opacity-20 blur-2xl group-hover:opacity-40 transition-opacity pointer-events-none" />
    </div>
  );
}
