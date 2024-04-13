import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
        <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* Add your logo or site name here */}
                <span className="text-white font-bold text-lg">Admin Dashboard</span>
              </div>
              <div className="hidden md:block">
                {/* Add navigation links */}
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/Dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                  <Link to="/CourseForm" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Courses</Link>
                  <Link to="/AddUsers" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Users</Link>
                  {/* Add more navigation links as needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar