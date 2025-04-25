import React from 'react';
import { Header } from './Header';

export const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LeetCode Profile Viewer
      </footer>
    </div>
  );
};