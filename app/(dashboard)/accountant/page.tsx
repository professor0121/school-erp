import React from 'react';
import StatCard from '@/src/components/ui/StatCard';
import { CircleDollarSign, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';

export default function AccountantDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Finance & Accounting</h1>
          <p className="text-slate-500">Manage fee collections and expenses</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Collected (This Month)" 
          value="$84,500" 
          icon={CircleDollarSign} 
          trend="12% vs last month" 
          trendUp={true} 
        />
        <StatCard 
          title="Pending Dues" 
          value="$12,400" 
          icon={CreditCard} 
        />
        <StatCard 
          title="Total Expenses" 
          value="$24,100" 
          icon={TrendingDown} 
          trend="5% vs last month" 
          trendUp={false} 
        />
        <StatCard 
          title="Net Balance" 
          value="$60,400" 
          icon={TrendingUp} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Transactions</h2>
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
                <tbody>
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-2">
                        <p className="font-medium text-slate-900">Term 2 Fee</p>
                        <p className="text-xs text-slate-500">Student ID: #S{1000 + i}</p>
                      </td>
                      <td className="py-3 px-2 text-right">
                         <span className="font-semibold text-emerald-600">+$450.00</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h2 className="text-lg font-semibold text-slate-900 mb-4">Pending Fee Follow-ups</h2>
           <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 bg-slate-50">
                   <div>
                     <p className="text-sm font-medium text-slate-900">Grade {9+i} • Mark Doe</p>
                     <p className="text-xs text-rose-500 font-medium">Overdue by {i * 2} days</p>
                   </div>
                   <button className="text-xs font-semibold px-3 py-1.5 bg-white border border-slate-200 rounded hover:bg-slate-50 transition shadow-sm">Send Reminder</button>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
