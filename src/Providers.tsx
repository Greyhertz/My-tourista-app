'use client';
import type { ReactNode } from 'react';
import { LangProvider } from './context/LangContext';
import { ThemeProvider } from './components/core/ThemeProvider';
import { TravelPreferecesProvider } from './context/PreferenceContext';
import { NotificationProvider } from './context/NotificationContext';
import { BlogProvider } from './context/BlogContex';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      themes={['light', 'dark', 'ocean', 'sunset']}
      disableTransitionOnChange
      storageKey="theme"
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationProvider>
            <BlogProvider>
              <UserProvider>
                <LangProvider>
                  <TravelPreferecesProvider>
                    {children}
                  </TravelPreferecesProvider>
                </LangProvider>
              </UserProvider>
            </BlogProvider>
          </NotificationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
