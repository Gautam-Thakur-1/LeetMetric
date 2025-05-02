import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../store/ThemeContext";
import { Button } from "../ui/Button";
import { Moon, Sun } from 'lucide-react';

export const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="bg-white dark:bg-[#7A1CAC]  shadow-sm">
      <div className=" container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 dark:text-white text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <span className="tracking-widest font-semibold text-lg">
            LeetMetric
          </span>
        </Link>
        <Button
          size="small"
          variant="secondary"
          onClick={toggleTheme}
          className={`${
            darkMode
              ? "bg-[#2E073F]  hover:bg-gray-950 hover:text-white"
              : " text-slate-950"
          } rounded-[20px] size-15`}
        >
          {darkMode ? <Sun/> :<Moon />}
        </Button>
      </div>
    </header>
  );
};
