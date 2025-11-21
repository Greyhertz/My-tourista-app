// ============================================
// AI DESTINATION RECOMMENDATION ENGINE
// This is for finding WHERE to go based on feelings
// (Different from trip-ai-engine which plans WHAT to do)
// ============================================

export type EmotionalProfile = {
  currentFeeling: string; // stressed, happy, lonely, adventurous, etc.
  seekingFor: string; // peace, excitement, romance, discovery, etc.
  travelWith: string; // solo, partner, family, friends
  budget: string; // budget, moderate, luxury
  duration: string; // weekend, week, twoWeeks
  preferences: string[]; // beach, mountains, city, culture, etc.
  avoidances?: string[]; // crowds, cold, heat, etc.
};

export type DestinationRecommendation = {
  id: string;
  name: string;
  country: string;
  tagline: string;
  whyPerfect: string;
  mood: string;
  score: number; // 0-100 match score
  highlights: string[];
  bestFor: string[];
  vibeDescription: string;
  estimatedBudget: {
    min: number;
    max: number;
    perDay: number;
  };
  bestTimeToVisit: string[];
  imageUrl?: string;
  weatherDescription: string;
  personalizedMessage: string;
};


// ============================================
// DESTINATION DATABASE WITH EMOTIONAL PROFILES
// ============================================

const destinationDatabase = {
  // For stressed/burnt out people
  peaceful: [
    {
      name: 'Bali, Indonesia',
      country: 'Indonesia',
      tagline: 'Find your zen in paradise',
      moods: ['stressed', 'burnt-out', 'overwhelmed'],
      seekings: ['peace', 'relaxation', 'healing'],
      highlights: [
        'Ubud rice terraces',
        'Yoga retreats',
        'Spa treatments',
        'Temple visits',
      ],
      bestFor: ['Wellness', 'Nature', 'Spirituality', 'Solo travel'],
      vibeDescription: 'Serene and spiritually rejuvenating',
      weatherDescription: 'Tropical warmth with occasional rain',
      budget: { min: 30, max: 100, perDay: 50 },
      bestTime: ['Apr-Oct'],
    },
    {
      name: 'Santorini, Greece',
      country: 'Greece',
      tagline: 'Sunset therapy for the soul',
      moods: ['stressed', 'romantic', 'contemplative'],
      seekings: ['peace', 'beauty', 'romance'],
      highlights: [
        'Caldera sunsets',
        'White-washed villages',
        'Wine tasting',
        'Quiet beaches',
      ],
      bestFor: ['Romance', 'Photography', 'Relaxation', 'Couples'],
      vibeDescription: 'Picture-perfect tranquility',
      weatherDescription: 'Mediterranean sunshine',
      budget: { min: 80, max: 250, perDay: 150 },
      bestTime: ['Apr-Jun', 'Sep-Oct'],
    },
    {
      name: 'Kyoto, Japan',
      country: 'Japan',
      tagline: 'Ancient wisdom, modern peace',
      moods: ['stressed', 'seeking-meaning', 'curious'],
      seekings: ['peace', 'culture', 'discovery'],
      highlights: [
        'Zen gardens',
        'Temple stays',
        'Tea ceremonies',
        'Bamboo forests',
      ],
      bestFor: ['Culture', 'History', 'Mindfulness', 'Solo travel'],
      vibeDescription: 'Timeless serenity meets tradition',
      weatherDescription: 'Four distinct seasons',
      budget: { min: 60, max: 180, perDay: 100 },
      bestTime: ['Mar-May', 'Oct-Nov'],
    },
  ],

  // For adventurous/energetic people
  adventurous: [
    {
      name: 'Queenstown, New Zealand',
      country: 'New Zealand',
      tagline: 'Adventure capital of the world',
      moods: ['adventurous', 'energetic', 'thrill-seeking'],
      seekings: ['excitement', 'adrenaline', 'challenge'],
      highlights: ['Bungee jumping', 'Skydiving', 'Hiking', 'Jet boating'],
      bestFor: ['Adventure sports', 'Nature', 'Outdoor activities', 'Friends'],
      vibeDescription: 'Heart-pumping excitement in stunning nature',
      weatherDescription: 'Crisp mountain air',
      budget: { min: 70, max: 200, perDay: 120 },
      bestTime: ['Dec-Feb', 'Jun-Aug'],
    },
    {
      name: 'Costa Rica',
      country: 'Costa Rica',
      tagline: 'Pura Vida adventure',
      moods: ['adventurous', 'nature-lover', 'active'],
      seekings: ['excitement', 'nature', 'discovery'],
      highlights: ['Zip-lining', 'Volcano hiking', 'Surfing', 'Wildlife'],
      bestFor: ['Eco-tourism', 'Adventure', 'Nature', 'Families'],
      vibeDescription: 'Thrilling biodiversity paradise',
      weatherDescription: 'Tropical with rainforest climate',
      budget: { min: 50, max: 150, perDay: 80 },
      bestTime: ['Dec-Apr'],
    },
    {
      name: 'Iceland',
      country: 'Iceland',
      tagline: 'Land of fire and ice',
      moods: ['adventurous', 'curious', 'nature-lover'],
      seekings: ['discovery', 'wonder', 'nature'],
      highlights: [
        'Glacier hiking',
        'Northern Lights',
        'Hot springs',
        'Waterfalls',
      ],
      bestFor: ['Nature', 'Photography', 'Unique experiences', 'Couples'],
      vibeDescription: 'Otherworldly natural wonders',
      weatherDescription: 'Cool and dramatic',
      budget: { min: 100, max: 300, perDay: 180 },
      bestTime: ['Jun-Aug', 'Sep-Mar for lights'],
    },
  ],

  // For romantic/couples
  romantic: [
    {
      name: 'Paris, France',
      country: 'France',
      tagline: 'The city of love',
      moods: ['romantic', 'artistic', 'cultured'],
      seekings: ['romance', 'beauty', 'culture'],
      highlights: [
        'Eiffel Tower',
        'Seine cruises',
        'Michelin dining',
        'Museums',
      ],
      bestFor: ['Romance', 'Art', 'Food', 'Couples'],
      vibeDescription: 'Timeless elegance and passion',
      weatherDescription: 'Charming all seasons',
      budget: { min: 80, max: 300, perDay: 150 },
      bestTime: ['Apr-Jun', 'Sep-Oct'],
    },
    {
      name: 'Maldives',
      country: 'Maldives',
      tagline: 'Paradise for two',
      moods: ['romantic', 'seeking-luxury', 'relaxed'],
      seekings: ['romance', 'luxury', 'privacy'],
      highlights: ['Overwater villas', 'Private islands', 'Snorkeling', 'Spa'],
      bestFor: ['Honeymoons', 'Luxury', 'Beach', 'Couples'],
      vibeDescription: 'Intimate tropical luxury',
      weatherDescription: 'Perfect tropical climate',
      budget: { min: 200, max: 1000, perDay: 500 },
      bestTime: ['Nov-Apr'],
    },
  ],

  // For culture seekers
  cultural: [
    {
      name: 'Rome, Italy',
      country: 'Italy',
      tagline: 'Where history lives',
      moods: ['curious', 'cultured', 'artistic'],
      seekings: ['culture', 'history', 'discovery'],
      highlights: ['Colosseum', 'Vatican', 'Italian cuisine', 'Ancient ruins'],
      bestFor: ['History', 'Art', 'Food', 'Families'],
      vibeDescription: 'Living museum of civilization',
      weatherDescription: 'Mediterranean warmth',
      budget: { min: 60, max: 200, perDay: 100 },
      bestTime: ['Apr-Jun', 'Sep-Oct'],
    },
    {
      name: 'Marrakech, Morocco',
      country: 'Morocco',
      tagline: 'A feast for the senses',
      moods: ['curious', 'adventurous', 'open-minded'],
      seekings: ['culture', 'discovery', 'excitement'],
      highlights: ['Medina souks', 'Riads', 'Sahara trips', 'Moroccan cuisine'],
      bestFor: ['Culture', 'Adventure', 'Food', 'Photography'],
      vibeDescription: 'Exotic and enchanting',
      weatherDescription: 'Desert heat with cool nights',
      budget: { min: 40, max: 120, perDay: 70 },
      bestTime: ['Mar-May', 'Sep-Nov'],
    },
  ],

  // For party/social people
  vibrant: [
    {
      name: 'Barcelona, Spain',
      country: 'Spain',
      tagline: 'Where the party never stops',
      moods: ['social', 'energetic', 'fun-loving'],
      seekings: ['excitement', 'socializing', 'nightlife'],
      highlights: [
        'Beach clubs',
        'Gaudi architecture',
        'Tapas bars',
        'Nightlife',
      ],
      bestFor: ['Nightlife', 'Beach', 'Food', 'Friends'],
      vibeDescription: 'Vibrant coastal energy',
      weatherDescription: 'Sunny Mediterranean',
      budget: { min: 60, max: 180, perDay: 100 },
      bestTime: ['May-Sep'],
    },
    {
      name: 'Bangkok, Thailand',
      country: 'Thailand',
      tagline: 'City that never sleeps',
      moods: ['social', 'adventurous', 'food-lover'],
      seekings: ['excitement', 'culture', 'food'],
      highlights: ['Street food', 'Rooftop bars', 'Temples', 'Night markets'],
      bestFor: ['Food', 'Nightlife', 'Budget travel', 'Friends'],
      vibeDescription: 'Chaotic and captivating',
      weatherDescription: 'Tropical heat',
      budget: { min: 25, max: 80, perDay: 45 },
      bestTime: ['Nov-Feb'],
    },
  ],
};

// ============================================
// AI MATCHING ALGORITHM
// ============================================

export function findPerfectDestination(
  profile: EmotionalProfile
): DestinationRecommendation[] {
  let allDestinations: any[] = [];

  // Collect all destinations
  Object.values(destinationDatabase).forEach(category => {
    allDestinations = [...allDestinations, ...category];
  });

  // Score each destination
  const scoredDestinations = allDestinations.map(dest => {
    let score = 0;

    // Match mood (40 points)
    if (dest.moods.includes(profile.currentFeeling)) {
      score += 40;
    }

    // Match seeking (30 points)
    if (dest.seekings.includes(profile.seekingFor)) {
      score += 30;
    }
 
    // Match preferences (20 points)
  const matchingPrefs = profile.preferences.filter(pref =>
      dest.bestFor.some((best: string) =>
        best.toLowerCase().includes(pref.toLowerCase())
      )
    );
    score += (matchingPrefs.length / profile.preferences.length) * 20;

    // Budget match (10 points)
    if (profile.budget === 'budget' && dest.budget.perDay < 70) score += 10;
    if (
      profile.budget === 'moderate' &&
      dest.budget.perDay >= 70 &&
      dest.budget.perDay <= 150
    )
      score += 10;
    if (profile.budget === 'luxury' && dest.budget.perDay > 150) score += 10;

    return {
      ...dest,
      score,
      personalizedMessage: generatePersonalizedMessage(dest, profile, score),
    };
  });

  // Sort by score and return top 5
  return scoredDestinations
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((dest, index) => ({
      id: `dest-${index}`,
      name: dest.name,
      country: dest.country,
      tagline: dest.tagline,
      whyPerfect: generateWhyPerfect(dest, profile),
      mood: profile.currentFeeling,
      score: dest.score,
      highlights: dest.highlights,
      bestFor: dest.bestFor,
      vibeDescription: dest.vibeDescription,
      estimatedBudget: dest.budget,
      bestTimeToVisit: dest.bestTime,
      weatherDescription: dest.weatherDescription,
      personalizedMessage: dest.personalizedMessage,
    }));
}

function generateWhyPerfect(dest: any, profile: EmotionalProfile): string {
  const reasons = [];

  if (dest.moods.includes(profile.currentFeeling)) {
    reasons.push(`perfect for when you're feeling ${profile.currentFeeling}`);
  }

  if (dest.seekings.includes(profile.seekingFor)) {
    reasons.push(`offers the ${profile.seekingFor} you're seeking`);
  }

  const matchingPrefs = profile.preferences.filter(pref =>
    dest.bestFor.some((best: string) =>
      best.toLowerCase().includes(pref.toLowerCase())
    )
  );

  if (matchingPrefs.length > 0) {
    reasons.push(`matches your interest in ${matchingPrefs.join(' and ')}`);
  }

  if (reasons.length === 0) {
    return 'A great destination that suits your travel style';
  }

  return `This destination is ${reasons.join(', ')}.`;
}

function generatePersonalizedMessage(
  dest: any,
  profile: EmotionalProfile,
  _score: number
): string {
  const feelingMessages = {
    stressed: `${
      dest.name
    } is calling your name. Its ${dest.vibeDescription.toLowerCase()} atmosphere is exactly what you need to decompress and recharge.`,
    'burnt-out': `Time                 to heal in ${dest.name}. This destination's peaceful energy will help you find yourself again.`,
    adventurous: `Get ready! ${dest.name} has the adrenaline-pumping experiences you're craving.`,
    romantic: `${dest.name} sets the perfect stage for love. Every moment here feels like a scene from a romance novel.`,
    lonely: `${dest.name} welcomes solo travelers with open arms. You'll find community and connection here.`,
    curious: `Your curiosity will be rewarded in ${dest.name}. Every corner holds a new discovery.`,
    happy: `Your positive energy will shine even brighter in ${dest.name}'s vibrant atmosphere.`,
    contemplative: `${dest.name} offers the space and serenity for deep reflection and personal growth.`,
  };

  const baseMessage =
    feelingMessages[profile.currentFeeling as keyof typeof feelingMessages] ||
    `${dest.name} is an excellent match for your travel style.`;

  const budgetNote =
    profile.budget === 'budget'
      ? ` Plus, it's budget-friendly with daily costs around ${dest.budget.perDay}.`
      : profile.budget === 'luxury'
      ? ` Indulge in luxury experiences averaging ${dest.budget.perDay} per day.`
      : ` Plan for around ${dest.budget.perDay} per day for a comfortable experience.`;

  return baseMessage + budgetNote;
}

// ============================================
// READY FOR REAL AI INTEGRATION
// ============================================

/**
 * This function signature is ready for OpenAI/Claude API
 * Replace the logic with actual AI call when ready
 */
export async function findDestinationWithAI(
  profile: EmotionalProfile
): Promise<DestinationRecommendation[]> {
  // TODO: Replace with real AI API call
  /*
  const response = await fetch('/api/ai/recommend-destination', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: `User is feeling ${profile.currentFeeling} and seeking ${profile.seekingFor}.
               They want to travel with ${profile.travelWith} on a ${profile.budget} budget for ${profile.duration}.
               They love: ${profile.preferences.join(', ')}.
               ${profile.avoidances ? `They want to avoid: ${profile.avoidances.join(', ')}.` : ''}
               
               Recommend 5 perfect destinations with detailed reasoning.`,
      profile,
    }),
  });
  
  return await response.json();
  */

  // For now, use smart matching algorithm
  return findPerfectDestination(profile);
}

export default {
  findPerfectDestination,
  findDestinationWithAI,
};
