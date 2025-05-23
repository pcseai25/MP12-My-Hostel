import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { CgProfile } from 'react-icons/cg';
import { MdNotificationsActive } from 'react-icons/md';
import { IoAlertCircle } from 'react-icons/io5';

import StudentProfile from '../lib/const/StudentProfile.json';

const { name, hostel: hostelName } = StudentProfile[0];

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 h-screen w-screen fixed overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative lg:flex ${
          sidebarOpen ? 'flex' : 'hidden'
        } z-50 bg-white w-64 h-full shadow-lg transition-all duration-300`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Top Bar */}
        <div className="h-[7vh] w-full bg-neutral-100 border-y-[1px] border-blue-950 flex items-center px-2">
          {/* Toggle Sidebar Button (Mobile Only) */}
          <button
            className="text-gray-600 hover:text-gray-400 text-xl lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          {/* Right Side Icons and Info */}
          <div className="ml-auto flex items-center gap-5 mb-2 mt-2">
            {/* Notifications */}
            <Link
              className="text-gray-600 hover:text-gray-400 text-xl"
              to="/notifications"
            >
              <MdNotificationsActive />
            </Link>

            {/* Alerts */}
            <Link
              className="text-gray-600 hover:text-gray-400 text-xl"
              to="/alerts"
            >
              <IoAlertCircle />
            </Link>

            {/* User Info */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col text-right leading-tight">
                <span className="block text-xs font-semibold">{name}</span>
                <span className="block text-[12px] text-gray-600">
                  {hostelName}
                </span>
              </div>
              <Link
                className="text-gray-600 hover:text-gray-400 text-[35px]"
                to="/profile"
              >
                <CgProfile />
              </Link>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-auto p-4 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
