import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  BookOpen, 
  CircleDollarSign, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings, 
  GraduationCap, 
  UserCheck, 
  Library, 
  Briefcase 
} from 'lucide-react';

interface SidebarProps {
  role: string;
}

const getRoleLinks = (role: string) => {
  const commonLinks = [
    { name: 'Settings', href: `/${role}/settings`, icon: Settings },
  ];

  switch (role) {
    case 'admin':
      return [
        { name: 'Dashboard', href: '/admin', icon: Home },
        { name: 'Teachers', href: '/admin/teachers', icon: Briefcase },
        { name: 'Students', href: '/admin/students', icon: GraduationCap },
        { name: 'Parents', href: '/admin/parents', icon: Users },
        { name: 'Finances', href: '/admin/finances', icon: CircleDollarSign },
        ...commonLinks,
      ];
    case 'teacher':
      return [
        { name: 'Dashboard', href: '/teacher', icon: Home },
        { name: 'My Classes', href: '/teacher/classes', icon: BookOpen },
        { name: 'Attendance', href: '/teacher/attendance', icon: UserCheck },
        { name: 'Assignments', href: '/teacher/assignments', icon: FileText },
        ...commonLinks,
      ];
    case 'student':
      return [
        { name: 'Dashboard', href: '/student', icon: Home },
        { name: 'My Courses', href: '/student/courses', icon: BookOpen },
        { name: 'Attendance', href: '/student/attendance', icon: UserCheck },
        { name: 'Time Table', href: '/student/timetable', icon: Calendar },
        { name: 'Results', href: '/student/results', icon: BarChart3 },
        ...commonLinks,
      ];
    case 'parent':
      return [
        { name: 'Dashboard', href: '/parent', icon: Home },
        { name: 'Children', href: '/parent/children', icon: Users },
        { name: 'Fees', href: '/parent/fees', icon: CircleDollarSign },
        { name: 'Notices', href: '/parent/notices', icon: FileText },
        ...commonLinks,
      ];
    case 'principal':
      return [
        { name: 'Dashboard', href: '/principal', icon: Home },
        { name: 'Analytics', href: '/principal/analytics', icon: BarChart3 },
        { name: 'Staff', href: '/principal/staff', icon: Users },
        ...commonLinks,
      ];
    case 'accountant':
      return [
        { name: 'Dashboard', href: '/accountant', icon: Home },
        { name: 'Fee Collection', href: '/accountant/fees', icon: CircleDollarSign },
        { name: 'Expenses', href: '/accountant/expenses', icon: FileText },
        ...commonLinks,
      ];
    case 'librarian':
      return [
        { name: 'Dashboard', href: '/librarian', icon: Home },
        { name: 'Books', href: '/librarian/books', icon: Library },
        { name: 'Issued', href: '/librarian/issued', icon: BookOpen },
        ...commonLinks,
      ];
    case 'staff':
      return [
        { name: 'Dashboard', href: '/staff', icon: Home },
        { name: 'Attendance', href: '/staff/attendance', icon: UserCheck },
        { name: 'Payroll', href: '/staff/payroll', icon: CircleDollarSign },
        ...commonLinks,
      ];
    default:
      return [
        { name: 'Dashboard', href: '/', icon: Home },
      ];
  }
};

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const links = getRoleLinks(role);

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white shadow-xl transition-transform duration-300 ease-in-out">
      <div className="flex h-16 items-center justify-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">EduCore</span>
        </div>
      </div>

      <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {role.charAt(0).toUpperCase() + role.slice(1)} Portal
        </div>
        
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
