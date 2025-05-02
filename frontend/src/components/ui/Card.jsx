import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-[#2E073F] hover:scale-105 rounded-lg shadow-sm border transition-transform duration-500 border-gray-100 overflow-hidden ${className}`}
    >
      {children }
    </div>
  );
};
