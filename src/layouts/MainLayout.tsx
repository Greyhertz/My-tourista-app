// import { Outlet } from 'react-router-dom';
// import Header from '../components/core/Header';
// import CustomDrawer from '../components/core/CustomDrawer';
// import { useState, useEffect } from 'react';

// const MainLayout = () => {
//   const [isDrawerOpen, setDrawerOpen] = useState(false);
//   const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

//   const toggleDrawer = () => setDrawerOpen(prev => !prev);
//   const toggleThemeDropdown = () => setThemeDropdownOpen(prev => !prev);

//   const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
//     setTheme(newTheme);
//     setThemeDropdownOpen(false);
//     if (newTheme === 'system') {
//       const prefersDark = window.matchMedia(
//         '(prefers-color-scheme: dark)'
//       ).matches;
//       setIsDarkMode(prefersDark);
//     } else {
//       setIsDarkMode(newTheme === 'dark');
//     }
//   };

//   useEffect(() => {
//     if (theme === 'system') {
//       const prefersDark = window.matchMedia(
//         '(prefers-color-scheme: dark)'
//       ).matches;
//       setIsDarkMode(prefersDark);
//     } else {
//       setIsDarkMode(theme === 'dark');
//     }
//   }, [theme]);

//   return (
//     <div className={isDarkMode ? 'dark' : ''}>
//       <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
//         <CustomDrawer
//           isOpen={isDrawerOpen}
//           isDarkMode={isDarkMode}
//           onClose={() => setDrawerOpen(false)}
//           onThemeChange={handleThemeChange}
//           currentTheme={theme}
//           themeDropdownOpen={themeDropdownOpen}
//           toggleThemeDropdown={toggleThemeDropdown} // ✅ Pass user here
//         />

//         <main className="p-0">
//           <Header stuff={{ toggleDrawer }} />
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
// MainLayout.tsx
import { Outlet } from "react-router-dom"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { AppSidebar } from "@/components/core/AppSidebar"

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between px-4 py-2 shadow-md bg-background">
        <div className="text-xl font-bold">My Tourist App</div>

        {/* Sheet Trigger lives in header */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-accent">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-64">
            <AppSidebar />
          </SheetContent>
        </Sheet>
      </header>

      {/* MAIN BODY */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
