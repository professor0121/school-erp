import React from 'react';
import StatCard from '@/src/components/ui/StatCard';
import { CircleDollarSign, Calendar, FileText, Bell } from 'lucide-react';

export default function ParentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Parent Portal</h1>
          <p className="text-slate-500">Monitor your children's progress and school updates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Upcoming Fees" 
          value="$450" 
          icon={CircleDollarSign} 
        />
        <StatCard 
          title="Events This Week" 
          value="3" 
          icon={Calendar} 
        />
        <StatCard 
          title="New Notices" 
          value="2" 
          icon={Bell} 
        />
        <StatCard 
          title="Pending Signatures" 
          value="1" 
          icon={FileText} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Children Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-slate-100 bg-slate-50 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                 <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">J</div>
                 <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">Jane Doe</h3>
                    <p className="text-sm text-slate-500">Grade 10 • Section A</p>
                 </div>
                 <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">Attendance</div>
                    <div className="text-sm text-emerald-600 font-bold">94%</div>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-slate-100 bg-slate-50 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                 <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">M</div>
                 <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">Mark Doe</h3>
                    <p className="text-sm text-slate-500">Grade 7 • Section C</p>
                 </div>
                 <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">Attendance</div>
                    <div className="text-sm text-emerald-600 font-bold">98%</div>
                 </div>
              </div>
            </div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Communications</h2>
            <div className="space-y-4">
                <div className="flex gap-4">
                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900">PTA Meeting Scheduled</h4>
                        <p className="text-sm text-slate-600 mt-1">The monthly PTA meeting will be held virtually this Friday at 6 PM.</p>
                        <p className="text-xs text-slate-400 mt-2">Yesterday</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="mt-1 w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900">Fee Reminder</h4>
                        <p className="text-sm text-slate-600 mt-1">Term 2 fees are due by the end of the month.</p>
                        <p className="text-xs text-slate-400 mt-2">Oct 15</p>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
}
