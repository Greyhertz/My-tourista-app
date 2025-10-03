// Providers.tsx
'use client';
import type { ReactNode } from 'react';
import { LangProvider } from './context/LangContext';
import { ThemeProvider } from './components/core/ThemeProvider';
import { TravelPreferecesProvider } from './context/PreferenceContext';
import { NotificationProvider } from './context/NotificationContext';
import { BlogProvider } from './context/BlogContex';
import { UserProvider } from './context/UserContext';
//  import { ThemeProvider } from 'next-themes';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    // ✅ must return
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={['light', 'dark', 'ocean', 'sunset']}
      disableTransitionOnChange
      storageKey="theme"
    >
      <NotificationProvider>
        <BlogProvider>
          <UserProvider>
            <LangProvider>
              {' '}
              <TravelPreferecesProvider>{children} </TravelPreferecesProvider>
            </LangProvider>
          </UserProvider>
        </BlogProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
