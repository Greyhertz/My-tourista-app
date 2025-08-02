import { Link } from "react-router-dom";
import * as Icon from "@phosphor-icons/react";

type Theme = "system" | "light" | "dark";

interface NavbarProps {
  onClose: () => void;
  onThemeChange: (them:Theme) => void;
  currentTheme: Theme;
  themeDropdownOpen: boolean;
  toggleThemeDropdown: () => void;
  isDarkMode: boolean;
}


export default function Navbar({
  onClose,
  onThemeChange,
  themeDropdownOpen,
  toggleThemeDropdown,
}: NavbarProps)
{
  
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition relative h-full">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full"
        aria-label="Close drawer"
      >
        <Icon.X size={20} />
      </button>

      {/* User Profile Section */}
      <div className="user flex flex-row items-center gap-3 px-4 py-4 border-b dark:border-gray-700">
        <img
          className="w-10 h-10 rounded-full border-2 object-cover"
          src="https://i.pravatar.cc/100"
          alt="User"
        />
        <h3 className="text-md font-serif text-blue-500 text-2xl">
          Prince Onuoha
        </h3>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-4 text-sm">
          {/* Theme Selector */}
          <li className="relative">
            <button
              onClick={toggleThemeDropdown}
              className="w-full flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-400 dark:hover:bg-blue-600 "
            >
              <span className="font-semibold">
                <Icon.Palette size={20} />
              </span>
              <span>Theme</span>
            </button>
          
            {themeDropdownOpen && (
              <ul className="absolute bg-white dark:bg-gray-800 text-black dark:text-white left-full ml-2 mt-1 rounded shadow-md z-10">
                <li
                  className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer focus focus:to-blue-500"
                  onClick={() => onThemeChange('light')}
                >
                  <Icon.Sun size={20} className="mr-2" weight="fill" />
                  Light
                </li>
                <li
                  className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => onThemeChange('dark')}
                >
                  <Icon.Moon size={20} className="mr-2" weight="fill" />
                Dark
                </li>
                <li
                  className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => onThemeChange('system')}
                >
                  <Icon.Desktop size={20} className="mr-2" weight="fill" />
                  System``  
                </li>
              </ul>
            )}
          </li>

          {/* Navigation Items */}
          <li>
            <Link
              to="explore-destination"
              onClick={onClose}
              className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
            >
              
              <span>
                <Icon.Path size={20} weight="fill" />
              </span>
              <span>Explore Destinations</span>
            </Link>
          </li>
          <li>
            <Link
              to="profile"
              onClick={onClose}
              className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
            >
              <span>
                <Icon.Lightbulb size={20} weight="fill" />
              </span>
              <span>Travel Tips</span>
            </Link>
          </li>
          <li>
            <Link
              to="book-trip"
              onClick={onClose}
              className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
            >
              <span>
                <Icon.CalendarDots size={20} weight="fill" />
              </span>
              <span>Book Your Trip</span>
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              onClick={onClose}
              className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
            >
              <span>
                <Icon.PhoneOutgoing size={20} weight="fill" />
              </span>
              <span>Contact Us</span>
            </Link>
          </li>

          <li>
            <Link
              to="Blog"
              onClick={onClose}
              className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
            >
              <span>
                <Icon.PhoneOutgoing size={20} weight="fill" />
              </span>
              <span>Blog</span>
            </Link>
          </li>
          <li>
            <Link
              to="settings"
              onClick={onClose}
              className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
            >
              <span>
                <Icon.GearFine size={20} weight="fill" />
              </span>
              <span>Account Settings</span>
            </Link>
          </li>
          <li>
            <button
              onClick={onClose}
              className="w-full flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
            >
              <span>
                <Icon.SignOut size={20} weight="fill" />
              </span>
              <span>Log Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}