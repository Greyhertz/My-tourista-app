import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Mail, Plane, Globe, MapPin, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';

export default function NewsLetterBox() {
  const [emailSubscription, setEmailSubscription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Subscribing:', emailSubscription);
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmailSubscription('');

      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-background">
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <Plane className="absolute top-20 left-10 w-12 h-12 text-primary rotate-45" />
        <Globe className="absolute top-40 right-20 w-16 h-16 text-accent" />
        <MapPin className="absolute bottom-32 left-1/4 w-10 h-10 text-primary" />
        <Mail className="absolute bottom-20 right-1/3 w-14 h-14 text-accent" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Newsletter Card */}
          <Card className="relative bg-gradient-to-r from-primary to-accent border-0 shadow-2xl overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            <CardContent className="p-0 relative">
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Left Content - Takes 3 columns */}
                <div className="lg:col-span-3 p-12 md:p-16">
                  <div className="max-w-xl">
                    {/* Icon */}
                    <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                      <Mail className="w-8 h-8 text-white" />
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      Your Journey Starts Here
                    </h2>

                    <p className="text-white/90 text-lg mb-8 leading-relaxed">
                      Join thousands of adventurers receiving exclusive travel
                      deals, destination guides, and wanderlust inspiration
                      weekly.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div
                          className="flex-1 relative items-center bg-card border border-border rounded-xl shadow-2xl overflow-hidden 
                           transition-all duration-300 focus-within:ring-4 focus-within:ring-primary/40 focus-within:border-primary"
                        >
                          <Input
                            type="email"
                            required
                            placeholder="Enter your email address"
                            value={emailSubscription}
                            onChange={e => setEmailSubscription(e.target.value)}
                            className="h-14 pl-5 pr-4 text-base bg-white  text-foreground bg-transparent border-0 outline-none flex-1 px-4 py-3 placeholder:text-muted-foreground"
                            disabled={isSubmitting}
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting || isSuccess}
                          className="h-14 px-8 bg-foreground text-background hover:bg-foreground/90 border-0 font-semibold text-base whitespace-nowrap"
                        >
                          {isSuccess ? (
                            <>
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Subscribed!
                            </>
                          ) : isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin mr-2" />
                              Joining...
                            </>
                          ) : (
                            <>Subscribe Free</>
                          )}
                        </Button>
                      </div>
                    </form>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                      {[
                        { icon: CheckCircle, text: 'Exclusive Deals' },
                        { icon: CheckCircle, text: 'No Spam Ever' },
                        { icon: CheckCircle, text: 'Unsubscribe Anytime' },
                      ].map((benefit, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-white/80 text-sm"
                        >
                          <benefit.icon className="w-4 h-4 flex-shrink-0" />
                          <span>{benefit.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Stats - Takes 2 columns */}
                <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm p-12 flex flex-col justify-center border-l border-white/20">
                  <div className="space-y-8">
                    {/* Stat 1 */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="text-center"
                    >
                      <div className="text-6xl font-bold text-white mb-2">
                        50K+
                      </div>
                      <div className="text-white/80 text-lg">
                        Active Subscribers
                      </div>
                    </motion.div>

                    <div className="h-px bg-white/20" />

                    {/* Stat 2 */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="text-center"
                    >
                      <div className="text-6xl font-bold text-white mb-2">
                        150+
                      </div>
                      <div className="text-white/80 text-lg">
                        Destinations Covered
                      </div>
                    </motion.div>

                    <div className="h-px bg-white/20" />

                    {/* Stat 3 */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="text-center"
                    >
                      <div className="text-6xl font-bold text-white mb-2">
                        98%
                      </div>
                      <div className="text-white/80 text-lg">
                        Satisfaction Rate
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust Badges Below */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-8 text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm">Trusted by 50,000+ travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm">Weekly travel inspiration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span className="text-sm">100% privacy guaranteed</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
