import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
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
} from 'lucide-react';

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
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
  },
  {
    Icon: Camera,
    title: 'AR Photo Guide',
    desc: 'Augmented reality overlays showing perfect shot compositions and timing.',
    color: 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400',
  },
  {
    Icon: Heart,
    title: 'Social Travel Network',
    desc: 'Connect with like-minded travelers and share experiences in real-time.',
    color: 'bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-400',
  },
  {
    Icon: Globe,
    title: 'Offline-First Design',
    desc: 'Full functionality without internet - perfect for remote adventures.',
    color:
      'bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400',
  },
  {
    Icon: Shield,
    title: 'Safety Alerts',
    desc: 'Real-time safety updates and emergency assistance wherever you are.',
    color: 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400',
  },
  {
    Icon: Zap,
    title: 'Instant Booking',
    desc: 'Book flights, hotels, and activities with one tap - no endless forms.',
    color:
      'bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400',
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);



  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // ⏳ 2 seconds delay

    return () => clearTimeout(timer); // cleanup
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading about page...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-violet-50/40 dark:from-background dark:via-blue-950/30 dark:to-violet-950/40">
      {/* Floating Background Elements - Theme Responsive */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/10 to-violet-500/10 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-accent/20 to-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[300px] rounded-full bg-gradient-to-t from-green-400/10 to-blue-500/10 blur-3xl" />
      </div>

      {/* HERO SECTION */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-primary to-violet-600 text-primary-foreground px-4 py-1 hover:from-primary/90 hover:to-violet-600/90">
                  ✨ Winner: Best Travel App 2024
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-foreground via-primary to-violet-600 bg-clip-text text-transparent">
                  TravelMate
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  The world's first AI-powered travel companion that learns,
                  adapts, and grows with every journey.
                  <span className="font-semibold text-primary">
                    {' '}
                    Plan smarter. Travel better. Connect deeper.
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="shadow-lg px-8">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Download Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-border">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center space-y-2">
                    <stat.Icon className={`w-8 h-8 mx-auto ${stat.color}`} />
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Hero Visual */}
            <div className="relative">
              <Card className="shadow-2xl bg-card border-border">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-xl">
                    {/* Hero Image - Properly sized */}
                    <div className="aspect-[4/3] relative">
                      <img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&h=600&q=80"
                        alt="Beautiful tropical destination with crystal clear waters"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                      {/* Video Play Button */}
                      <Button
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16 bg-background/90 hover:bg-background text-primary"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        <Play className="w-8 h-8" />
                      </Button>

                      {/* Floating Feature Cards */}
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border">
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">
                            AR Photo Mode
                          </span>
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={team[0].image}
                              alt={team[0].name}
                            />
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-sm text-foreground">
                              Sarah Johnson
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Founder & CEO
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {/* FEATURES SECTION */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Revolutionary Travel Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology meets intuitive design to create the
              ultimate travel companion
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="group hover:shadow-xl transition-all duration-300 bg-card border-border hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div
                    className={`inline-flex p-4 rounded-xl ${feature.color} mb-4`}
                  >
                    <feature.Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS CAROUSEL */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Loved by Millions
            </h2>
            <p className="text-xl text-muted-foreground">
              Real stories from real travelers
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-primary to-violet-600 text-primary-foreground border-0 shadow-2xl">
              <CardContent className="p-8 text-center">
                <Quote className="w-12 h-12 mx-auto mb-6 opacity-50" />
                <p className="text-xl mb-6 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={testimonials[currentTestimonial].avatar}
                    />
                    <AvatarFallback>
                      {testimonials[currentTestimonial].author[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-semibold">
                      {testimonials[currentTestimonial].author}
                    </div>
                    <div className="text-primary-foreground/70 text-sm">
                      {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-current text-yellow-400"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center mt-6 gap-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() =>
                  setCurrentTestimonial(
                    prev =>
                      (prev - 1 + testimonials.length) % testimonials.length
                  )
                }
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() =>
                  setCurrentTestimonial(
                    prev => (prev + 1) % testimonials.length
                  )
                }
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        <Separator className="my-16" />

        {/* TEAM SECTION */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Meet Our Dream Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate travelers and tech innovators working together to
              revolutionize how you explore the world
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <Card
                key={i}
                className="group hover:shadow-xl transition-all duration-300 bg-card border-border hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-background shadow-lg">
                      <AvatarImage
                        src={member.image}
                        alt={member.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-lg">
                        {member.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {member.bio}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        {/* TIMELINE SECTION */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              From coffee shop startup to global platform
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary to-violet-400 hidden md:block"></div>

            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <div key={i} className="relative flex items-start gap-8">
                  {/* Timeline dot */}
                  <div className="hidden md:flex w-16 h-16 bg-gradient-to-r from-primary to-violet-500 rounded-full items-center justify-center flex-shrink-0 shadow-lg">
                    <milestone.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <Card className="flex-1 bg-card border-border shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <Badge variant="secondary" className="w-fit">
                          {milestone.year}
                        </Badge>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-foreground">
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16">
          <Card className="border-0 bg-gradient-to-r from-primary via-violet-600 to-pink-600 text-primary-foreground shadow-2xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-6">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Join over 2.5 million travelers who trust TravelMate to make
                every journey extraordinary
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button
                  size="lg"
                  className="bg-background text-foreground hover:bg-accent px-8"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Download TravelMate
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-primary-foreground border-primary-foreground hover:bg-background/10 px-6"
                >
                  Start Planning Trip
                </Button>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Free Download
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  No Credit Card Required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Available Worldwide
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-8 mb-6">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              Terms
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              Support
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              Careers
            </Button>
          </div>
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} TravelMate — Crafted with ❤️ for
            curious travelers worldwide
          </p>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsVideoPlaying(false)}
        >
          <Card className="max-w-4xl w-full mx-4 bg-card border-border">
            <CardContent className="p-0">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  Demo video would play here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
