import React from 'react';
import StatCard from '@/src/components/ui/StatCard';
import { Library, BookOpen, Clock, AlertTriangle } from 'lucide-react';

export default function LibrarianDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Library Management</h1>
          <p className="text-slate-500">Manage books, issues, and returns</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Books" 
          value="12,450" 
          icon={Library} 
        />
        <StatCard 
          title="Issued Books" 
          value="342" 
          icon={BookOpen} 
        />
        <StatCard 
          title="Due Today" 
          value="24" 
          icon={Clock} 
        />
        <StatCard 
          title="Overdue" 
          value="12" 
          icon={AlertTriangle} 
          trend="Action required" 
          trendUp={false} 
        />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions & Search</h2>
         <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input type="text" placeholder="Search by Book Title, Author, or ISBN..." className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">Issue Book</button>
            <button className="bg-slate-100 text-slate-700 px-6 py-2 rounded-lg font-medium hover:bg-slate-200 transition">Return Book</button>
         </div>

         <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                 <tr>
                   <th className="px-4 py-3 font-medium">Book Title</th>
                   <th className="px-4 py-3 font-medium">Issued To</th>
                   <th className="px-4 py-3 font-medium">Issue Date</th>
                   <th className="px-4 py-3 font-medium">Due Date</th>
                 </tr>
               </thead>
               <tbody>
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                     <td className="px-4 py-3 font-medium text-slate-900">Introduction to Physics</td>
                     <td className="px-4 py-3 text-slate-600">Jane Doe (Grade 10)</td>
                     <td className="px-4 py-3 text-slate-500">Oct 12, 2026</td>
                     <td className="px-4 py-3 text-slate-500">Oct 26, 2026</td>
                  </tr>
                  <tr className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                     <td className="px-4 py-3 font-medium text-slate-900">Advanced Calculus</td>
                     <td className="px-4 py-3 text-slate-600">Mark Smith (Grade 12)</td>
                     <td className="px-4 py-3 text-slate-500">Oct 05, 2026</td>
                     <td className="px-4 py-3 text-rose-500 font-medium">Oct 19, 2026 (Overdue)</td>
                  </tr>
               </tbody>
             </table>
         </div>
      </div>
    </div>
  );
}
