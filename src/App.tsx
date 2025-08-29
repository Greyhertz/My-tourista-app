// import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './Providers';
// import { ThemeProvider } from './components/core/ThemeProvider';

// import { UserProvider } from './context/UserContext';
// import { CartProvider } from './context/CartContext';
// import { LangProvider } from './context/LangContext';

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
