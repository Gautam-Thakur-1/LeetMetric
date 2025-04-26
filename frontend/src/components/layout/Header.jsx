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
          <span className="tracking-widest font-semibold text-lg">LeetMetric</span>
        </Link>
      </div>
    </header>
  );
};
