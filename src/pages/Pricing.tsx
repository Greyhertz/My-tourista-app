// src/pages/PricingPage.tsx

import { Check } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { ThemeToggle } from '@/components/core/ThemeToggle';



export default function PricingPage()
{
  const plans = [
    {
      name: 'Free',
      monthly: 0,
      yearly: 0,
      description: 'Perfect for individuals exploring destinations.',
      features: [
        'Access to 5 destinations per month',
        'Basic travel guides',
        'Community support',
      ],
      buttonText: 'Get Started',
      highlight: false,
    },
    {
      name: 'Pro',
      monthly: 29,
      yearly: 290,
      description: 'Great for frequent travelers & small groups.',
      features: [
        'Unlimited destinations',
        'Advanced itinerary builder',
        'Hotel & flight integration',
        'Priority support',
      ],
      buttonText: 'Upgrade to Pro',
      highlight: true,
    },
    {
      name: 'Enterprise',
      monthly: 99,
      yearly: 990,
      description: 'For agencies & businesses managing travel at scale.',
      features: [
        'Custom integrations',
        'Dedicated account manager',
        'Team collaboration tools',
        '24/7 premium support',
      ],
      buttonText: 'Contact Sales',
      highlight: false,
    },
  ];
  const [yearly, setYearly] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-400 dark:from-gray-900 dark:to-black py-20 px-6">
      <ThemeToggle />
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Choose the plan that works best for you and start exploring the world
          with ease.
        </p>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Label htmlFor="billing-switch">Monthly</Label>
          <Switch
            id="billing-switch"
            checked={yearly}
            onCheckedChange={setYearly}
          />
          <Label htmlFor="billing-switch">
            Yearly <span className= "text-green-600 dark:text-green-500">(Save 20%)</span>
          </Label>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map(plan => (
          <Card
            key={plan.name}
            className={`flex flex-col justify-between shadow-lg rounded-2xl border ${
              plan.highlight
                ? 'border-purple-600 shadow-purple-300 dark:shadow-purple-800 scale-105'
                : 'border-gray-200 dark:border-gray-800'
            }`}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <p className="text-gray-500 dark:text-gray-400">
                {plan.description}
              </p>
              <p className="text-4xl font-extrabold mb-4">
                ${yearly ? plan.yearly : plan.monthly}
                <span className="text-base font-medium text-gray-600 dark:text-gray-400">
                  {' '}
                  /{yearly ? 'yr' : 'mo'}
                </span>
              </p>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-6">
              <Button
                variant={plan.highlight ? 'default' : 'outline'}
                className="w-full"
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
