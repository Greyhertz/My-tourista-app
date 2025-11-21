import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  MapPin,
  Users,
  Star,
  Award,
  Compass,
  Camera,
  Heart,
  Globe,
  Play,
  Shield,
  Zap,
  Smartphone,
  Quote,
  ChevronLeft,
  ChevronRight,
  Calendar,
  TrendingUp,
  CheckCircle,
  Sparkles,
  BookOpen,
  Sparkle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollReveal } from './Homepage';

const stats = [
  {
    Icon: Users,
    label: 'Happy Travelers',
    value: '2.5M+',
    color: 'text-blue-600',
  },
  {
    Icon: MapPin,
    label: 'Destinations',
    value: '750+',
    color: 'text-green-600',
  },
  { Icon: Star, label: 'Avg. Rating', value: '4.9', color: 'text-yellow-600' },
  { Icon: Award, label: 'Awards', value: '25+', color: 'text-violet-600' },
];

const features = [
  {
    Icon: Compass,
    title: 'AI-Powered Planning',
    desc: 'Smart itineraries that adapt to your preferences and real-time conditions.',
    color: 'bg-primary/10 text-primary',
  },
  {
    Icon: Camera,
    title: 'AR Photo Guide',
    desc: 'Augmented reality overlays showing perfect shot compositions and timing.',
    color: 'bg-accent/10 text-accent',
  },
  {
    Icon: Heart,
    title: 'Social Travel Network',
    desc: 'Connect with like-minded travelers and share experiences in real-time.',
    color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  },
  {
    Icon: Globe,
    title: 'Offline-First Design',
    desc: 'Full functionality without internet - perfect for remote adventures.',
    color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  },
  {
    Icon: Shield,
    title: 'Safety Alerts',
    desc: 'Real-time safety updates and emergency assistance wherever you are.',
    color: 'bg-red-500/10 text-red-600 dark:text-red-400',
  },
  {
    Icon: Zap,
    title: 'Instant Booking',
    desc: 'Book flights, hotels, and activities with one tap - no endless forms.',
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200&h=200&q=80',
    bio: 'Former Google Maps PM with 10+ years in travel tech',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Product',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80',
    bio: 'Ex-Airbnb designer passionate about user experience',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Travel Experience Director',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80',
    bio: 'Travel blogger turned product expert with 50+ countries visited',
  },
  {
    name: 'David Kim',
    role: 'Head of Engineering',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    bio: 'AI researcher building the future of travel technology',
  },
];

const testimonials = [
  {
    text: "TravelMate's AI planning saved us 20 hours of research. The suggestions were spot-on!",
    author: 'Anna Liu',
    location: 'San Francisco, US',
    avatar:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
  },
  {
    text: 'The offline maps and AR photo guide made our Iceland trip absolutely magical.',
    author: 'James Thompson',
    location: 'London, UK',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
  },
  {
    text: 'Connected with amazing fellow travelers through the app. Made lifelong friends!',
    author: 'Maria Santos',
    location: 'Barcelona, ES',
    avatar:
      'https://images.unsplash.com/photo-1619946794135-5bc917a27793?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
  },
];

const milestones = [
  {
    year: '2019',
    title: 'Founded in a Coffee Shop',
    description:
      'Three travel-obsessed friends decided to solve trip planning forever.',
    icon: Calendar,
  },
  {
    year: '2020',
    title: 'AI Engine Launch',
    description:
      'Introduced machine learning for personalized recommendations.',
    icon: Zap,
  },
  {
    year: '2021',
    title: 'Global Community',
    description:
      'Local experts and guides joined from 100+ countries worldwide.',
    icon: Globe,
  },
  {
    year: '2023',
    title: 'AR Integration',
    description:
      'Revolutionary augmented reality features for immersive exploration.',
    icon: Camera,
  },
  {
    year: '2024',
    title: '2.5M+ Travelers',
    description:
      'Reached major milestone with award-winning mobile experience.',
    icon: TrendingUp,
  },
];

export default function EnhancedTravelMateAbout() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Floating Background Elements */}
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
      </div> */}

      {/* HERO SECTION - Enhanced */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5" />

        {/* <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        /> */}

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 text-sm font-medium mb-6 hover:bg-card">
              <Sparkles className="w-4 h-4 mr-2 inline bg-" />
              About TravelMate
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          >
            About Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Discover our journey, mission, and the passionate people behind the
            world's most innovative travel platform
          </motion.p>
        </div>
      </section>

      {/* Quick Stats - Enhanced */}
      <section className="relative z-10 -mt-16 px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              '100+ Destinations',
              '50K+ Travelers',
              '10+ Years Experience',
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-card/80 backdrop-blur-sm border-2 border-border shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                      {stat}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Header Section - Enhanced */}
      <header className="relative overflow-hidden px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 text-sm hover:from-primary/90 hover:to-accent/90">
                <Award className="w-4 h-4 mr-2 inline" />
                Winner: Best Travel App 2024
              </Badge>

              <h2 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                TravelMate
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                The world's first AI-powered travel companion that learns,
                adapts, and grows with every journey.
                <span className="block mt-2 font-semibold text-primary">
                  Plan smarter. Travel better. Connect deeper.
                </span>
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="shadow-lg px-8 group">
                  <Smartphone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Download Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6 border-2 group"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-border">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    className="text-center space-y-2 group"
                  >
                    <stat.Icon
                      className={`w-8 h-8 mx-auto ${stat.color} group-hover:scale-110 transition-transform`}
                    />
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <Card className="relative shadow-2xl bg-card border-2 border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] relative group">
                    <iframe
                      src="https://youtu.be/exI_hD_4jAM"
                      className="w-full h-full"
                      allowFullScreen
                    />

                    {/* Floating Feature Cards */}
                    <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          AR Photo Mode
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 ring-2 ring-primary">
                          <AvatarImage src={team[0].image} alt={team[0].name} />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-sm text-foreground">
                            {team[0].name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Founder & CEO
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {/* FEATURES SECTION - Enhanced */}
        <section className="py-20">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2" variant="outline">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Our Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Revolutionary Travel Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge technology meets intuitive design to create the
              ultimate travel companion
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group h-full hover:shadow-2xl transition-all duration-500 bg-card border-2 border-border hover:border-primary/50 hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div
                      className={`inline-flex p-4 rounded-2xl ${feature.color} mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <feature.Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section - Enhanced */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <Badge className="mb-4 px-4 py-2" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2 inline" />
                  FAQs
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-muted-foreground">
                  Everything you need to know about TravelMate
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <Card className="bg-background backdrop-blur-sm border-none ">
                <CardContent className="p-8">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-4"
                  >
                    <AccordionItem
                      value="item-1"
                      className="border-b border-border"
                    >
                      <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                        What services do you provide?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                        We offer comprehensive travel planning, hotel bookings,
                        guided tours, and destination insights powered by AI
                        technology.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-2"
                      className="border-b border-border"
                    >
                      <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                        Do you operate internationally?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                        Yes, we partner with agencies and hotels in over 50
                        countries worldwide, ensuring you have support wherever
                        you travel.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border-b-0">
                      <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                        Can I customize my trip?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                        Absolutely! Our AI-powered system allows full
                        customization of your itineraries based on your
                        preferences, budget, and travel style.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </section>

        {/* TESTIMONIALS CAROUSEL - Enhanced */}
        <section className="py-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2" variant="outline">
              <Star className="w-4 h-4 mr-2 inline" />
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Loved by Millions
            </h2>
            <p className="text-xl text-muted-foreground">
              Real stories from real travelers around the world
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-12 text-center relative">
                <div className="absolute top-8 left-8 opacity-20">
                  <Quote className="w-16 h-16" />
                </div>

                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed relative z-10">
                    "{testimonials[currentTestimonial].text}"
                  </p>

                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Avatar className="w-16 h-16 ring-4 ring-primary-foreground/20">
                      <AvatarImage
                        src={testimonials[currentTestimonial].avatar}
                      />
                      <AvatarFallback>
                        {testimonials[currentTestimonial].author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-bold text-lg">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-primary-foreground/80">
                        {testimonials[currentTestimonial].location}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-current text-amber-300"
                      />
                    ))}
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-8 gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-2"
                onClick={() =>
                  setCurrentTestimonial(
                    prev =>
                      (prev - 1 + testimonials.length) % testimonials.length
                  )
                }
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-2"
                onClick={() =>
                  setCurrentTestimonial(
                    prev => (prev + 1) % testimonials.length
                  )
                }
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        <Separator className="my-20" />

        {/* TEAM SECTION - Enhanced */}
        <section className="py-20">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2" variant="outline">
              <Users className="w-4 h-4 mr-2 inline" />
              Our Team
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Meet Our Dream Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate travelers and tech innovators working together to
              revolutionize how you explore the world
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group h-full hover:shadow-2xl transition-all duration-500 bg-card border-2 border-border hover:border-primary/50 hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <Avatar className="w-28 h-28 mx-auto mb-6 ring-4 ring-background shadow-xl group-hover:ring-primary/50 transition-all">
                      <AvatarImage
                        src={member.image}
                        alt={member.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-xl">
                        {member.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold mb-4">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {member.bio}
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <Separator className="my-20" />

        {/* TIMELINE SECTION - Enhanced */}
        <section className="py-20">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2" variant="outline">
              <Calendar className="w-4 h-4 mr-2 inline" />
              Our Story
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              From coffee shop startup to global platform
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary hidden md:block rounded-full" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex items-start gap-8"
                >
                  <div className="hidden md:flex w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full items-center justify-center flex-shrink-0 shadow-lg ring-4 ring-background">
                    <milestone.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  <Card className="flex-1 bg-card border-2 border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <Badge className="w-fit bg-primary/10 text-primary border-primary/30">
                          {milestone.year}
                        </Badge>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3 text-foreground">
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION - Enhanced */}
        <section className="py-20">
          <Card className="border-0 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />

            <CardContent className="p-12 md:p-16 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready for Your Next Adventure?
                </h2>
                <p className="text-xl text-primary-foreground/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Join over 2.5 million travelers who trust TravelMate to make
                  every journey extraordinary. Download now and start exploring
                  the world smarter.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
                  <Button
                    size="lg"
                    className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground px-10 py-6 text-lg font-semibold shadow-xl"
                  >
                    <Smartphone className="w-6 h-6 mr-2" />
                    Download TravelMate
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg font-semibold"
                  >
                    Start Planning Trip
                  </Button>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 text-primary-foreground/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Free Download</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">No Credit Card Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Available Worldwide</span>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Video Modal - Enhanced */}
      {isVideoPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setIsVideoPlaying(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <Card className=" bg-card border-2 border-border shadow-2xl">
              <CardContent className="p-4">
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center overflow-hidden">
                  <iframe
                    src="https://youtu.be/exI_hD_4jAM"
                    className="w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
              onClick={() => setIsVideoPlaying(false)}
            >
              <span className="text-2xl">×</span>
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
