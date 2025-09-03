import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

export default function NewsLetterBox()
{
  const [emailSubscription, setEmailSubscription] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribing:', emailSubscription);
    setEmailSubscription('');
  };
  return (
    <section className="py-24 px-6 bg-background">
      <div className="container mx-auto">
        <Card className="max-w-3xl mx-auto bg-card/80 backdrop-blur-sm  shadow-purple-400 dark:shadow-purple-800">
          <CardContent className="p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get travel inspiration in your inbox
            </h3>
            <p className="text-muted-foreground mb-8">
              Exclusive deals, new itineraries, and smart tips — no spam, just
              wanderlust.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <div className="relative flex-1 max-w-md">
                <Input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={emailSubscription}
                  onChange={e => setEmailSubscription(e.target.value)}
                  className="px-4 py-3 pl-10 rounded-lg border-2 border-input  focus:outline-none bg-background w-full"
                />
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              </div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Subscribe
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}


