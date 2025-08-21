// App.tsx
import { createContext, useState, type ReactNode, useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { router } from './Router';
import './App.css'; // Make sure to import your CSS

// Define the context type
interface AppContextType {
  username: string;
  setUsername: (username: string) => void;
  // Add other global state here as needed
}

// Create the context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Context provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>('');

  const value = {
    username,
    setUsername,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={['light', 'dark', 'ocean', 'sunset']}
      disableTransitionOnChange
    >
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  );
}
