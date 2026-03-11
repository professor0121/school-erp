import { Metadata } from 'next';
import LoginForm from '@/src/components/auth/LoginForm';
import { School } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login - EduCore ERP',
  description: 'Login to access your ERP dashboard',
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center">
        <div className="md:hidden flex items-center justify-center gap-2 mb-6 text-indigo-600">
          <School className="w-8 h-8" />
          <span className="text-2xl font-bold tracking-tight text-gray-900">EduCore</span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Please sign in to your account to continue
        </p>
      </div>

      <div className="mt-8">
        <LoginForm />
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">
        Don&apos;t have an account?{' '}
        <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
          Contact administrator
        </Link>
      </p>
    </div>
  );
}
