'use client';

import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <Link href="/" className="text-2xl font-bold text-indigo-700">
        Sahayak AI
      </Link>
      
      <div className="flex items-center space-x-4">
        {isAuthenticated && user ? (
          <>
            <span className="text-gray-600">Welcome, {user.name}</span>
            <button
              onClick={logout}
              className="text-indigo-600 hover:underline font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="space-x-4">
            <Link href="/login" className="text-indigo-600 hover:underline font-medium">
              Login
            </Link>
            <Link href="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}