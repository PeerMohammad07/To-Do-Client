import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Menu, X, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../api/userApi";
import { userLogout } from "../redux/userSlice";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userData = useSelector((state)=> state.user.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const motivationalQuotes = [
    "Progress is progress.",
    "Your approach defines you.",
    "Organize. Transform.",
    "Every task counts.",
    "Keep moving forward.",
  ];

  const [currentQuote] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  const handleLogout = async () => {
    try {
      await logout()
      dispatch(userLogout())
      navigate('/login')
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/to-do-logo.png"
              alt="Task Management Logo"
              className="h-10 w-auto transform transition-transform hover:scale-105"
            />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Motivational Quote */}
          <div className="hidden md:flex items-center space-x-2 text-center">
            <Sparkles className="text-purple-500" />
            <span className="text-gray-700 font-medium italic">
              "{currentQuote}"
            </span>
            <Sparkles className="text-purple-500" />
          </div>

          {/* User Management */}
          <div className="hidden md:flex items-center space-x-4">
            {userData ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-sm text-gray-800">
                    {userData?.name || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  <LogOut />
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/register"
                  className="
      px-4 py-1 
      border border-gray-800 
      text-gray-800 
      text-sm 
      font-medium 
      rounded-full 
      transition duration-200
      hover:bg-gray-800 hover:text-white
    "
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="
      px-5 py-1.5 
     border border-gray-800 
      text-gray-800 
      text-sm 
      font-medium 
      rounded-full 
      transition duration-200
      hover:bg-gray-800 hover:text-white    
    "
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          {/* Motivational Quote for Mobile */}
          <div className="text-center py-4 border-b">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="text-purple-500" />
              <span className="text-gray-700 font-medium italic">
                "{currentQuote}"
              </span>
              <Sparkles className="text-purple-500" />
            </div>
          </div>

          {/* Mobile User Management */}
          <div className="px-4 py-4 space-y-4">
            {userData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center bg-gray-100 py-3 rounded-lg">
                  <User className="w-5 h-5 mr-2 text-gray-600" />
                  <span className="font-semibold text-gray-800">
                    {userData?.name || "User"}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="
                    w-full 
                    px-6 py-3 
                    border-2 border-red-500 
                    text-red-500 
                    font-semibold 
                    rounded-lg 
                    transition duration-300
                    hover:bg-red-500 hover:text-white
                  "
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/register"
                  className="
                    w-full 
                    px-6 py-3 
                    border-2 border-gray-800 
                    text-gray-800 
                    font-semibold 
                    rounded-lg 
                    text-center 
                    block
                    transition duration-300
                    hover:bg-gray-800 hover:text-white
                  "
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="
                    w-full 
                    px-6 py-3 
                    bg-gray-800 
                    text-white 
                    font-semibold 
                    rounded-lg 
                    text-center 
                    block
                    transition duration-300
                    hover:bg-white hover:text-gray-800 
                    hover:border-2 hover:border-gray-800
                  "
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
