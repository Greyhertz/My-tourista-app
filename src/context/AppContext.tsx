import { createContext, useContext, type ReactNode } from 'react';

type AppCtx = { phone: string; name: string };

export const AppContext = createContext<AppCtx>({ phone: '', name: '' });

export default function ContextProvider({ children }: { children: ReactNode }) {
  const value: AppCtx = { phone: '+1 123456789', name: 'Greyhert' };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Optional helper hook
export function useAppContext() {
  return useContext(AppContext);
}
 