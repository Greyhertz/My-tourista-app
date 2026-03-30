/**
 * Shared types for the destinations feature.
 * Import from '@/types/destinations' on the frontend.
 */

export interface AmenityPlace {
  name:           string;
  address:        string;
  lat:            number;
  lon:            number;
  categories:     string[];
  website?:       string;
  phone?:         string;
  openNow?:       boolean | null;
  openingHours?:  string;
  wheelchair:     boolean;
  internetAccess: boolean;
  rating?:        number;
  fee?:           boolean;
  distance?:      number; // metres
}

export interface AmenitiesResult {
  food: {
    restaurants: AmenityPlace[];
    cafes:       AmenityPlace[];
    bars:        AmenityPlace[];
  };
  accommodation:        AmenityPlace[];
  healthcare:           AmenityPlace[];
  nature:               AmenityPlace[];
  tourism: {
    attractions: AmenityPlace[];
    museums:     AmenityPlace[];
    viewpoints:  AmenityPlace[];
  };
  sports:               AmenityPlace[];
  shopping:             AmenityPlace[];
  entertainment:        AmenityPlace[];
  transport:            AmenityPlace[];
  services:             AmenityPlace[];
  wheelchairAccessible: AmenityPlace[];
  wifiSpots:            AmenityPlace[];
}