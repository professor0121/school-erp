'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2, AlertCircle, User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/redux/store';
import { loginUser } from '@/src/redux/slice/authSlice';
import Link from 'next/link';

export default function LoginForm() {
  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(loginUser({ uniqueId, password })).unwrap();
      // Redirection is handled by the server response or middleware depending on the role
      // For a seamless experience, we force a router refresh to re-evaluate the middleware 
      // and send the user to the correct dashboard based on the cookie.
      router.refresh();
      router.push('/');
    } catch (err: any) {
      setError(err || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 flex items-center gap-3 text-sm animate-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="flex-1 font-medium">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="uniqueId">
            Unique ID
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
              <User className="h-5 w-5" />
            </div>
            <input
              id="uniqueId"
              type="text"
              required
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 focus:bg-white transition-all duration-200"
              placeholder="e.g. ADM001"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <Link href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
              <Lock className="h-5 w-5" />
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 focus:bg-white transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer select-none">
          Remember me for 30 days
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Signing in...
          </span>
        ) : (
          'Sign in to Dashboard'
        )}
      </button>

      {/* Demo Credentials Helper */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Demo Credentials</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-white rounded-lg border border-gray-100 cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => { setUniqueId('ADM001'); setPassword('password123'); }}>
            <span className="font-semibold text-indigo-600 block">Admin</span>
            <span className="text-gray-500 truncate">ADM001</span>
          </div>
          <div className="p-2 bg-white rounded-lg border border-gray-100 cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => { setUniqueId('TCH001'); setPassword('password123'); }}>
            <span className="font-semibold text-indigo-600 block">Teacher</span>
            <span className="text-gray-500 truncate">TCH001</span>
          </div>
        </div>
      </div>
    </form>
  );
}
