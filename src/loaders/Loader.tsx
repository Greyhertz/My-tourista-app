import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  MapPin,
  Star,
  Award,
  Globe,
  Camera,
  Navigation,
  Heart,
  Globe2,
  Calendar,
  Compass,
} from 'lucide-react';
import * as Icon from '@phosphor-icons/react';

const stats = [
  { icon: Users, label: 'Happy Travelers', value: '2M+' },
  { icon: MapPin, label: 'Destinations', value: '500+' },
  { icon: Star, label: 'Average Rating', value: '4.9' },
  { icon: Award, label: 'Awards Won', value: '15+' },
  { icon: Globe2, label: 'Countries', value: '120+' },
  { icon: Calendar, label: 'Tours Per Year', value: '8K+' },
];

const features = [
  {
    icon: Navigation,
    title: 'Smart Navigation',
    description:
      'Turn-by-turn directions to hidden gems and popular attractions with advanced GPS.',
  },
  {
    icon: Camera,
    title: 'Photo Spots',
    description:
      'Discover Instagram-worthy locations and tips for amazing shots.',
  },
  {
    icon: Heart,
    title: 'Personalized',
    description: 'Tailored recommendations based on your interests and budget.',
  },
  {
    icon: Globe,
    title: 'Local Insights',
    description:
      'Community-sourced guides that reveal the authentic side of places.',
  },
];

const timeline = [
  {
    year: '2019',
    text: 'Company founded by 3 travelers in a small apartment.',
  },
  { year: '2020', text: 'First mobile app launched with 10k users.' },
  { year: '2022', text: 'Reached 1M users and expanded to 40 countries.' },
  { year: '2024', text: 'Partnerships with major travel brands and airlines.' },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Product',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Travel Director',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
];

const testimonials = [
  {
    name: 'Aisha',
    quote: 'TravelMate helped me find a hidden beach — unforgettable!',
    rating: 5,
  },
  {
    name: 'Carlos',
    quote: 'Amazing local guides and real experiences.',
    rating: 5,
  },
  {
    name: 'Mina',
    quote: 'The app is so simple and useful — highly recommend.',
    rating: 4,
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO with animated background */}
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 opacity-95"
        />

        <div className="relative max-w-7xl mx-auto px-6 py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <Badge className="mb-4">Trusted by 2M+ Travelers</Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Travel smarter —
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">
                {' '}
                Explore deeper
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg mb-8 text-blue-100">
              We connect curious travelers with authentic experiences, expert
              local guides, and meaningful adventures across the globe.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button className="px-6 py-3 shadow-lg" asChild>
                <a>
                  <Icon.Download size={18} weight="bold" className="mr-2" />
                  Download App
                </a>
              </Button>
              <Button variant={'ghost'} className="px-6 py-3 text-white/90">
                Explore Destinations
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats & Partners Marquee */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-8">
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="text-center"
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mb-3">
                  <s.icon className="text-blue-600" size={20} />
                </div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* partners marquee (simple) */}
          <div className="overflow-hidden py-2">
            <motion.div
              className="flex gap-10 items-center"
              animate={{ x: [0, -800] }}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            >
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-8 items-center">
                  <img
                    src="/logos/partner1.svg"
                    alt="partner"
                    className="h-8"
                  />
                  <img
                    src="/logos/partner2.svg"
                    alt="partner"
                    className="h-8"
                  />
                  <img
                    src="/logos/partner3.svg"
                    alt="partner"
                    className="h-8"
                  />
                  <img
                    src="/logos/partner4.svg"
                    alt="partner"
                    className="h-8"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story + Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
            <p className="text-lg text-muted-foreground mb-6">
              From a small team with big dreams to a global travel platform —
              here are the milestones we’re proud of.
            </p>

            <div className="space-y-6">
              {timeline.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {t.year}
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.year}</h4>
                    <p className="text-sm text-muted-foreground">{t.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
                alt="dest"
                className="rounded-xl shadow-lg object-cover h-48 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80"
                alt="dest"
                className="rounded-xl shadow-lg object-cover h-48 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80"
                alt="dest"
                className="rounded-xl shadow-lg object-cover h-48 w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80"
                alt="dest"
                className="rounded-xl shadow-lg object-cover h-48 w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Carousel-like grid */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Product & Features
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      <f.icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{f.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {f.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-white dark:from-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6">Our Values</h3>
          <p className="text-muted-foreground mb-8">
            Principles that guide every decision we make.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Innovation',
                text: 'We build tools that make travel effortless.',
              },
              {
                title: 'Community',
                text: 'Local guides and travelers power our recommendations.',
              },
              {
                title: 'Sustainability',
                text: 'We prioritize responsible tourism and positive impact.',
              },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="p-6 text-left">
                  <CardHeader>
                    <CardTitle>{v.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{v.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Join Us */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-10 text-center">
            Meet the Team
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {team.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow"
              >
                <Avatar>
                  <img src={m.img} alt={m.name} />
                </Avatar>
                <h4 className="font-semibold mt-4">{m.name}</h4>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center rounded-2xl border-2 border-dashed p-6"
            >
              <div>
                <h4 className="font-semibold mb-2">Join Our Team</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Love travel? We’re hiring for product, design, and
                  engineering.
                </p>
                <Button>See Open Roles</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8">What Travelers Say</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                        {t.name.charAt(0)}
                      </div>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {'★'.repeat(t.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">"{t.quote}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Destination Highlights
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="relative rounded-lg overflow-hidden shadow"
              >
                <img
                  src={`https://source.unsplash.com/collection/190727/800x600?sig=${i}`}
                  alt={`dest-${i}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4">
                  <div className="text-white font-semibold">
                    Amazing Place {i + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>How do I book a tour?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Search for a destination, pick dates, and follow the checkout
                  flow. Payment options include cards and major wallets.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Are local guides vetted?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Yes — every guide goes through an identity and quality
                  verification process.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>How do refunds work?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Refund policies vary by partner; most refunds are processed
                  within 7-14 business days.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Newsletter / Join Community */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">Join our community</h3>
          <p className="mb-6 text-blue-100">
            Get exclusive travel tips, early access to new features, and curated
            deals.
          </p>
          <form className="flex flex-col md:flex-row gap-4 justify-center">
            <Input placeholder="Your email address" className="max-w-md" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to explore?</h3>
          <p className="text-muted-foreground mb-8">
            Start your next adventure with TravelMate today.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button className="px-8 py-4">Explore Destinations</Button>
            <Button variant="outline" className="px-8 py-4">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground bg-gray-50 dark:bg-gray-900">
        © {new Date().getFullYear()} TravelMate — crafted with ❤️
      </footer>
    </div>
  );
}
