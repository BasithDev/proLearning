import React, { useState,useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaUsersCog, FaBookOpen, FaBars, FaTimes, FaChartLine } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const AdminLayout = () => {

  useEffect(() => {
    document.title = 'Pro Learning - Admin';
}, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { theme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative md:translate-x-0 z-30 h-full bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full w-64">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Admin Panel
            </h2>
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
            >
              <FaTimes size={24} />
            </button>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin/dashboard"
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive('/admin/dashboard')
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaChartLine size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard/moderators"
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive('/admin/dashboard/moderators')
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaUsersCog size={20} />
                  <span>Manage Moderators</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard/topics"
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive('/admin/dashboard/topics')
                      ? 'bg-blue-600 text-white dark:bg-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FaBookOpen size={20} />
                  <span>Manage Topics</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center p-4">
            <button
              onClick={toggleSidebar}
              className="md:hidden mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
            >
              <FaBars size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {location.pathname === '/admin/dashboard' && 'Dashboard'}
              {location.pathname === '/admin/dashboard/moderators' && 'Manage Moderators'}
              {location.pathname === '/admin/dashboard/topics' && 'Manage Topics'}
            </h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="h-[calc(100vh-4rem)] overflow-auto bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;