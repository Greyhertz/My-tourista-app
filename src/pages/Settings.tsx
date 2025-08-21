// src/pages/TravelSettingsPage.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import type { JSX } from 'react/jsx-runtime';

/**
 * TravelSettingsPage
 * - Travel-first settings (profile, travel prefs, integrations, billing, security, docs)
 * - Dark mode persists to localStorage and toggles document.documentElement.classList
 * - Stubbed handlers -> replace with your API calls
 */

type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  exp: string;
  default?: boolean;
};

export default function TravelSettingsPage(): JSX.Element {
  // --- Dark mode (persisted) ---
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('travel-app-dark') === 'true';
    } catch {
      return false;
    }
  });
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    try {
      localStorage.setItem('travel-app-dark', darkMode ? 'true' : 'false');
    } catch {}
  }, [darkMode]);

  // --- Profile ---
  const [profileName, setProfileName] = useState('Prince Onuoha');
  const [email, setEmail] = useState('prince@example.com');
  const [phone, setPhone] = useState('+234 800 000 0000');
  const [bio, setBio] = useState('Traveler • Photographer • Food lover');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setAvatarFile(f);
    const url = URL.createObjectURL(f);
    setAvatarUrl(url);
  }

  // --- Travel preferences ---
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');
  const [homeAirport, setHomeAirport] = useState('LOS'); // IATA code example
  const [seatPreference, setSeatPreference] = useState('Aisle');
  const [mealPreference, setMealPreference] = useState('Any');
  const [travelerType, setTravelerType] = useState('Leisure'); // Leisure/Business/Group
  const [syncItineraries, setSyncItineraries] = useState(true);
  const [shareTripsWith, setShareTripsWith] = useState(''); // email to share with

  // --- Integrations (APIs) ---
  const [amadeusConnected, setAmadeusConnected] = useState(true);
  const [geoapifyConnected, setGeoapifyConnected] = useState(true);
  const [unsplashConnected, setUnsplashConnected] = useState(false);

  // --- Billing & Payment methods ---
  const [plan, setPlan] = useState<'Free' | 'Pro' | 'Enterprise'>('Pro');
  const [nextBillingDate, setNextBillingDate] = useState('Sept 1, 2025');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 'pm1', brand: 'Visa', last4: '4242', exp: '12/27', default: true },
  ]);

  // --- Security & sessions ---
  const [twoFactor, setTwoFactor] = useState(true);
  const [activeSessions] = useState([
    'Chrome — Lagos — Aug 21, 2025',
    'iPhone — Abuja — Aug 20, 2025',
  ]);

  // --- Travel documents upload ---
  const [travelDocs, setTravelDocs] = useState<{ id: string; name: string }[]>(
    []
  );

  function handleUploadDoc(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const id = `doc-${Date.now()}`;
    setTravelDocs(s => [...s, { id, name: f.name }]);
    void toast(`Uploaded ${f.name}`);
  }

  // --- Small toast (dev) ---
  function toast(msg: string) {
    console.info('TOAST:', msg);
    try {
      /* eslint-disable no-alert */ alert(msg);
    } catch {}
    return Promise.resolve();
  }

  // --- Actions ---
  function saveProfile() {
    // Replace with API call
    console.log('saveProfile', { profileName, email, phone, bio });
    void toast('Profile saved');
  }
  function savePreferences() {
    console.log('savePreferences', {
      currency,
      language,
      homeAirport,
      seatPreference,
      mealPreference,
      travelerType,
      syncItineraries,
    });
    void toast('Preferences saved');
  }
  function toggleIntegration(name: string) {
    if (name === 'amadeus') setAmadeusConnected(v => !v);
    if (name === 'geoapify') setGeoapifyConnected(v => !v);
    if (name === 'unsplash') setUnsplashConnected(v => !v);
    void toast(`${name} toggled (mock)`);
  }
  function addPaymentMethod() {
    const id = `pm${Date.now()}`;
    setPaymentMethods(s => [
      ...s,
      {
        id,
        brand: 'Visa',
        last4: `${Math.floor(Math.random() * 9000) + 1000}`,
        exp: '01/28',
        default: false,
      },
    ]);
    void toast('Payment method added (mock)');
  }
  function removePaymentMethod(id: string) {
    setPaymentMethods(s => s.filter(m => m.id !== id));
    void toast('Payment method removed');
  }
  function cancelSubscription() {
    setPlan('Free');
    void toast('Subscription cancelled — downgraded to Free (mock)');
  }
  function downloadInvoice(id: string) {
    void toast(`Downloading invoice ${id} (mock)`);
  }

  // --- UI: large settings hub ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black py-20 px-6 mt-20">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto mb-8"
      >
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt="avatar" />
              ) : (
                <AvatarFallback>{profileName.charAt(0)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h1 className="text-2xl font-extrabold">{profileName}</h1>
              <p className="text-sm text-muted-foreground">
                {email} • {phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="dark-mode" className="text-sm">
                Dark
              </Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                void toast('Profile URL copied');
              }}
            >
              Copy profile link
            </Button>
            <Button onClick={saveProfile}>Save</Button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto space-y-6 space-x-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-6 gap-6 max-w-">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="docs">Travel Docs</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your traveler profile</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      {avatarUrl ? (
                        <AvatarImage src={avatarUrl} alt="avatar" />
                      ) : (
                        <AvatarFallback>{profileName.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <Label className="text-sm">Profile picture</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Full name</Label>
                    <Input
                      value={profileName}
                      onChange={e => setProfileName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Short bio</Label>
                    <Textarea
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Emergency contact</Label>
                    <Input placeholder="Name — phone" />
                  </div>

                  <div>
                    <Label>Preferred travel partner email</Label>
                    <Input
                      placeholder="friend@example.com"
                      value={shareTripsWith}
                      onChange={e => setShareTripsWith(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setProfileName('Prince Onuoha');
                        setEmail('prince@example.com');
                        void toast('Reverted profile (mock)');
                      }}
                    >
                      Reset
                    </Button>
                    <Button onClick={saveProfile}>Save Profile</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Travel Preferences</CardTitle>
                <CardDescription>
                  Set how the app should behave for your trips
                </CardDescription>
              </CardHeader>

              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Default currency</Label>
                    <select
                      value={currency}
                      onChange={e => setCurrency(e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                    >
                      <option value="USD">USD — $</option>
                      <option value="EUR">EUR — €</option>
                      <option value="NGN">NGN — ₦</option>
                      <option value="GBP">GBP — £</option>
                    </select>
                  </div>

                  <div>
                    <Label>Language</Label>
                    <select
                      value={language}
                      onChange={e => setLanguage(e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                    >
                      <option value="en">English</option>
                      <option value="ig">Igbo</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>

                  <div>
                    <Label>Home airport (IATA)</Label>
                    <Input
                      value={homeAirport}
                      onChange={e => setHomeAirport(e.target.value)}
                      placeholder="LOS"
                    />
                  </div>

                  <div>
                    <Label>Traveler type</Label>
                    <select
                      value={travelerType}
                      onChange={e => setTravelerType(e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                    >
                      <option>Leisure</option>
                      <option>Business</option>
                      <option>Group</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Seat preference</Label>
                    <select
                      value={seatPreference}
                      onChange={e => setSeatPreference(e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                    >
                      <option>Aisle</option>
                      <option>Window</option>
                      <option>Any</option>
                    </select>
                  </div>

                  <div>
                    <Label>Meal preference</Label>
                    <select
                      value={mealPreference}
                      onChange={e => setMealPreference(e.target.value)}
                      className="w-full rounded-md border px-3 py-2"
                    >
                      <option>Any</option>
                      <option>Vegetarian</option>
                      <option>Vegan</option>
                      <option>Halal</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Sync itineraries</Label>
                      <div className="text-sm text-muted-foreground">
                        Automatically sync bookings and trips to your calendar
                      </div>
                    </div>
                    <Switch
                      checked={syncItineraries}
                      onCheckedChange={setSyncItineraries}
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        /* revert */ void toast('Preferences reverted (mock)');
                      }}
                    >
                      Reset
                    </Button>
                    <Button onClick={savePreferences}>Save Preferences</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Connect external services (APIs & image providers)
                </CardDescription>
              </CardHeader>

              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        Amadeus (Flights & Hotels)
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Commercial travel APIs for availability & fares
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>
                        {amadeusConnected ? 'Connected' : 'Disconnected'}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleIntegration('amadeus')}
                      >
                        {amadeusConnected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        Geoapify (Geocoding & Maps)
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Location search, reverse geocoding and routing
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>
                        {geoapifyConnected ? 'Connected' : 'Disconnected'}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleIntegration('geoapify')}
                      >
                        {geoapifyConnected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Unsplash (Images)</div>
                      <div className="text-sm text-muted-foreground">
                        Destination imagery for listings
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>
                        {unsplashConnected ? 'Connected' : 'Disconnected'}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleIntegration('unsplash')}
                      >
                        {unsplashConnected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                </div>

                <aside>
                  <Card>
                    <CardHeader>
                      <CardTitle>API Keys & Limits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Track API usage for Amadeus and Geoapify to avoid
                        overages.
                      </p>
                      <Separator />
                      <div className="mt-3">
                        <p className="text-sm">
                          Amadeus calls: <strong>12,430</strong>
                        </p>
                        <p className="text-sm">
                          Geoapify calls: <strong>6,320</strong>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </aside>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing</CardTitle>
                <CardDescription>Subscription & invoices</CardDescription>
              </CardHeader>

              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Current plan</Label>
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-semibold">{plan} Plan</div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Next charge: <strong>{nextBillingDate}</strong>
                    </div>
                  </div>

                  <div>
                    <Label>Payment methods</Label>
                    <div className="space-y-3 mt-2">
                      {paymentMethods.map(pm => (
                        <div
                          key={pm.id}
                          className="flex items-center justify-between border rounded-lg p-3"
                        >
                          <div>
                            <div className="font-medium">
                              {pm.brand} •••• {pm.last4}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Expires {pm.exp}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {pm.default ? (
                              <Badge>Default</Badge>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  /* set default (mock) */ void toast(
                                    'Set default (mock)'
                                  );
                                }}
                              >
                                Make default
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removePaymentMethod(pm.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button onClick={addPaymentMethod}>
                        Add payment method
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Invoices</Label>
                    <div className="space-y-2 mt-2">
                      {[
                        {
                          id: 'INV-2025-08',
                          date: 'Aug 01, 2025',
                          amount: '$29.00',
                        },
                        {
                          id: 'INV-2025-07',
                          date: 'Jul 01, 2025',
                          amount: '$29.00',
                        },
                        {
                          id: 'INV-2025-06',
                          date: 'Jun 01, 2025',
                          amount: '$29.00',
                        },
                      ].map(inv => (
                        <div
                          key={inv.id}
                          className="flex items-center justify-between border rounded p-3"
                        >
                          <div>
                            <div className="font-medium">{inv.id}</div>
                            <div className="text-sm text-muted-foreground">
                              {inv.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="font-semibold">{inv.amount}</div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => downloadInvoice(inv.id)}
                            >
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Link to="/pricing">
                      <Button variant="default">Change Plan</Button>
                    </Link>
                    <Button variant="destructive" onClick={cancelSubscription}>
                      Cancel subscription
                    </Button>
                  </div>
                </div>

                <aside>
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Plan
                          </span>
                          <span className="font-medium">{plan}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Next payment
                          </span>
                          <span className="font-medium">{nextBillingDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Annual cost
                          </span>
                          <span className="font-medium">
                            {plan === 'Pro'
                              ? '$228'
                              : plan === 'Enterprise'
                              ? 'Custom'
                              : '$0'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Travel Credits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        You have <strong>$120</strong> in travel credits.
                      </div>
                      <Button className="mt-3">Apply credits</Button>
                    </CardContent>
                  </Card>
                </aside>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Travel Docs */}
          <TabsContent value="docs">
            <Card>
              <CardHeader>
                <CardTitle>Travel Documents</CardTitle>
                <CardDescription>
                  Upload passports, visas, insurance, and other documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input type="file" onChange={handleUploadDoc} />
                </div>

                <div>
                  <Label>Uploaded documents</Label>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    {travelDocs.length === 0 && (
                      <li className="text-sm text-muted-foreground">
                        No documents uploaded
                      </li>
                    )}
                    {travelDocs.map(d => (
                      <li
                        key={d.id}
                        className="flex items-center justify-between"
                      >
                        <span>{d.name}</span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              void toast(`Download ${d.name} (mock)`)
                            }
                          >
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setTravelDocs(s => s.filter(x => x.id !== d.id));
                              void toast('Document deleted');
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Protect your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-factor authentication</div>
                    <div className="text-sm text-muted-foreground">
                      Protect your bookings and profile
                    </div>
                  </div>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>

                <div>
                  <Label>Active sessions</Label>
                  <ul className="list-disc pl-6 mt-2 text-sm text-muted-foreground">
                    {activeSessions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      /* logout everywhere (mock) */ void toast(
                        'Signed out everywhere (mock)'
                      );
                    }}
                  >
                    Sign out everywhere
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      /* delete account (mock) */ void toast(
                        'Account deletion requested (mock)'
                      );
                    }}
                  >
                    Delete account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
