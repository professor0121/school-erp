'use client';

import React, { useEffect } from 'react';
import StatCard from '@/src/components/ui/StatCard';
import { Users, GraduationCap, Briefcase, CircleDollarSign } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardStats } from '@/src/redux/slice/dashboardSlice';
import { RootState, AppDispatch } from '@/src/redux/store';
import LoadingSpinner from '@/src/components/ui/LoadingSpinner';

export default function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, loading, error } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading && !stats) {
     return <div className="h-[60vh] flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  }

  if (error) {
     return (
       <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl">
         <h2 className="text-lg font-semibold mb-2">Error loading dashboard</h2>
         <p>{error}</p>
       </div>
     );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
          value={stats?.totalStudents?.toLocaleString() || "0"} 
          icon={GraduationCap} 
          trend="12%" 
          trendUp={true} 
        />
        <StatCard 
          title="Total Staff" 
          value={stats?.totalStaff?.toLocaleString() || "0"} 
          icon={Briefcase} 
          trend="3%" 
          trendUp={true} 
        />
        <StatCard 
          title="Active Parents" 
          value={stats?.activeParents?.toLocaleString() || "0"} 
          icon={Users} 
          trend="8%" 
          trendUp={true} 
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${stats?.totalRevenue?.toLocaleString() || "0"}`} 
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
