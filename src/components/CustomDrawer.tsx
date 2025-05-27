import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import * as Icon from "@phosphor-icons/react";
import { Link } from "react-router-dom";

type Theme = "system" | "light" | "dark";

interface CustomDrawerProps {
  isOpen: boolean;
  isDarkMode: boolean;
  onClose: () => void;
  onThemeChange: (theme: Theme) => void;
  currentTheme: Theme;
  themeDropdownOpen: boolean;
  toggleThemeDropdown: () => void;
}



export default function CustomDrawer({
  isOpen,
  isDarkMode,
  onClose,
  onThemeChange,
  currentTheme,
  themeDropdownOpen,
  toggleThemeDropdown
}: CustomDrawerProps) {
  return (
    <Drawer
      key={currentTheme}
      open={isOpen}
      onClose={onClose}
      direction="left"
      size={280}
      duration={400}
      enableOverlay={true}
      overlayOpacity={0.6}
      lockBackgroundScroll={false}
      className={`${isDarkMode ? "dark" : ""}`}
    >
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition relative rounded h-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full"
          aria-label="Close drawer"
        >
          <Icon.X size={20} />
        </button>

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

         <nav>
              <ul className="space-y-4 text-sm">
                <li className="relative">
                  <button
                    onClick={toggleThemeDropdown}
                    className="w-full flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-400 dark:hover:bg-blue-600"
                  >
                    <span className="font-semibold">
                      <Icon.Palette size={20} />
                    </span>
                    <span>Theme</span>
                  </button>
                  {themeDropdownOpen && (
                    <ul className="absolute bg-white dark:bg-gray-800 text-black dark:text-white left-full ml-2 mt-1 rounded shadow-md z-10">
                      <li
                        className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => onThemeChange("light")}
                      >
                        <Icon.Sun size={20} className="mr-2" />
                        Light
                      </li>
                      <li
                        className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => onThemeChange("dark")}
                      >
                        <Icon.Moon size={20} className="mr-2" />
                        Dark
                      </li>
                      <li
                        className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => onThemeChange("system")}
                      >
                        <Icon.Desktop size={20} className="mr-2" />
                        System
                      </li>
                    </ul>
                  )}
                </li>

                {/* Other Nav Items */}
                <li>
                  <Link
                    to="explore-destination"
                    className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                  >
                    <span>
                      <Icon.Path size={20} />
                    </span>
                    <span>Explore Destinations</span>
                  </Link>
                </li>
                <li>
                  <a
                    href=""
                    className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                  >
                    <span>
                      <Icon.Lightbulb size={20} />
                    </span>
                    <span>Travel Tips</span>
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="flex items-center space-x-3 text-black hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                  >
                    <span>
                      <Icon.CalendarDots size={20} />
                    </span>
                    <span>Book Your Trip</span>
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                  >
                    <span>
                      <Icon.PhoneOutgoing size={20} />
                    </span>
                    <span>Contact Us</span>
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                  >
                    <span>
                      <Icon.GearFine size={20} />
                    </span>
                    <span>Account Settings</span>
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="flex items-center space-x-3 text-black dark:text-white hover:text-blue-700 transition font-sans font-semibold p-4 border-l-4 border-l-transparent hover:border-l-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                  >
                    <span>
                      <Icon.SignOut size={20} />
                    </span>
                    <span>Log-Out</span>
                  </a>
                </li>
              </ul>
            </nav>
      </div>
    </Drawer>
  );
}
