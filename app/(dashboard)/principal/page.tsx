import React from 'react';
import StatCard from '@/src/components/ui/StatCard';
import { Users, GraduationCap, BarChart3, Clock } from 'lucide-react';

export default function PrincipalDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Principal's Office</h1>
          <p className="text-slate-500">School operations and academic oversight</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Enrollment" 
          value="2,845" 
          icon={GraduationCap} 
        />
        <StatCard 
          title="Staff Present" 
          value="142 / 152" 
          icon={Users} 
        />
        <StatCard 
          title="Avg Attendance" 
          value="95.4%" 
          icon={Clock} 
          trend="0.5%" 
          trendUp={true} 
        />
        <StatCard 
          title="Academic Performance" 
          value="B+" 
          icon={BarChart3} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h2 className="text-lg font-semibold text-slate-900 mb-4">Pending Approvals</h2>
           <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                  <div>
                      <p className="text-sm font-medium text-slate-900">Staff Leave Request</p>
                      <p className="text-xs text-slate-500">Mr. Smith • Math Dept</p>
                  </div>
                  <button className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100 font-medium transition">Review</button>
              </div>
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                  <div>
                      <p className="text-sm font-medium text-slate-900">Event Budget: Science Fair</p>
                      <p className="text-xs text-slate-500">$1,500 Request</p>
                  </div>
                  <button className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100 font-medium transition">Review</button>
              </div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h2 className="text-lg font-semibold text-slate-900 mb-4">School Calendar Alerts</h2>
           <ul className="space-y-4">
              <li className="flex items-center gap-3">
                  <div className="bg-rose-100 text-rose-600 px-2 py-1 rounded text-xs font-bold">Today</div>
                  <p className="text-sm text-slate-700">Quarter 1 Grades Submission Deadline</p>
              </li>
              <li className="flex items-center gap-3">
                  <div className="bg-amber-100 text-amber-600 px-2 py-1 rounded text-xs font-bold">Tomorrow</div>
                  <p className="text-sm text-slate-700">School Board Meeting</p>
              </li>
               <li className="flex items-center gap-3">
                  <div className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded text-xs font-bold">Friday</div>
                  <p className="text-sm text-slate-700">Teacher Training Day (Half Day for Students)</p>
              </li>
           </ul>
        </div>
      </div>
    </div>
  );
}
