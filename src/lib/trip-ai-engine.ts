// ============================================
// AI TRIP GENERATION ENGINE
// ============================================

import { differenceInDays } from 'date-fns';

// Types
export type TripPreferences = {
  destination: string;
  mood: string;
  occasion: string;
  interests: string[];
  energyLevel: number;
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget: string;
  notes?: string;
};

export type Activity = {
  id: string;
  time: string;
  title: string;
  description: string;
  location: {
    name: string;
    address: string;
  };
  type: 'attraction' | 'dining' | 'activity' | 'rest' | 'transport';
  duration: number; // minutes
  price: number;
  category: string;
  imageUrl?: string;
  rating?: number;
  tips?: string[];
};

export type ItineraryDay = {
  id: string;
  day: number;
  date: Date;
  activities: Activity[];
  totalCost: number;
  summary: string;
};

export type GeneratedItinerary = {
  id: string;
  destination: string;
  days: ItineraryDay[];
  totalCost: number;
  personalizedMessage: string;
  recommendations: string[];
};

// ============================================
// ACTIVITY DATABASE (Curated by mood & interests)
// ============================================

const activityDatabase = {
  // Mood-based activities
  moods: {
    relaxed: {
      morning: [
        {
          title: 'Sunrise Yoga Session',
          category: 'wellness',
          duration: 60,
          price: 25,
        },
        {
          title: 'Beach Walk & Coffee',
          category: 'nature',
          duration: 90,
          price: 15,
        },
        {
          title: 'Spa Morning Treatment',
          category: 'wellness',
          duration: 120,
          price: 80,
        },
        {
          title: 'Quiet Café Breakfast',
          category: 'food',
          duration: 60,
          price: 20,
        },
      ],
      afternoon: [
        {
          title: 'Scenic Garden Stroll',
          category: 'nature',
          duration: 90,
          price: 10,
        },
        {
          title: 'Art Gallery Visit',
          category: 'culture',
          duration: 120,
          price: 15,
        },
        {
          title: 'Peaceful Boat Ride',
          category: 'nature',
          duration: 60,
          price: 30,
        },
        {
          title: 'Bookshop & Reading Time',
          category: 'culture',
          duration: 90,
          price: 0,
        },
      ],
      evening: [
        {
          title: 'Sunset Viewing Point',
          category: 'nature',
          duration: 60,
          price: 0,
        },
        {
          title: 'Intimate Restaurant Dinner',
          category: 'food',
          duration: 120,
          price: 60,
        },
        {
          title: 'Stargazing Experience',
          category: 'nature',
          duration: 90,
          price: 20,
        },
        {
          title: 'Calm Lounge Bar',
          category: 'nightlife',
          duration: 90,
          price: 35,
        },
      ],
    },
    adventurous: {
      morning: [
        {
          title: 'Mountain Hiking Trail',
          category: 'adventure',
          duration: 180,
          price: 0,
        },
        {
          title: 'Water Sports Session',
          category: 'adventure',
          duration: 120,
          price: 55,
        },
        {
          title: 'Rock Climbing Adventure',
          category: 'adventure',
          duration: 150,
          price: 45,
        },
        {
          title: 'Cycling City Tour',
          category: 'adventure',
          duration: 120,
          price: 30,
        },
      ],
      afternoon: [
        {
          title: 'Zip-lining Experience',
          category: 'adventure',
          duration: 90,
          price: 60,
        },
        {
          title: 'Kayaking Expedition',
          category: 'adventure',
          duration: 120,
          price: 40,
        },
        {
          title: 'Scuba Diving',
          category: 'adventure',
          duration: 180,
          price: 90,
        },
        {
          title: 'Paragliding Flight',
          category: 'adventure',
          duration: 60,
          price: 120,
        },
      ],
      evening: [
        {
          title: 'Night Market Exploration',
          category: 'food',
          duration: 120,
          price: 25,
        },
        {
          title: 'Vibrant Club Scene',
          category: 'nightlife',
          duration: 180,
          price: 40,
        },
        {
          title: 'Street Food Tour',
          category: 'food',
          duration: 150,
          price: 35,
        },
        {
          title: 'Live Music Venue',
          category: 'nightlife',
          duration: 120,
          price: 30,
        },
      ],
    },
    romantic: {
      morning: [
        {
          title: 'Private Beach Breakfast',
          category: 'food',
          duration: 90,
          price: 65,
        },
        {
          title: 'Couples Spa Treatment',
          category: 'wellness',
          duration: 120,
          price: 150,
        },
        {
          title: 'Hot Air Balloon Ride',
          category: 'adventure',
          duration: 120,
          price: 200,
        },
        {
          title: 'Vineyard Morning Tour',
          category: 'culture',
          duration: 150,
          price: 75,
        },
      ],
      afternoon: [
        {
          title: 'Scenic Coastal Drive',
          category: 'nature',
          duration: 120,
          price: 0,
        },
        {
          title: 'Private Cooking Class',
          category: 'food',
          duration: 150,
          price: 85,
        },
        {
          title: 'Couples Photography Session',
          category: 'activity',
          duration: 90,
          price: 120,
        },
        {
          title: 'Botanical Garden Walk',
          category: 'nature',
          duration: 90,
          price: 15,
        },
      ],
      evening: [
        {
          title: 'Sunset Yacht Cruise',
          category: 'nature',
          duration: 120,
          price: 180,
        },
        {
          title: 'Fine Dining Experience',
          category: 'food',
          duration: 150,
          price: 120,
        },
        {
          title: 'Rooftop Cocktails',
          category: 'nightlife',
          duration: 90,
          price: 50,
        },
        {
          title: 'Private Beach Dinner',
          category: 'food',
          duration: 120,
          price: 150,
        },
      ],
    },
    cultural: {
      morning: [
        {
          title: 'Historic District Walking Tour',
          category: 'culture',
          duration: 150,
          price: 35,
        },
        {
          title: 'Museum & Exhibitions',
          category: 'culture',
          duration: 180,
          price: 20,
        },
        {
          title: 'Local Market Exploration',
          category: 'culture',
          duration: 120,
          price: 10,
        },
        {
          title: 'Traditional Tea Ceremony',
          category: 'culture',
          duration: 90,
          price: 40,
        },
      ],
      afternoon: [
        {
          title: 'Ancient Ruins Visit',
          category: 'culture',
          duration: 180,
          price: 25,
        },
        {
          title: 'Art Workshop Class',
          category: 'culture',
          duration: 120,
          price: 55,
        },
        {
          title: 'Local Artisan Studios',
          category: 'culture',
          duration: 90,
          price: 15,
        },
        {
          title: 'Religious Sites Tour',
          category: 'culture',
          duration: 150,
          price: 20,
        },
      ],
      evening: [
        {
          title: 'Traditional Performance Show',
          category: 'culture',
          duration: 120,
          price: 50,
        },
        {
          title: 'Authentic Local Restaurant',
          category: 'food',
          duration: 120,
          price: 45,
        },
        {
          title: 'Cultural Music Concert',
          category: 'culture',
          duration: 150,
          price: 40,
        },
        {
          title: 'Historic Night Tour',
          category: 'culture',
          duration: 120,
          price: 35,
        },
      ],
    },
  },

  // Interest-based additions
  interests: {
    nature: [
      { title: 'National Park Visit', duration: 240, price: 15 },
      { title: 'Wildlife Safari', duration: 180, price: 85 },
      { title: 'Waterfall Hiking', duration: 150, price: 0 },
    ],
    culture: [
      { title: 'Historical Landmark Tour', duration: 120, price: 20 },
      { title: 'Local Crafts Workshop', duration: 90, price: 45 },
      { title: 'Archeological Site', duration: 150, price: 25 },
    ],
    food: [
      { title: 'Food Market Tour', duration: 120, price: 40 },
      { title: 'Cooking Masterclass', duration: 180, price: 70 },
      { title: 'Wine Tasting Experience', duration: 90, price: 55 },
    ],
    nightlife: [
      { title: 'Rooftop Bar Hopping', duration: 180, price: 60 },
      { title: 'Jazz Club Night', duration: 120, price: 35 },
      { title: 'Beach Party', duration: 240, price: 40 },
    ],
    wellness: [
      { title: 'Meditation Retreat', duration: 120, price: 50 },
      { title: 'Full Day Spa', duration: 240, price: 150 },
      { title: 'Yoga & Wellness Class', duration: 90, price: 30 },
    ],
    adventure: [
      { title: 'Bungee Jumping', duration: 60, price: 100 },
      { title: 'Desert Safari', duration: 240, price: 120 },
      { title: 'Jet Ski Adventure', duration: 60, price: 70 },
    ],
  },

  // Dining options by budget
  dining: {
    budget: [
      { title: 'Local Street Food Experience', price: 15, duration: 60 },
      { title: 'Casual Café Lunch', price: 20, duration: 60 },
      { title: 'Food Court Dining', price: 12, duration: 45 },
    ],
    moderate: [
      { title: 'Mid-Range Restaurant', price: 35, duration: 90 },
      { title: 'Bistro Lunch', price: 40, duration: 90 },
      { title: 'Seafood Restaurant', price: 45, duration: 90 },
    ],
    luxury: [
      { title: 'Fine Dining Restaurant', price: 90, duration: 120 },
      { title: 'Michelin Star Experience', price: 150, duration: 150 },
      { title: 'Private Chef Dinner', price: 200, duration: 120 },
    ],
  },
};

// ============================================
// AI GENERATION FUNCTIONS
// ============================================

export function generateItinerary(
  preferences: TripPreferences
): GeneratedItinerary {
  const numberOfDays =
    differenceInDays(preferences.endDate, preferences.startDate) + 1;
  const activitiesPerDay = getActivitiesPerDay(preferences.energyLevel);

  const days: ItineraryDay[] = [];

  for (let dayNum = 1; dayNum <= numberOfDays; dayNum++) {
    const dayDate = new Date(preferences.startDate);
    dayDate.setDate(dayDate.getDate() + (dayNum - 1));

    const dayActivities = generateDayActivities(
      preferences,
      dayNum,
      activitiesPerDay
    );

    const totalCost = dayActivities.reduce((sum, act) => sum + act.price, 0);
    // let totalCost = 0;
    // for (const day of days) {
    //   totalCost += day.totalCost;
    // }
    
    days.push({
      id: `day-${dayNum}`,
      day: dayNum,
      date: dayDate,
      activities: dayActivities,
      totalCost,
      summary: generateDaySummary(dayActivities, preferences),
    });
  }

  const totalCost = days.reduce((sum, day) => sum + day.totalCost, 0);
  
  return {
    id: `trip-${Date.now()}`,
    destination: preferences.destination,
    days,
    totalCost,
    personalizedMessage: generatePersonalizedMessage(preferences),
    recommendations: generateRecommendations(preferences),
  };
}

function getActivitiesPerDay(energyLevel: number): number {
  if (energyLevel < 33) return 3; // Relaxed: 3 activities
  if (energyLevel < 66) return 4; // Moderate: 4 activities
  return 5; // High energy: 5 activities
}

function generateDayActivities(
  preferences: TripPreferences,
  dayNum: number,
  count: number
): Activity[] {
  const activities: Activity[] = [];
  const moodActivities =
    activityDatabase.moods[
      preferences.mood as keyof typeof activityDatabase.moods
    ];

  if (!moodActivities) return activities;

  // Morning activity
  const morningOptions = moodActivities.morning;
  const morning = selectRandomActivity(
    morningOptions,
    preferences.interests,
    '09:00'
  );
  activities.push(morning);

  // Lunch
  const lunch = selectDining(preferences.budget, '12:30');
  activities.push(lunch);

  // Afternoon activity
  if (count >= 3) {
    const afternoonOptions = moodActivities.afternoon;
    const afternoon = selectRandomActivity(
      afternoonOptions,
      preferences.interests,
      '14:30'
    );
    activities.push(afternoon);
  }

  // Additional afternoon activity for moderate/high energy
  if (count >= 4) {
    const extraOptions = [...moodActivities.afternoon];
    const extra = selectRandomActivity(
      extraOptions,
      preferences.interests,
      '16:30'
    );
    activities.push(extra);
  }

  // Dinner
  const dinner = selectDining(preferences.budget, '19:00');
  activities.push(dinner);

  // Evening activity for high energy
  if (count >= 5) {
    const eveningOptions = moodActivities.evening;
    const evening = selectRandomActivity(
      eveningOptions,
      preferences.interests,
      '21:00'
    );
    activities.push(evening);
  }

  return activities;
}

function selectRandomActivity(
  options: any[],
  interests: string[],
  time: string
): Activity {
  // Filter by interests if possible
  const filtered = options.filter(opt => interests.includes(opt.category));

  const pool = filtered.length > 0 ? filtered : options;
  const selected = pool[Math.floor(Math.random() * pool.length)];

  return {
    id: `activity-${Date.now()}-${Math.random()}`,
    time,
    title: selected.title,
    description: `Enjoy this ${selected.category} experience`,
    location: {
      name: 'Central District',
      address: '123 Main Street',
    },
    type: 'activity',
    duration: selected.duration,
    price: selected.price,
    category: selected.category,
    rating: 4.5 + Math.random() * 0.5,
    tips: [
      'Book in advance for better rates',
      'Arrive 15 minutes early',
      'Bring comfortable shoes',
    ],
  };
}

function selectDining(budget: string, time: string): Activity {
  const options =
    activityDatabase.dining[budget as keyof typeof activityDatabase.dining];
  const selected = options[Math.floor(Math.random() * options.length)];

  return {
    id: `dining-${Date.now()}-${Math.random()}`,
    time,
    title: selected.title,
    description: 'Delicious local cuisine experience',
    location: {
      name: 'Restaurant District',
      address: '456 Food Street',
    },
    type: 'dining',
    duration: selected.duration,
    price: selected.price,
    category: 'food',
    rating: 4.2 + Math.random() * 0.8,
  };
}

function generateDaySummary(
  activities: Activity[],
  preferences: TripPreferences
): string {
  const activityCount = activities.filter(a => a.type !== 'dining').length;
  const energyLabel =
    preferences.energyLevel < 33
      ? 'relaxed'
      : preferences.energyLevel < 66
      ? 'balanced'
      : 'action-packed';

  return `A ${energyLabel} day with ${activityCount} activities and authentic dining experiences`;
}

function generatePersonalizedMessage(preferences: TripPreferences): string {
  const moodMessages = {
    relaxed:
      "Perfect for unwinding and recharging your soul. We've curated peaceful experiences that let you truly relax.",
    adventurous:
      "Get ready for excitement! Your itinerary is packed with thrilling activities that'll get your adrenaline pumping.",
    romantic:
      "Love is in the air! We've planned intimate moments and breathtaking experiences for you and your special someone.",
    cultural:
      'Immerse yourself in rich traditions and history. Discover the heart and soul of your destination.',
  };

  const message =
    moodMessages[preferences.mood as keyof typeof moodMessages] ||
    'Your personalized adventure awaits!';

  return `Based on your ${
    preferences.mood
  } mood and love for ${preferences.interests.join(', ')}, ${message}`;
}

function generateRecommendations(preferences: TripPreferences): string[] {
  const recommendations = [
    'Download offline maps before you go',
    'Book popular attractions in advance',
    'Try local cuisine at small family-owned restaurants',
    'Learn a few basic phrases in the local language',
    'Keep a copy of important documents in the cloud',
  ];

  if (preferences.budget === 'budget') {
    recommendations.push('Look for free walking tours in the area');
    recommendations.push(
      'Eat where locals eat for authentic and affordable meals'
    );
  }

  if (preferences.interests.includes('food')) {
    recommendations.push('Visit local food markets early in the morning');
    recommendations.push('Ask locals for their favorite hidden food spots');
  }

  if (preferences.mood === 'adventurous') {
    recommendations.push('Check weather conditions for outdoor activities');
    recommendations.push('Bring appropriate safety gear for adventures');
  }

  return recommendations;
}

export default {
  generateItinerary,
};
