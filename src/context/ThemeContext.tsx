// import { useEffect, useState } from "react";

// type Theme = "light" | "dark" | "system";

// function applyTheme(theme: Theme) {
//   const root = document.documentElement;
//   if (theme === "dark") {
//     root.classList.add("dark");
//   } else if (theme === "light") {
//     root.classList.remove("dark");
//     root.classList.add('light')
//   } else {
//     const prefersDark = window.matchMedia(`(prefers-color-scheme: ${theme})`).matches;
//     prefersDark ? root.classList.add("dark") : root.classList.remove("dark");
//   }
// }

// export function useTheme() {
//   const [theme, setTheme] = useState<Theme>(() => {
//     return (localStorage.getItem("theme") as Theme) || "system";
//   });

//   useEffect(() => {
//     applyTheme(theme);

//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleSystemChange = () => {
//       if (theme === "system") applyTheme("system");
//     };

//     mediaQuery.addEventListener("change", handleSystemChange);
//     return () => mediaQuery.removeEventListener("change", handleSystemChange);
//   }, [theme]);

//   const changeTheme = (newTheme: Theme) => {
//     localStorage.setItem("theme", newTheme);
//     setTheme(newTheme);
//     applyTheme(newTheme);
//   };

//   return { theme, changeTheme };
// }
// export default useTheme;
