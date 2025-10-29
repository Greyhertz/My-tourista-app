// import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './Providers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ThemeProvider } from './components/core/ThemeProvider';

// import { UserProvider } from './context/UserContext';
// import { CartProvider } from './context/CartContext';
// import { LangProvider } from './context/LangContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </QueryClientProvider>
  );
}
