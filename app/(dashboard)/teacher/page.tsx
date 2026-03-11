import React from 'react';
import StatCard from '@/src/components/ui/StatCard';
import { BookOpen, Users, Calendar, Clock } from 'lucide-react';

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, Math Teacher!</h1>
          <p className="text-slate-500">Here's your schedule and class overview for today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Classes Today" 
          value="4" 
          icon={Calendar} 
        />
        <StatCard 
          title="Total Students" 
          value="142" 
          icon={Users} 
        />
        <StatCard 
          title="Pending Assignments" 
          value="24" 
          icon={BookOpen} 
          trend="8 new" 
          trendUp={true} 
        />
        <StatCard 
          title="Hours Logged" 
          value="34.5" 
          icon={Clock} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Today's Schedule</h2>
          <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {['09:00 AM - Grade 10 Math', '11:00 AM - Grade 11 Physics', '01:00 PM - Grade 12 Advanced Math', '03:00 PM - Remedial Session'].map((schedule, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 group-[.is-active]:bg-indigo-500 text-slate-500 group-[.is-active]:text-indigo-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                   <Clock className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900 text-sm">{schedule}</div>
                  </div>
                  <div className="text-slate-500 text-xs">Room {101 + i}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h2 className="text-lg font-semibold text-slate-900 mb-4">Pending Grading</h2>
           <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
                 <div>
                    <h3 className="font-medium text-slate-900 text-sm">Algebra Mid-term</h3>
                    <p className="text-xs text-slate-500">Grade {9+i} • Due 2 days ago</p>
                 </div>
                 <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-lg hover:bg-indigo-100 transition-colors">
                    Grade Now
                 </button>
              </div>
            ))}
           </div>
        </div>
      </div>
    </div>
  );
}
