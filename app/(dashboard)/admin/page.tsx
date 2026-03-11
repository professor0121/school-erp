import React from 'react';
import StatCard from '@/src/components/ui/StatCard';
import { Users, GraduationCap, Briefcase, CircleDollarSign } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500">Overview of your institution's performance</p>
        </div>
        <div className="flex gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
           <span>Academic Year:</span>
           <span className="font-semibold text-slate-900">2026-2027</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Students" 
          value="2,845" 
          icon={GraduationCap} 
          trend="12%" 
          trendUp={true} 
        />
        <StatCard 
          title="Total Staff" 
          value="152" 
          icon={Briefcase} 
          trend="3%" 
          trendUp={true} 
        />
        <StatCard 
          title="Active Parents" 
          value="1,930" 
          icon={Users} 
          trend="8%" 
          trendUp={true} 
        />
        <StatCard 
          title="Total Revenue" 
          value="$124,500" 
          icon={CircleDollarSign} 
          trend="4.5%" 
          trendUp={false} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="h-2 w-2 mt-2 rounded-full bg-indigo-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900 mb-1">New Admission Processed</p>
                  <p className="text-xs text-slate-500">2 hours ago • Application #A00{i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-sm font-medium text-slate-700">Add New Student</button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-sm font-medium text-slate-700">Send Announcement</button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-sm font-medium text-slate-700">Generate Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}
