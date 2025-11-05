import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" }
];

export default function NavigationMenu({ className = "" }) {
  const location = useLocation();

  return (
    <nav className={`bg-white border-b shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-900">
              MyBrand
            </Link>
          </div>
          <div className="hidden sm:flex space-x-8">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? "text-blue-600 font-semibold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="sm:hidden">
            {/* Mobile menu toggle button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-label="Open main menu"
              // onClick logic for mobile menu toggling would go here
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel (hidden by default) */}
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
