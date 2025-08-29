// Providers.tsx
'use client';
import type { ReactNode } from 'react';
import { LangProvider } from './context/LangContext';
import { ThemeProvider } from './components/core/ThemeProvider';
import { TravelPreferecesProvider } from './context/PreferenceContext';
import { NotificationProvider } from './context/NotificationContext';
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
    >
      <TravelPreferecesProvider>
        <NotificationProvider>
          <LangProvider>{children}</LangProvider>
        </NotificationProvider>
      </TravelPreferecesProvider>
    </ThemeProvider>
  );
}
