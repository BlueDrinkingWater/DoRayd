// pages/owner/Layout.jsx - Updated with tour management navigation
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/Login';
import { assets, ownerMenuLinks } from '../../assets/assets';

// Updated owner menu links with tour management
const updatedOwnerMenuLinks = [
  {
    path: '/owner',
    name: 'Dashboard',
    icon: assets.dashboard_icon,
    coloredIcon: assets.dashboardIconColored
  },
  // Car Management Section
  {
    path: '/owner/add-car',
    name: 'Add Car',
    icon: assets.add_icon,
    coloredIcon: assets.addIconColored
  },
  {
    path: '/owner/manage-cars',
    name: 'Manage Cars',
    icon: assets.car_icon,
    coloredIcon: assets.carIconColored
  },
  {
    path: '/owner/manage-bookings',
    name: 'Car Bookings',
    icon: assets.list_icon,
    coloredIcon: assets.listIconColored
  },
  // Tour Management Section
  {
    path: '/owner/add-tour-package',
    name: 'Add Tour Package',
    icon: assets.add_icon, // You can use a different icon if available
    coloredIcon: assets.addIconColored
  },
  {
    path: '/owner/manage-tour-packages',
    name: 'Manage Tour Packages',
    icon: assets.car_icon, // Replace with tour/location icon if available
    coloredIcon: assets.carIconColored
  },
  {
    path: '/owner/manage-tour-bookings',
    name: 'Tour Bookings',
    icon: assets.list_icon,
    coloredIcon: assets.listIconColored
  }
];

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <img src={assets.logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          <div className="px-3">
            {/* Section Headers */}
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Dashboard
            </div>
            
            {/* Dashboard Link */}
            <NavLink
              to="/owner"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? assets.dashboardIconColored : assets.dashboard_icon}
                    alt="Dashboard"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Dashboard</span>
                </>
              )}
            </NavLink>

            {/* Car Management Section */}
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-6 px-3">
              Car Management
            </div>
            
            <NavLink
              to="/owner/add-car"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? assets.addIconColored : assets.add_icon}
                    alt="Add Car"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Add Car</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/owner/manage-cars"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? assets.carIconColored : assets.car_icon}
                    alt="Manage Cars"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Manage Cars</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/owner/manage-bookings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? assets.listIconColored : assets.list_icon}
                    alt="Car Bookings"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Car Bookings</span>
                </>
              )}
            </NavLink>

            {/* Tour Management Section */}
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-6 px-3">
              Tour Management
            </div>
            
            <NavLink
              to="/owner/add-tour-package"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-600 border-l-4 border-green-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? assets.addIconColored : assets.add_icon}
                    alt="Add Tour Package"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Add Tour Package</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/owner/manage-tour-packages"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-600 border-l-4 border-green-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? assets.carIconColored : assets.car_icon}
                    alt="Manage Tour Packages"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Manage Tour Packages</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/owner/manage-tour-bookings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-600 border-l-4 border-green-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? assets.listIconColored : assets.list_icon}
                    alt="Tour Bookings"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Tour Bookings</span>
                </>
              )}
            </NavLink>
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user?.image || assets.user_profile}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'Owner User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || 'owner@example.com'}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                Business Dashboard
              </h1>
              
              {/* Quick Actions */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Online
                </div>
                
                {/* Notifications */}
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 19h10a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;