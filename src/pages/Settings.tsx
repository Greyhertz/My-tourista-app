// src/pages/TravelSettingsPage.tsx
'Use Client'
import React, { useEffect, useReducer, useState } from 'react';
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
import {
  Select,
  SelectLabel,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// import { Link } from 'react-router-dom';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
import { useNotification } from '@/context/NotificationContext';

import { useTravelPreferences } from '@/context/PreferenceContext';
import { toast } from 'sonner';
import { useLang } from '@/context/LangContext';



/**
 * TravelSettingsPage
 * - Travel-first settings (profile, travel prefs, integrations, billing, security, docs)
 * - Dark mode persists to localStorage and toggles document.documentElement.classList
 * - Stubbed handlers -> replace with your API calls
 */
('use client');

type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  exp: string;
  default?: boolean;
};
type PymentMethodincludeIrreversible =  PaymentMethod &{
irriversible: boolean
 }

export default function TravelSettingsPage(): JSX.Element {
  // --- Dark mode (persisted) ---
  // const [darkMode, setDarkMode] = useState<boolean>(() => {
  //   try {
  //     return localStorage.getItem('travel-app-dark') === 'true';
  //   } catch {
  //     return false;
  //   }
  // });
  // useEffect(() => {
  //   if (darkMode) document.documentElement.classList.add('dark');
  //   else document.documentElement.classList.remove('dark');
  //   try {
  //     localStorage.setItem('travel-app-dark', darkMode ? 'true' : 'false');
  //   } catch {}
  // }, [darkMode]);

       {
         /* <div className="flex items-center gap-2">
              <Label htmlFor="dark-mode" className="text-sm">
                Dark
              </Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div> */
       }

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

  const { preferences, updatePreferences, resetPreferences } =
    useTravelPreferences();

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
    void toast.success(`Uploaded ${f.name}`);
  }

  // notificaions
  const { addNotification } = useNotification();
  // language translate
  const { state, dispatch, translate } = useLang();
  const [sampleText] = useState('Welcome to our travel app!');
  const [translated, setTranslated] = useState('')
  state
  const handlelangChange = async (lang: string) => {
    // update PreferenceContext
    updatePreferences({ language: lang });

    // update LangContext
    dispatch({ type: 'SET_LANGUAGE', payload: lang });

    // sample translation test (optional)
    const result = await translate(sampleText, lang);
    setTranslated(result);
  };

  // --- Actions ---
  function saveProfile() {
    // Replace with API call
    console.log('saveProfile', { profileName, email, phone, bio });
    toast.success('Profile saved');
  }

  const savePreferences = () => {
    void toast.success('Preferences saved successfully!');
  };

  function toggleIntegration(name: string) {
    if (name === 'amadeus') setAmadeusConnected(v => !v);
    if (name === 'geoapify') setGeoapifyConnected(v => !v);
    if (name === 'unsplash') setUnsplashConnected(v => !v);
    void toast.info(`${name} toggled (mock)`);
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
    void toast.info('Payment method added (mock)');
  }
  function removePaymentMethod(id: string) {
    setPaymentMethods(s => s.filter(m => m.id !== id));
    void toast.dismiss('Payment method removed');
  }
  function cancelSubscription() {
    setPlan('Free');
    void toast.dismiss('Subscription cancelled — downgraded to Free (mock)');
  }
  function downloadInvoice(id: string) {
    void toast.loading(`Downloading invoice ${id} (mock)`);
  }

  // --- UI: large settings hub ---
  return (
    <div className="min-h-screen bg-background py-20 px-6 mt-20">
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
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                void toast.success('Profile URL copied');
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
            <Card className="bg-card text-foreground">
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
                        void toast.info('Reverted profile (mock)');
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={() => {
                        saveProfile();
                      }}
                    >
                      Save Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card className="bg-card backdrop-blur-xl border border-border shadow-2xl">
              <CardHeader>
                <CardTitle>Travel Preferences</CardTitle>
                <CardDescription>
                  Set how the app should behave for your trips
                </CardDescription>
              </CardHeader>

              <CardContent className="grid md:grid-cols-2 gap-6 bg-card text-foreground backdrop-blur-xl border border-border shadow-2xl">
                <div className="space-y-4">
                  {/* Currency */}
                  <div className="relative">
                    <Label>Default Currency</Label>
                    <Select
                      value={preferences.currency}
                      onValueChange={val =>
                        updatePreferences({ currency: val })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD — $</SelectItem>
                        <SelectItem value="EUR">EUR — €</SelectItem>
                        <SelectItem value="NGN">NGN — ₦</SelectItem>
                        <SelectItem value="GBP">GBP — £</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Language */}
                  <div>
                    <Label>Language</Label>
                    <Select
                      value={preferences.language}
                      onValueChange={value => handlelangChange(value)} // 👈 no need for e.target.value
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="ig">Igbo</SelectItem>
                          <SelectItem value="yo">Yoruba</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {/* {toast.success(`translated to${sampleText}`)} */}
                    {state.loading && (
                      <div className="text-sm text-muted-foreground">
                        Translating…
                      </div>
                    )}
                    {state.error && (
                      <div className="text-sm text-red-500">{state.error}</div>
                    )}
                    <div className="font-semibold mt-2">
                      Translated: {translated || '(no translation yet)'}
                    </div>
                  </div>

                  {/* Home airport */}
                  <div>
                    <Label>Home airport (IATA)</Label>
                    <Input
                      value={preferences.homeAirport}
                      onChange={e =>
                        updatePreferences({ homeAirport: e.target.value })
                      }
                      placeholder="LOS"
                    />
                  </div>

                  {/* Traveler type */}
                  <div>
                    <Label>Traveler Type</Label>
                    <Select
                      value={preferences.travelerType}
                      onValueChange={e =>
                        updatePreferences({ travelerType: e.target.value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Leisure">Leisure</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Group">Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Seat preference */}
                  <div>
                    <Label>Seat Preference</Label>
                    <Select
                      value={preferences.seatPreference}
                      onValueChange={val =>
                        updatePreferences({ seatPreference: val })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aisle">Aisle</SelectItem>
                        <SelectItem value="Window">Window</SelectItem>
                        <SelectItem value="Any">Any</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Meal preference */}
                  <div>
                    <Label>Meal Preference</Label>
                    <Select
                      value={preferences.mealPreference}
                      onValueChange={val =>
                        updatePreferences({ mealPreference: val })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Any">Any</SelectItem>
                        <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="Vegan">Vegan</SelectItem>
                        <SelectItem value="Halal">Halal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sync itineraries */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Sync itineraries</Label>
                      <div className="text-sm text-muted-foreground">
                        Automatically sync bookings and trips to your calendar
                      </div>
                    </div>
                    <Switch
                      checked={preferences.syncItineraries}
                      onCheckedChange={val =>
                        updatePreferences({ syncItineraries: val })
                      }
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={resetPreferences}>
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
            <Card className="bg-card text-foreground">
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
                  <Card className="text-foreground">
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
            <Card className="bg-card text-foreground">
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
                                  addNotification('set default mock', 'info');
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
                  <Card className="bg-card text-foreground">
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

                  <Card className="mt-4 bg-card text-foreground">
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
            <Card className="bg-card text-foreground backdrop-blur-xl border  shadow-2xl">
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
                              void toast.loading(`Download ${d.name} (mock)`)
                            }
                          >
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setTravelDocs(s => s.filter(x => x.id !== d.id));
                              void toast.error('Document deleted');
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
            <Card className="bg-card text-foreground">
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
                      /* logout everywhere (mock) */ void toast.error(
                        'Signed out everywhere (mock)'
                      );
                    }}
                  >
                    Sign out everywhere
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      /* delete account (mock) */ void toast.dismiss(
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
