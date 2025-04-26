import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border hover:scale-105 transition-transform duration-500 border-gray-100 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};
