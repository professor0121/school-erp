import React from 'react';
import StatCard from '@/src/components/ui/StatCard';
import { BookOpen, Award, CalendarCheck, Clock } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-slate-900">Hi, Jane! 👋</h1>
           <p className="text-slate-500">Here's your academic progress and upcoming tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Attendance" 
          value="94%" 
          icon={CalendarCheck} 
          trend="2%" 
          trendUp={true} 
        />
        <StatCard 
          title="Current GPA" 
          value="3.8" 
          icon={Award} 
          trend="0.1" 
          trendUp={true} 
        />
        <StatCard 
          title="Active Courses" 
          value="6" 
          icon={BookOpen} 
        />
        <StatCard 
          title="Upcoming Exams" 
          value="2" 
          icon={Clock} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-4">
             <h2 className="text-lg font-semibold text-slate-900">Upcoming Assignments</h2>
             <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                 <tr>
                   <th className="px-4 py-3 font-medium">Subject</th>
                   <th className="px-4 py-3 font-medium">Assignment</th>
                   <th className="px-4 py-3 font-medium">Due Date</th>
                   <th className="px-4 py-3 font-medium">Status</th>
                 </tr>
               </thead>
               <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                     <td className="px-4 py-4 font-medium text-slate-900">Physics</td>
                     <td className="px-4 py-4 text-slate-600">Lab Report #4</td>
                     <td className="px-4 py-4 text-slate-600">Tomorrow</td>
                     <td className="px-4 py-4"><span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full font-medium">Pending</span></td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                     <td className="px-4 py-4 font-medium text-slate-900">Math</td>
                     <td className="px-4 py-4 text-slate-600">Calculus Worksheet</td>
                     <td className="px-4 py-4 text-slate-600">Oct 24</td>
                     <td className="px-4 py-4"><span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full font-medium">Pending</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                     <td className="px-4 py-4 font-medium text-slate-900">History</td>
                     <td className="px-4 py-4 text-slate-600">Essay Draft</td>
                     <td className="px-4 py-4 text-slate-600">Oct 26</td>
                     <td className="px-4 py-4"><span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full font-medium">Submitted</span></td>
                  </tr>
               </tbody>
             </table>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h2 className="text-lg font-semibold text-slate-900 mb-4">Notice Board</h2>
           <div className="space-y-4">
             <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-200 to-transparent opacity-50 rounded-bl-full" />
                <h3 className="font-semibold text-indigo-900 text-sm mb-1">Science Fair Registration</h3>
                 <p className="text-indigo-700 text-xs leading-relaxed">Registrations for the annual science fair close this Friday. Make sure to submit your ideas!</p>
             </div>
             <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 relative overflow-hidden">
                <h3 className="font-semibold text-emerald-900 text-sm mb-1">Sports Day</h3>
                 <p className="text-emerald-700 text-xs leading-relaxed">Sign up for track and field events on the main notice board.</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
