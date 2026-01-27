// src/lib/tripStorage.ts

export type SavedTrip = {
  id: string;
  destinationName: string;
  image: string,
  country: string;
  score: number;
  tagline: string;
  personalizedMessage: string;
  whyPerfect: string;
  highlights: string[];
  bestFor: string[];
  estimatedBudget: {
    min: number;
    max: number;
    perDay: number;
  };
  bestTimeToVisit: string[];
  vibeDescription: string;
  weatherDescription: string;

  // User preferences that led to this recommendation
  userProfile: {
    feeling: string;
    seeking: string;
    travelWith: string;
    budget: string;
    duration: string;
    preferences: string[];
  };

  // Trip dates (to be confirmed by user)
  tripDates?: {
    startDate: string;
    endDate: string;
    confirmed: boolean;
  };

  savedAt: string; // ISO timestamp
};

const STORAGE_KEY = 'saved_trips';


//   const onSubmit: SubmitHandler<FormField> = async (data: unknown) =>


// Get all saved trips
export const getPreservedTrips = () =>
{
}

export function getSavedTrips(): SavedTrip[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading saved trips:', error);
    return [];
  }
}

// Save a new trip 
export function saveTrip(trip: SavedTrip): boolean {
  try {
    const trips = getSavedTrips();

    // Check if already saved (by destination name)
    const existingIndex = trips.findIndex(
      t => t.destinationName === trip.destinationName
    );

    if (existingIndex >= 0) {
      // Update existing trip
      trips[existingIndex] = trip;
    } else {
      // Add new trip
      trips.push(trip);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
    return true;
  } catch (error) {
    console.error('Error saving trip:', error);
    return false;
  }
}

// Delete a trip by ID
export function deleteTrip(tripId: string): boolean {
  try {
    const trips = getSavedTrips();
    const filtered = trips.filter(t => t.id !== tripId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting trip:', error);
    return false;
  }
}

// Check if a destination is already saved
export function isTripSaved(destinationName: string): boolean {
  const trips = getSavedTrips();
  return trips.some(t => t.destinationName === destinationName);
}

// Update trip dates
export function updateTripDates(
  tripId: string,
  startDate: string,
  endDate: string,
  confirmed: boolean = false
): boolean {
  try {
    const trips = getSavedTrips();
    const tripIndex = trips.findIndex(t => t.id === tripId);

    if (tripIndex >= 0) {
      trips[tripIndex].tripDates = {
        startDate,
        endDate,
        confirmed,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating trip dates:', error);
    return false;
  }
}

// Clear all saved trips (for testing)
export function clearAllTrips(): void {
  localStorage.removeItem(STORAGE_KEY);
}
