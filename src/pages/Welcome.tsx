'use client';

import * as React from 'react';
// import { Calendar } from '@/components/ui/calendar';
import 'react-day-picker/dist/style.css';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
export function Welcome() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-fuchsia-50 flex flex-col items-center py-16 px-6">
      {/* Hero Section */}
      <div className="max-w-4xl text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-rose-600">
          Welcome to GlobeTrek ✈️
        </h1>
        <p className="text-lg text-gray-700">
          Discover your next adventure, explore destinations, and plan
          unforgettable journeys.
        </p>
        <Button className="rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 text-white px-8 py-4 text-lg shadow-lg">
          Start Exploring
        </Button>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8 mt-16 w-full max-w-6xl">
        <Card className="rounded-2xl border border-rose-200 shadow-md hover:shadow-xl transition">
          <CardHeader>
            <CardTitle>🌍 Explore Destinations</CardTitle>
            <CardDescription>
              Find the most exciting tourist spots around the globe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Destinations
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-rose-200 shadow-md hover:shadow-xl transition">
          <CardHeader>
            <CardTitle>🏨 Book Hotels</CardTitle>
            <CardDescription>
              Stay in the best hotels tailored for travelers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Find Hotels
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-rose-200 shadow-md hover:shadow-xl transition">
          <CardHeader>
            <CardTitle>📅 Plan Trips</CardTitle>
            <CardDescription>
              Create itineraries and enjoy stress-free journeys.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Plan Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Section */}
      <div className="mt-16 w-full max-w-md">
        <Card className="rounded-2xl border border-rose-200 shadow-md p-6 bg-gradient-to-br from-amber-50 via-rose-50 to-fuchsia-50">
          <CardHeader className="mb-4">
            <CardTitle className="text-center text-rose-600">
              📅 Pick Your Travel Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-xl border border-rose-200 shadow-sm p-2"
              // dayClassName={day => {
              //   const today = new Date();
              //   const isToday =
              //     day.getDate() === today.getDate() &&
              //     day.getMonth() === today.getMonth() &&
              //     day.getFullYear() === today.getFullYear();

              //   return `
              //     w-10 h-10 flex items-center justify-center rounded-lg
              //     hover:bg-gradient-to-br from-amber-400 via-rose-500 to-fuchsia-600
              //     text-gray-900
              //     ${isToday ? 'bg-rose-500 text-white font-bold' : ''}
              //   `;
              // }
              // }
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
