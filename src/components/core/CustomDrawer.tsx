// import Drawer from "react-modern-drawer";
// import "react-modern-drawer/dist/index.css";
// import Navbar from "./Navbar";

// type Theme = "system" | "light" | "dark";

// interface CustomDrawerProps {
//   isOpen: boolean;
//   isDarkMode: boolean;
//   onClose: () => void;
//   onThemeChange: (theme: Theme) => void;
//   currentTheme: Theme;
//   themeDropdownOpen: boolean;
//   toggleThemeDropdown: () => void;
// }

// export default function CustomDrawer({
//   isOpen,
//   isDarkMode,
//   onClose,
//   onThemeChange,
//   currentTheme,
//   themeDropdownOpen,
//   toggleThemeDropdown,
// }: CustomDrawerProps) {
//   return (
//     <Drawer
//       key={currentTheme}
//       open={isOpen}
//       onClose={onClose}
//       direction="left"
//       size={280}
//       duration={400}
//       enableOverlay={true}
//       overlayOpacity={0.6}
//       lockBackgroundScroll={false}
//       className={`${isDarkMode ? "dark" : ""}`}
//     >
//       <Navbar
//         onClose={onClose}
//         onThemeChange={onThemeChange}
//         currentTheme={currentTheme}
//         themeDropdownOpen={themeDropdownOpen}
//         toggleThemeDropdown={toggleThemeDropdown}
//         isDarkMode={isDarkMode}
//       />
//     </Drawer>
//   );
// }