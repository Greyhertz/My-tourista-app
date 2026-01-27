import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  X,
  Check,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
  Plane,
  Users,
  Award,
  Camera,
  Mountain,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(100, 'Subject is too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const observerRefs = useRef<HTMLDivElement[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.observeId]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observerRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const setObserverRef = (el: HTMLDivElement | null, id: string) => {
    if (el && !observerRefs.current.includes(el)) {
      el.dataset.observeId = id;
      observerRefs.current.push(el);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    console.log('Form submitted:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
      setIsMessageOpen(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Email Us',
      details: 'hello@wanderlust.travel',
      subtext: 'We reply within 24 hours',
      color: 'from-primary/10 to-primary/5',
      iconColor: 'text-primary',
    },
    {
      icon: <Phone className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      subtext: 'Mon-Fri, 9AM-6PM EST',
      color: 'from-secondary/10 to-secondary/5',
      iconColor: 'text-secondary',
    },
    {
      icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Visit Us',
      details: '123 Travel Street, NY 10001',
      subtext: 'Open for appointments',
      color: 'from-primary/10 to-primary/5',
      iconColor: 'text-primary',
    },
    {
      icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Working Hours',
      details: 'Mon - Fri: 9AM - 6PM',
      subtext: 'Weekend: By appointment',
      color: 'from-secondary/10 to-secondary/5',
      iconColor: 'text-secondary',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      location: 'New York, USA',
      text: 'The team helped me plan the most incredible trip to Bali. Every detail was perfect!',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
      name: 'James Chen',
      location: 'San Francisco, USA',
      text: 'Professional service and amazing destinations. They made our honeymoon unforgettable.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
    {
      name: 'Emma Thompson',
      location: 'London, UK',
      text: 'Best travel agency I have worked with. They truly understand what travelers need.',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    },
  ];

  const features = [
    {
      icon: <Globe className="w-6 h-6 md:w-8 md:h-8" />,
      title: 'Global Network',
      description: 'Access to destinations worldwide',
    },
    {
      icon: <Award className="w-6 h-6 md:w-8 md:h-8" />,
      title: 'Award Winning',
      description: 'Recognized for excellence',
    },
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
      title: 'Expert Team',
      description: '50+ travel specialists',
    },
    {
      icon: <Camera className="w-6 h-6 md:w-8 md:h-8" />,
      title: 'Photo Tours',
      description: 'Capture perfect moments',
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 md:pt-24 lg:pt-32 md:pb-16 lg:pb-20 px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 md:top-20 left-5 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div
          ref={el => setObserverRef(el, 'hero')}
          className={`max-w-5xl mx-auto text-center relative z-10 transition-all duration-1000 ${
            isVisible['hero']
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 backdrop-blur-sm border border-primary/20">
            <Plane className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-primary font-semibold text-sm md:text-base">
              We'd Love to Hear From You
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-foreground mb-4 md:mb-8 leading-tight px-4">
            Get in{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Have questions about your next adventure? Our travel experts are
            here to help you plan the perfect journey across the globe.
          </p>
        </div>

        <div className="hidden md:block absolute top-40 right-10 lg:right-20 animate-float">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
            <Mountain className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
          </div>
        </div>
        <div className="hidden md:block absolute bottom-40 left-10 lg:left-20 animate-float-delayed">
          <div className="w-14 h-14 lg:w-20 lg:h-20 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
            <Camera className="w-7 h-7 lg:w-10 lg:h-10 text-secondary" />
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                ref={el => setObserverRef(el, `info-${idx}`)}
                className={`transition-all duration-700 ${
                  isVisible[`info-${idx}`]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group bg-card backdrop-blur-md hover:-translate-y-2">
                  <CardContent className="p-5 md:p-6 lg:p-8">
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                    >
                      <div className={info.iconColor}>{info.icon}</div>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-card-foreground mb-2">
                      {info.title}
                    </h3>
                    <p className="text-sm md:text-base text-foreground font-semibold mb-1">
                      {info.details}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {info.subtext}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
            {/* Left Column */}
            <div
              ref={el => setObserverRef(el, 'left-content')}
              className={`lg:col-span-2 transition-all duration-1000 ${
                isVisible['left-content']
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-12'
              }`}
            >
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
                    Let's Start Planning Your{' '}
                    <span className="text-primary">Adventure</span>
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Whether you're looking for a relaxing beach escape, an
                    adrenaline-filled adventure, or a cultural immersion, we're
                    here to make it happen.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-card backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                    >
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${
                          idx % 2 === 0
                            ? 'from-primary/10 to-primary/5'
                            : 'from-secondary/10 to-secondary/5'
                        } rounded-xl flex items-center justify-center mb-3`}
                      >
                        <div
                          className={
                            idx % 2 === 0 ? 'text-primary' : 'text-secondary'
                          }
                        >
                          {feature.icon}
                        </div>
                      </div>
                      <h4 className="font-bold text-foreground mb-1 text-xs md:text-sm">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>

                <Card className="border-0 shadow-xl bg-card backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-base md:text-lg font-bold text-foreground mb-4 md:mb-6">
                      What Travelers Say
                    </h3>
                    <div className="relative h-40 md:h-48">
                      {testimonials.map((testimonial, idx) => (
                        <div
                          key={idx}
                          className={`absolute inset-0 transition-all duration-700 ${
                            activeTestimonial === idx
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 translate-x-full'
                          }`}
                        >
                          <div className="flex items-start gap-3 md:gap-4">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shadow-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm md:text-base text-muted-foreground italic mb-3 md:mb-4 leading-relaxed">
                                {testimonial.text}
                              </p>
                              <div>
                                <p className="font-bold text-foreground text-sm md:text-base">
                                  {testimonial.name}
                                </p>
                                <p className="text-xs md:text-sm text-muted-foreground">
                                  {testimonial.location}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                      {testimonials.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveTestimonial(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            activeTestimonial === idx
                              ? 'w-8 bg-primary'
                              : 'w-2 bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="text-base md:text-lg font-bold text-foreground mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Facebook, color: 'primary' },
                      { icon: Twitter, color: 'primary' },
                      { icon: Instagram, color: 'secondary' },
                      { icon: Linkedin, color: 'primary' },
                    ].map((social, idx) => {
                      const Icon = social.icon;
                      return (
                        <button
                          key={idx}
                          className={`w-10 h-10 md:w-12 md:h-12 bg-card border-2 ${
                            social.color === 'primary'
                              ? 'border-primary/20 hover:bg-primary hover:border-primary'
                              : 'border-secondary/20 hover:bg-secondary hover:border-secondary'
                          } rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110 hover:shadow-lg`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              social.color === 'primary'
                                ? 'text-primary'
                                : 'text-secondary'
                            } group-hover:text-white transition-colors`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Message Form */}
            <div
              ref={el => setObserverRef(el, 'right-content')}
              className={`lg:col-span-3 transition-all duration-1000 delay-200 ${
                isVisible['right-content']
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-12'
              }`}
            >
              {!isMessageOpen ? (
                <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                  <CardContent className="p-8 md:p-12 lg:p-16">
                    <div className="text-center">
                      <div className="relative inline-block mb-6 md:mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
                        <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary to-primary/80 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                          <MessageCircle className="w-10 h-10 md:w-12 md:h-12 text-white" />
                        </div>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
                        Send Us a Message
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto px-4">
                        Click below to open our contact form and share your
                        travel dreams with us
                      </p>
                      <Button
                        onClick={() => setIsMessageOpen(true)}
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-8 md:px-10 py-5 md:py-7 text-base md:text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full md:w-auto"
                      >
                        Open Message Form
                        <Send className="ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-0 shadow-2xl bg-card/90 backdrop-blur-2xl overflow-hidden">
                  <CardContent className="p-6 md:p-8 lg:p-10">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        Contact Form
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMessageOpen(false)}
                        className="hover:bg-accent hover:rotate-90 transition-all duration-300"
                      >
                        <X className="w-5 h-5 md:w-6 md:h-6" />
                      </Button>
                    </div>

                    {isSubmitted ? (
                      <div className="text-center py-12 md:py-16">
                        <div className="relative inline-block mb-6">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                          <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-xl">
                            <Check className="w-8 h-8 md:w-10 md:h-10 text-white" />
                          </div>
                        </div>
                        <h4 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                          Message Sent Successfully!
                        </h4>
                        <p className="text-muted-foreground text-base md:text-lg">
                          We'll get back to you within 24 hours.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-5 md:space-y-6">
                        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                          <div>
                            <label className="block text-sm font-bold text-foreground mb-2 md:mb-3">
                              Your Name
                            </label>
                            <input
                              type="text"
                              {...register('name')}
                              className="w-full px-4 md:px-5 py-3 md:py-4 bg-background border-2 border-input rounded-xl md:rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm md:text-base"
                              placeholder="John Doe"
                            />
                            {errors.name && (
                              <p className="text-destructive text-xs md:text-sm mt-2">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-foreground mb-2 md:mb-3">
                              Email Address
                            </label>
                            <input
                              type="email"
                              {...register('email')}
                              className="w-full px-4 md:px-5 py-3 md:py-4 bg-background border-2 border-input rounded-xl md:rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm md:text-base"
                              placeholder="john@example.com"
                            />
                            {errors.email && (
                              <p className="text-destructive text-xs md:text-sm mt-2">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-foreground mb-2 md:mb-3">
                            Subject
                          </label>
                          <input
                            type="text"
                            {...register('subject')}
                            className="w-full px-4 md:px-5 py-3 md:py-4 bg-background border-2 border-input rounded-xl md:rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-foreground placeholder:text-muted-foreground text-sm md:text-base"
                            placeholder="Tour inquiry or general question"
                          />
                          {errors.subject && (
                            <p className="text-destructive text-xs md:text-sm mt-2">
                              {errors.subject.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-foreground mb-2 md:mb-3">
                            Your Message
                          </label>
                          <textarea
                            {...register('message')}
                            rows={5}
                            className="w-full px-4 md:px-5 py-3 md:py-4 bg-background border-2 border-input rounded-xl md:rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none text-foreground placeholder:text-muted-foreground text-sm md:text-base"
                            placeholder="Tell us about your dream vacation..."
                          />
                          {errors.message && (
                            <p className="text-destructive text-xs md:text-sm mt-2">
                              {errors.message.message}
                            </p>
                          )}
                        </div>
                        <Button
                          onClick={handleSubmit(onSubmit)}
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white rounded-xl md:rounded-2xl py-5 md:py-7 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                          <Send className="ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map CTA */}
      <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=800&fit=crop"
              alt="Travel destination"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-transparent"></div>
            <div className="relative h-full flex items-center">
              <div className="px-6 md:px-12 lg:px-16 max-w-2xl">
                <div className="inline-flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full mb-4 md:mb-6 border border-white/20">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  <span className="text-white font-semibold text-sm md:text-base">
                    Find Us
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                  Visit Our Office
                </h3>
                <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                  Schedule an appointment to meet with our travel experts in
                  person and start planning your next adventure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-primary hover:bg-gray-100 rounded-full px-8 md:px-10 py-5 md:py-7 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                    Get Directions
                  </Button>
                  <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8 md:px-10 py-5 md:py-7 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div
          ref={el => setObserverRef(el, 'final-cta')}
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible['final-cta']
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Ready to Explore the World?
          </h3>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 px-4">
            Join thousands of travelers who have discovered their dream
            destinations with us
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-8 md:px-10 py-5 md:py-7 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
              Explore Destinations
            </Button>
            <Button className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white rounded-full px-8 md:px-10 py-5 md:py-7 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
              View Tour Packages
            </Button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
