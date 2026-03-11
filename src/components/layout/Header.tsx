import React from 'react';
import { Bell, Search, Menu, User } from 'lucide-react';

interface HeaderProps {
  role: string;
}

export default function Header({ role }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white/80 px-4 shadow-sm backdrop-blur-md sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button could go here if implemented */}
      <button type="button" className="-m-2.5 p-2.5 text-slate-700 lg:hidden hover:text-indigo-600 transition-colors">
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm bg-transparent outline-none"
            placeholder="Search..."
            type="search"
            name="search"
          />
        </form>
        
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button type="button" className="-m-2.5 p-2.5 text-slate-400 hover:text-indigo-600 transition-colors relative">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200" aria-hidden="true" />

          {/* Profile dropdown Placeholder */}
          <div className="flex items-center gap-x-4">
            <button className="flex items-center gap-x-2 rounded-full p-1 border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors shadow-sm">
               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                  <User className="h-5 w-5 text-indigo-600" />
               </div>
               <span className="hidden lg:flex lg:items-center pr-2">
                 <span className="text-sm font-semibold leading-6 text-slate-900" aria-hidden="true">
                   {role.charAt(0).toUpperCase() + role.slice(1)} User
                 </span>
               </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
