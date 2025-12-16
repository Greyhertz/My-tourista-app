import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Mail, Phone, Clock, CheckCircle, Sparkles, ArrowRight, Battery, Camera, CheckCircle2, Compass, Heart, Hotel, MessageCircle, Plane, Play, Users, Utensils, Wifi, Map } from 'lucide-react';
import { signUpSchema, type SignUpFormData } from '@/utils/validateForm';
import { zodResolver } from '@hookform/resolvers/zod';
import NewsLetterBox from '@/components/core/LetterBox';
import { ScrollReveal } from './Homepage';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import SocialMediaPhone from '@/components/core/SocialMediaphone';

export default function ContactUs()
{
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    // Simulate animation before routing
    setTimeout(() => {
    }, 1500);
    console.log('✅ Submitted data:', data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }
  return (
    <div className="bg-background text-foreground font-sm">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center text-center p-6 inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 text-sm font-medium mb-6 hover:bg-card hover:text-primary">
            <Sparkles className="w-4 h-4 mr-2 inline" />
            About TravelMate
          </Badge>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Our team is here to answer your questions and help you plan your next
          adventure.
        </motion.p>
      </section>

      {/* Quick Contact Stats */}
      {/* <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: Mail,
            title: 'Email Support',
            desc: 'greyhert120@gmail.com',
          },
          {
            icon: Phone,
            title: 'Call Us',
            desc: '+234 91638788900',
          },
          {
            icon: Clock,
            title: 'Office Hours',
            desc: 'Mon - Fri, 9am - 6pm',
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="shadow-lg hover:shadow-xl transition border-2 border-border bg-card"
          >
            <CardContent className="flex flex-col items-center p-6 space-y-2">
              <item.icon className="w-10 h-10 text-primary" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section> */}

      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            {/* LEFT - Text Content */}
            <motion.form
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 bg-card p-8 rounded-xl shadow-2xl"
            >
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-4xl font-bold">
                  We’d Love to Hear from You
                </h2>
                <p className="text-muted-foreground text-base">
                  Whether you’re planning your next trip, have questions about
                  our services, or just want to say hello—drop us a message.
                </p>
              
              </motion.div>
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  className="flex items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                transition-all duration-300 focus-within:ring-4 focus-within:ring-ring focus-within:border-primary"
                >
                  <Input
                    {...register('name')}
                    placeholder="Full Name"
                    id="name"
                    // value={formData.name}
                    // onChange={handleChange}
                    className="bg-input border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}

                <div
                  className="flex items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                transition-all duration-300 focus-within:ring-4 focus-within:ring-ring focus-within:border-primary/70"
                >
                  {' '}
                  <Input
                    placeholder="Email Address"
                    type="email"
                    required
                    className="bg-input border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground/70"
                  />
                </div>
              </div>
              <div
                className="flex items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                transition-all duration-300 focus-within:ring-4 focus-within:ring-ring/40 focus-within:border-primary/70"
              >
                {' '}
                <Input
                  placeholder="Subject"
                  required
                  className="bg-input border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div
                className="flex items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                transition-all duration-300 focus-within:ring-4 focus-within:ring-ring focus-within:border-primary/70"
              >
                {' '}
                <Textarea
                  rows={5}
                  placeholder="Write your message..."
                  required
                  className="bg-input border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Send Message
              </Button>
            </motion.form>

            {/* RIGHT - Phone Mockup */}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <SocialMediaPhone />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      {/* <section className="bg-background">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold">We’d Love to Hear from You</h2>
            <p className="text-muted-foreground text-base">
              Whether you’re planning your next trip, have questions about our
              services, or just want to say hello—drop us a message.
            </p>
            <img
              src="https://sdmntpritalynorth.oaiusercontent.com/files/00000000-569c-6246-a776-5694f82b5137/raw"
              alt="Contact Illustration"
              className="w-72 md:w-80 animate-float"
            />
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 bg-card p-8 rounded-xl shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="flex items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                transition-all duration-300 focus-within:ring-4 focus-within:ring-ring focus-within:border-primary"
              >
                <Input
                  {...register('name')}
                  placeholder="Full Name"
                  id="name"
                  // value={formData.name}
                  // onChange={handleChange}
                  className="bg-input border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}

              <div
                className="flex items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                transition-all duration-300 focus-within:ring-4 focus-within:ring-ring focus-within:border-primary/70"
              >
                {' '}
                <Input
                  placeholder="Email Address"
                  type="email"
                  required
                  className="bg-input border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground/70"
                />
              </div>
            </div>
            <div
              className="flex items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                transition-all duration-300 focus-within:ring-4 focus-within:ring-ring/40 focus-within:border-primary/70"
            >
              {' '}
              <Input
                placeholder="Subject"
                required
                className="bg-input border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div
              className="flex items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                transition-all duration-300 focus-within:ring-4 focus-within:ring-ring focus-within:border-primary/70"
            >
              {' '}
              <Textarea
                rows={5}
                placeholder="Write your message..."
                required
                className="bg-input border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Send Message
            </Button>
          </motion.form>
        </form>
      </section> */}

      {/* FAQ Section */}
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
            <Card className="bg-card/50 backdrop-blur-sm border-none shadow-xl">
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
                      How quickly do you respond?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                      We aim to reply to all inquiries within 24 hours.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="item-2"
                    className="border-b border-border"
                  >
                    <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors">
                      Can I visit your office in person?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                      Yes! Our office is open Monday to Friday from 9am to 6pm.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>
      {/* <section className="py-20 px-6 bg-background">
        <h2 className="text-3xl font-bold text-center mb-10">FAQs</h2>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible>
            <AccordionItem value="q1">
              <AccordionTrigger>How quickly do you respond?</AccordionTrigger>
              <AccordionContent>
                We aim to reply to all inquiries within 24 hours.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>
                Can I visit your office in person?
              </AccordionTrigger>
              <AccordionContent>
                Yes! Our office is open Monday to Friday from 9am to 6pm.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section> */}

      {/* Map Section */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto mt-10 rounded-xl overflow-hidden shadow-lg border border-border">
          <iframe
            title="Location Map"
            className="w-full h-80"
            src="https://maps.google.com/maps?q=Times%20Square,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Final CTA */}
      {/* <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <NewsLetterBox />
      </motion.div> */}
    </div>
  );
}
