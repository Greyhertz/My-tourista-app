import { db } from './index';
import { destinations, hotels } from './schema';
import { nanoid } from 'nanoid';

const seedDestinations = [
  {
    id: nanoid(),
    name: 'Paris',
    country: 'France',
    description: 'The City of Light offers world-class museums, iconic landmarks like the Eiffel Tower, and charming cafés along the Seine.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    highlights: JSON.stringify(['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées']),
    rating: 5,
    reviewCount: 1243,
    priceLevel: 3,
  },
  {
    id: nanoid(),
    name: 'Tokyo',
    country: 'Japan',
    description: 'A mesmerizing blend of ancient temples and cutting-edge technology, with incredible food and unique culture.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    highlights: JSON.stringify(['Senso-ji Temple', 'Shibuya Crossing', 'Tokyo Skytree', 'Tsukiji Market']),
    rating: 5,
    reviewCount: 987,
    priceLevel: 4,
  },
  {
    id: nanoid(),
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with stunning beaches, terraced rice paddies, and spiritual Hindu temples.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    highlights: JSON.stringify(['Ubud Rice Terraces', 'Tanah Lot Temple', 'Seminyak Beach', 'Mount Batur']),
    rating: 5,
    reviewCount: 756,
    priceLevel: 2,
  },
  {
    id: nanoid(),
    name: 'New York',
    country: 'USA',
    description: 'The city that never sleeps, offering world-class entertainment, dining, and iconic landmarks.',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    highlights: JSON.stringify(['Statue of Liberty', 'Central Park', 'Times Square', 'Empire State Building']),
    rating: 5,
    reviewCount: 2103,
    priceLevel: 4,
  },
  {
    id: nanoid(),
    name: 'Rome',
    country: 'Italy',
    description: 'Ancient history meets vibrant modern life in the Eternal City.',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    highlights: JSON.stringify(['Colosseum', 'Vatican City', 'Trevi Fountain', 'Roman Forum']),
    rating: 5,
    reviewCount: 1532,
    priceLevel: 3,
  },
];

async function seed() {
  console.log('🌱 Seeding destinations...');
  
  try {
    const inserted = await db.insert(destinations).values(seedDestinations).returning();
    console.log(`✅ Seeded ${inserted.length} destinations`);
    
    // Add 2 hotels for Paris
    const parisId = inserted.find(d => d.name === 'Paris')?.id;
    
    if (parisId) {
      await db.insert(hotels).values([
        {
          id: nanoid(),
          destinationId: parisId,
          name: 'Hotel Le Marais',
          description: 'Charming boutique hotel in the heart of the Marais district.',
          pricePerNight: 15000,
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          images: JSON.stringify(['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800']),
          amenities: JSON.stringify(['WiFi', 'Breakfast', 'Air Conditioning', 'Room Service']),
          rating: 4,
          reviewCount: 234,
          available: 1,
        },
        {
          id: nanoid(),
          destinationId: parisId,
          name: 'Eiffel View Apartment',
          description: 'Modern apartment with stunning Eiffel Tower views.',
          pricePerNight: 22000,
          imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
          images: JSON.stringify(['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800']),
          amenities: JSON.stringify(['WiFi', 'Kitchen', 'Washing Machine', 'Balcony']),
          rating: 5,
          reviewCount: 89,
          available: 1,
        },
      ]);
      console.log('✅ Seeded hotels');
    }
    
    console.log('🎉 Done!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
  }
}

seed();