import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import CustomDrawer from "../components/CustomDrawer";
import { useState, useEffect } from "react";



const MainLayout = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const toggleThemeDropdown = () => setThemeDropdownOpen((prev) => !prev);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setThemeDropdownOpen(false);
    if (newTheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    } else {
      setIsDarkMode(newTheme === "dark");
    }
  };

  useEffect(() => {
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    } else {
      setIsDarkMode(theme === "dark");
    }
  }, [theme]);


  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">

        <CustomDrawer
          isOpen={isDrawerOpen}
          isDarkMode={isDarkMode}
          onClose={() => setDrawerOpen(false)}
          onThemeChange={handleThemeChange}
          currentTheme={theme}
          themeDropdownOpen={themeDropdownOpen}
          toggleThemeDropdown={toggleThemeDropdown}// ✅ Pass user here
        />

        <main className="p-0">
          <Header stuff={{ toggleDrawer }} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
