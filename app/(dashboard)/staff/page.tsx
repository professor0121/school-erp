import React from 'react';
import StatCard from '@/src/components/ui/StatCard';
import { UserCheck, Calendar, Briefcase, FileText } from 'lucide-react';

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Staff Portal</h1>
          <p className="text-slate-500">View your attendance, schedule, and HR records</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Attendance (Oct)" 
          value="18/20" 
          icon={UserCheck} 
        />
        <StatCard 
          title="Leaves Remaining" 
          value="4" 
          icon={Calendar} 
        />
        <StatCard 
          title="Next Payday" 
          value="Oct 31" 
          icon={Briefcase} 
        />
        <StatCard 
          title="Pending Approvals" 
          value="1" 
          icon={FileText} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-4">
             <h2 className="text-lg font-semibold text-slate-900">Recent Notices (Staff Only)</h2>
           </div>
           
           <div className="space-y-4">
             <div className="p-4 rounded-xl border border-slate-100 hover:shadow-sm transition bg-slate-50">
                <h3 className="font-semibold text-slate-900 text-sm">Quarterly Performance Reviews</h3>
                <p className="mt-1 text-sm text-slate-600">Reviews will be conducted next week. Please submit your self-evals.</p>
                <div className="mt-2 text-xs text-slate-400">Posted 2 days ago by HR</div>
             </div>
             <div className="p-4 rounded-xl border border-slate-100 hover:shadow-sm transition">
                <h3 className="font-semibold text-slate-900 text-sm">IT System Maintenance</h3>
                <p className="mt-1 text-sm text-slate-600">The ERP portal will be down from 12 AM to 2 AM on Saturday.</p>
                <div className="mt-2 text-xs text-slate-400">Posted 4 days ago by IT Admin</div>
             </div>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h2 className="text-lg font-semibold text-slate-900 mb-4">Leave Application</h2>
           <form className="space-y-4">
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
                 <select className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                    <option>Casual Leave</option>
                    <option>Sick Leave</option>
                    <option>Earned Leave</option>
                 </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">From Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">To Date</label>
                    <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                 </div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                 <textarea rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Brief reason for leave..." />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition">Submit Request</button>
           </form>
        </div>
      </div>
    </div>
  );
}
