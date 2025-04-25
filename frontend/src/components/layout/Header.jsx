import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className=" container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <span className="font-semibold text-lg">LeetCode Profile</span>
        </Link>
        <div className="flex items-center space-x-2 ">
          <Link
            to="/login"
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <span className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">Login</span>
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};
