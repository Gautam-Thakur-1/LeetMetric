import React from "react";
import { Header } from "./Header";
import { useLocation } from "react-router-dom";

export const AppLayout = ({ children }) => {
  const location = useLocation();
  const showHeader = location.pathname.startsWith("/profile");

  return (
    <div className="min-h-screen   bg-gray-50">
      {!showHeader && <Header />}
      <main className="min-h-screen">{children}</main>
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LeetMetric
      </footer>
    </div>
  );
};
