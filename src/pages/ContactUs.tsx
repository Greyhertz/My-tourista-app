import { motion } from 'framer-motion';
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
import { Mail, Phone, Clock } from 'lucide-react';
import NewsLetterBox from '@/components/core/LetterBox';

export default function ContactUs() {
  return (
    <div className="bg-background text-foreground font-sm">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-primary via-fuchsia-500 to-accent p-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 text-primary-foreground"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg max-w-2xl text-foreground/80"
        >
          Our team is here to answer your questions and help you plan your next
          adventure.
        </motion.p>
      </section>

      {/* Quick Contact Stats */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
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
            className="shadow-lg hover:shadow-xl transition border border-border bg-card"
          >
            <CardContent className="flex flex-col items-center p-6 space-y-2">
              <item.icon className="w-10 h-10 text-primary" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Contact Form */}
      <section className="bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
            className="space-y-6 bg-card p-8 rounded-xl shadow-2xl border border-border"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="flex items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary"
              >
                <Input
                  placeholder="Full Name"
                  required
                  className="bg-transparent border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div
                className="flex items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary"
              >
                {' '}
                <Input
                  placeholder="Email Address"
                  type="email"
                  required
                  className="bg-transparent border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div
              className="flex items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary"
            >
              {' '}
              <Input
                placeholder="Subject"
                required
                className="bg-transparent border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div
              className="flex items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary"
            >
              {' '}
              <Textarea
                rows={5}
                placeholder="Write your message..."
                required
                className="bg-transparent border-0 outline-none flex-1 px-4 py-3 text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Send Message
            </Button>
          </motion.form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-background">
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
      </section>

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
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <NewsLetterBox />
      </motion.div>
    </div>
  );
}
