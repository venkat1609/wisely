// src/layout/Layout.tsx
import { useState } from "react";
import React from "react";
import { Moon, Sun, Menu, User } from "lucide-react";
import { cn } from "../lib/utils";

const Layout = ({ children }: { children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={cn(
        "min-h-screen flex",
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      )}
    >
      {/* Sidebar */}
      <aside
        className={cn(
          "transition-all duration-300 ease-in-out w-64 p-4 bg-white dark:bg-gray-800 shadow-lg",
          sidebarOpen ? "block" : "hidden md:block"
        )}
      >
        <div className="text-2xl font-bold mb-4">Wisely4U</div>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:text-indigo-500">
            Dashboard
          </a>
          <a href="#" className="hover:text-indigo-500">
            Transactions
          </a>
          <a href="#" className="hover:text-indigo-500">
            Reports
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="relative group">
              <User size={20} />
              <div className="absolute right-0 mt-2 p-2 hidden group-hover:block bg-white dark:bg-gray-700 shadow rounded w-40">
                <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600">
                  Profile
                </button>
                <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
