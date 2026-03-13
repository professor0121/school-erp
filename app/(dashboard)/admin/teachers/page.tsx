'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, User } from '@/src/redux/slice/usersSlice';
import { RootState, AppDispatch } from '@/src/redux/store';
import DataTable, { ColumnDef } from '@/src/components/ui/DataTable';
import { Search, Filter, Plus } from 'lucide-react';

export default function TeachersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, totalCount } = useSelector((state: RootState) => state.users);
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Pass role as 'teacher' to filter backend results
    dispatch(fetchUsers({ role: 'TEACHER', page: 1, limit: 10 }));
  }, [dispatch]);

  const columns: ColumnDef<User>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (user) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
             {user.name.charAt(0)}
          </div>
          <span className="font-medium text-slate-900">{user.name}</span>
        </div>
      ),
    },
    { header: 'Email', accessorKey: 'email' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (user) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
        }`}>
          {user.status}
        </span>
      )
    },
    { header: 'Joined', accessorKey: 'createdAt' },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Teachers ({totalCount})</h1>
          <p className="text-slate-500">Manage all teaching staff</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
           <Plus className="h-4 w-4" />
           Add Teacher
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
         <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search teachers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
         </div>
         <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors w-full sm:w-auto">
            <Filter className="h-4 w-4" />
            Filters
         </button>
      </div>

      {error ? (
        <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          <h2 className="text-lg font-semibold mb-2">Error loading teachers</h2>
          <p>{error}</p>
        </div>
      ) : (
        <DataTable 
          data={filteredUsers} 
          columns={columns} 
          keyExtractor={(user) => user.id}
          loading={loading}
          emptyMessage={searchTerm ? "No teachers found matching your search." : "No teachers available."}
        />
      )}
    </div>
  );
}
