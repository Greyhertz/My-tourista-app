import { useContext, useState, type ReactNode } from 'react';
import { createContext } from 'react';

type Preferences = {
  currency: string;
  language: string;
  homeAirport: string;
  travelerType: string;
  seatPreference: string;
  mealPreference: string;
  syncItineraries: boolean;
};

type TravelPreferencesContextType = {
  preferences: Preferences;
  updatePreferences: (updates: Partial<Preferences>) => void;
  resetPreferences: () => void
};

const TravelPreferencesContext = createContext<
  TravelPreferencesContextType | undefined
>(undefined);

export  function TravelPreferecesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [preferences, setPreferences] = useState<Preferences>({
    currency: 'USD',
    language: 'en',
    homeAirport: 'LOS',
    travelerType: 'Leisure',
    seatPreference: 'Any',
    mealPreference: 'Any',
    syncItineraries: true,
  });

  const updatePreferences = (updates: Partial<Preferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  };


  const resetPreferences = () => {
    updatePreferences({
      currency: 'USD',
      language: 'en',
      homeAirport: 'LOS',
      travelerType: 'Leisure',
      seatPreference: 'Any',
      mealPreference: 'Any',
      syncItineraries: true,
    });

    ('Preferences reverted to default');
  };

  return (
    <TravelPreferencesContext.Provider
      value={{ preferences, updatePreferences, resetPreferences }}
    >
      {children}
    </TravelPreferencesContext.Provider>
  );
}

export function useTravelPreferences() {
  const context = useContext(TravelPreferencesContext);
  if (!context)
    throw new Error(
      'usetravelpreferences must be used inside the travelPreferenceProvider'
    );
  return context;
}
