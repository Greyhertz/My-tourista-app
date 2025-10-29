// src/pages/TravelSettingsPage.tsx
'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Camera,
  Globe,
  CreditCard,
  Shield,
  FileText,
  Settings,
  ChevronRight,
  MapPin,
  Utensils,
  CalendarCheck,
  Save,
  RotateCcw,
  Plus,
  X,
  Download,
} from 'lucide-react';

import { useNotification } from '@/context/NotificationContext';
import { useTravelPreferences } from '@/context/PreferenceContext';
import { toast } from 'sonner';
import { useLang } from '@/context/LangContext';

type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  exp: string;
  default?: boolean;
};

export default function TravelSettingsPage(): JSX.Element
{
  const { user } = useUser();
  const [profileName, setProfileName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [bio, setBio] = useState('Traveler • Photographer • Food lover');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  
  if (!user) {
    return (
      <div className="max-w-5xl m-60 mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">
          No Data Available
        </h1>
        <p className="text-muted-foreground">
          It looks like you navigated here directly. Please sign up first.
        </p>
        <Button className="mt-4 px-4 py-2">
          <Link to="/sign-up">Sign Up</Link>
        </Button>
      </div>
    );
  }

  function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setAvatarFile(f);
    const url = URL.createObjectURL(f);
    setAvatarUrl(url);
  }

  const { preferences, updatePreferences, resetPreferences } =
    useTravelPreferences();
  const [shareTripsWith, setShareTripsWith] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  const [amadeusConnected, setAmadeusConnected] = useState(true);
  const [geoapifyConnected, setGeoapifyConnected] = useState(true);
  const [unsplashConnected, setUnsplashConnected] = useState(false);

  const [plan, setPlan] = useState<'Free' | 'Pro' | 'Enterprise'>('Pro');
  const [nextBillingDate, setNextBillingDate] = useState('Sept 1, 2025');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 'pm1', brand: 'Visa', last4: '4242', exp: '12/27', default: true },
  ]);

  const [twoFactor, setTwoFactor] = useState(true);
  const [activeSessions] = useState([
    'Chrome — Lagos — Aug 21, 2025',
    'iPhone — Abuja — Aug 20, 2025',
  ]);

  const [travelDocs, setTravelDocs] = useState<{ id: string; name: string }[]>(
    []
  );

  function handleUploadDoc(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const id = `doc-${Date.now()}`;
    setTravelDocs(s => [...s, { id, name: f.name }]);
    toast.success(`Uploaded ${f.name}`);
  }

  const { addNotification } = useNotification();
  const { state, dispatch, translate } = useLang();
  const [sampleText] = useState('Welcome to our travel app!');
  const [translated, setTranslated] = useState('');

  const handlelangChange = async (lang: string) => {
    updatePreferences({ language: lang });
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
    const result = await translate(sampleText, lang);
    setTranslated(result);
  };

  function saveProfile() {
    console.log('saveProfile', {profileName,  email, phone, bio });
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
    void toast.success('Payment method removed');
  }

  function cancelSubscription() {
    setPlan('Free');
    void toast.error('Subscription cancelled — downgraded to Free (mock)');
  }

  function downloadInvoice(id: string) {
    void toast.info(`Downloading invoice ${id} (mock)`);
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: Camera },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'docs', label: 'Travel Docs', icon: FileText },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Header */}
      <Card className="border-b rounded-none text-primary bg-card/80 backdrop-blur-xl fixed right-0 left-0 top-0 mb-10 z-50 shadow-xl">
        <CardContent className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-card shadow-xl">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt="avatar" />
                  ) : (
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-card"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <p className="text-muted-foreground mt-1 flex items-center gap-2">
                  <span>{user.email}</span>
                  <span className="text-muted-foreground">•</span>
                  <span>{user.phone}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                className="border-2"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  void toast.success('Profile URL copied');
                }}
              >
                Copy Profile Link
              </Button>
              <Button
                size="lg"
                onClick={saveProfile}
                className="bg-gradient-to-r from-primary to-accent hover:shadow-xl transition-all"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="max-w-7xl mt-10 mx-auto px-6 py-12">
        <div className="flex gap-8 mt-20">
          {/* Sidebar Navigation */}
          <div className="w-72 shrink-0">
            <Card className="sticky top-32 shadow-xl text-foreground border">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <Button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        variant="ghost"
                        className={`w-full justify-start gap-4 px-5 py-6 transition-all group ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:from-primary hover:to-accent'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium flex-1 text-left">
                          {tab.label}
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            activeTab === tab.id
                              ? 'opacity-100'
                              : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />
                      </Button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="shadow-xl border text-foreground">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-2xl">Profile Settings</CardTitle>
                    <CardDescription className="text-base">
                      Manage your personal information and travel preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <Card className="bg-gradient-to-br from-secondary to-accent/20 border-2">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-6">
                              <div className="relative">
                                <Avatar className="h-24 w-24 border-4 border-card shadow-lg">
                                  {avatarUrl ? (
                                    <AvatarImage src={avatarUrl} alt="avatar" />
                                  ) : (
                                    <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                                      {user.name.charAt(0)}
                                    </AvatarFallback>
                                  )}
                                </Avatar>
                                <Label
                                  htmlFor="avatar-upload"
                                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform"
                                >
                                  <Camera className="w-5 h-5 text-primary" />
                                  <Input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                  />
                                </Label>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-foreground">
                                  Profile Picture
                                </Label>
                                <p className="text-xs text-muted-foreground mt-1">
                                  JPG, PNG or GIF (max. 5MB)
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="space-y-2">
                          <Label className="font-semibold">Full Name</Label>
                          <Input
                            disabled
                            value={user.name}
                            className="h-12 border-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="font-semibold">Email Address</Label>
                          <Input
                            disabled
                            value={user.email}
                            className="h-12 border-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="font-semibold">Phone Number</Label>
                          <Input
                            disabled
                            value={user.phone}
                            className="h-12 border-2"
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="font-semibold">Short Bio</Label>
                          <Textarea
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                            rows={4}
                            className="resize-none border-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Emergency Contact
                          </Label>
                          <Input
                            placeholder="Name — Phone number"
                            className="h-12 border-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Travel Partner Email
                          </Label>
                          <Input
                            placeholder="friend@example.com"
                            value={shareTripsWith}
                            onChange={e => setShareTripsWith(e.target.value)}
                            className="h-12 border-2"
                          />
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button
                            variant="outline"
                            size="lg"
                            className="flex-1 border-2"
                            onClick={() => {
                              setProfileName('Prince Onuoha');
                              setEmail('prince@example.com');
                              void toast.info('Reverted profile (mock)');
                            }}
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Reset</span>
                          </Button>
                          <Button
                            size="lg"
                            className="flex-1 bg-gradient-to-r from-primary to-accent"
                            onClick={() => {
                              saveProfile();
                            }}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">
                              Save Profile
                            </span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="shadow-xl border text-foreground">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-2xl">
                      Travel Preferences
                    </CardTitle>
                    <CardDescription className="text-base">
                      Customize your travel experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Default Currency
                          </Label>
                          <Select
                            value={preferences.currency}
                            onValueChange={val =>
                              updatePreferences({ currency: val })
                            }
                          >
                            <SelectTrigger className="h-12 border-2">
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

                        <div className="space-y-2">
                          <Label className="font-semibold">Language</Label>
                          <Select
                            value={preferences.language}
                            onValueChange={value => handlelangChange(value)}
                          >
                            <SelectTrigger className="h-12 border-2">
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
                          {state.loading && (
                            <div className="text-sm text-muted-foreground">
                              Translating…
                            </div>
                          )}
                          {state.error && (
                            <div className="text-sm text-red-500">
                              {state.error}
                            </div>
                          )}
                          <div className="font-semibold mt-2 text-sm">
                            Translated: {translated || '(no translation yet)'}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="font-semibold flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Home Airport (IATA)
                          </Label>
                          <Input
                            value={preferences.homeAirport}
                            onChange={e =>
                              updatePreferences({ homeAirport: e.target.value })
                            }
                            placeholder="LOS"
                            className="h-12 border-2"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="font-semibold">Traveler Type</Label>
                          <Select>
                            <SelectTrigger className="h-12 border-2">
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

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="font-semibold">
                            Seat Preference
                          </Label>
                          <Select
                            value={preferences.seatPreference}
                            onValueChange={val =>
                              updatePreferences({ seatPreference: val })
                            }
                          >
                            <SelectTrigger className="h-12 border-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Aisle">Aisle</SelectItem>
                              <SelectItem value="Window">Window</SelectItem>
                              <SelectItem value="Any">Any</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="font-semibold flex items-center gap-2">
                            <Utensils className="w-4 h-4" />
                            Meal Preference
                          </Label>
                          <Select
                            value={preferences.mealPreference}
                            onValueChange={val =>
                              updatePreferences({ mealPreference: val })
                            }
                          >
                            <SelectTrigger className="h-12 border-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Any">Any</SelectItem>
                              <SelectItem value="Vegetarian">
                                Vegetarian
                              </SelectItem>
                              <SelectItem value="Vegan">Vegan</SelectItem>
                              <SelectItem value="Halal">Halal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Card className="bg-gradient-to-br text-foreground from-secondary to-accent/20 border-2">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <CalendarCheck className="w-6 h-6 text-primary" />
                                <div>
                                  <Label className="font-semibold text-base text-foreground">
                                    Sync Itineraries
                                  </Label>
                                  <div className="text-sm text-muted-foreground">
                                    Auto-sync bookings to calendar
                                  </div>
                                </div>
                              </div>
                              <Switch
                                checked={preferences.syncItineraries}
                                onCheckedChange={val =>
                                  updatePreferences({ syncItineraries: val })
                                }
                              />
                            </div>
                          </CardContent>
                        </Card>

                        <div className="flex gap-3 pt-4">
                          <Button
                            variant="outline"
                            size="lg"
                            className="flex-1 border-2"
                            onClick={resetPreferences}
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Reset</span>
                          </Button>
                          <Button
                            size="lg"
                            className="flex-1 bg-gradient-to-r from-primary to-accent"
                            onClick={savePreferences}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Save</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Integrations Tab */}
            {activeTab === 'integrations' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="shadow-xl border text-foreground">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-2xl">Integrations</CardTitle>
                    <CardDescription className="text-base">
                      Connect external services and APIs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Card className="border-2 hover:border-primary transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                              <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">Amadeus</h3>
                              <p className="text-sm text-muted-foreground">
                                Flights & Hotels API
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                amadeusConnected ? 'default' : 'secondary'
                              }
                              className="px-4 py-2"
                            >
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
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-primary transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-accent to-destructive rounded-xl flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">Geoapify</h3>
                              <p className="text-sm text-muted-foreground">
                                Geocoding & Maps
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                geoapifyConnected ? 'default' : 'secondary'
                              }
                              className="px-4 py-2"
                            >
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
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover:border-primary transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-destructive to-accent rounded-xl flex items-center justify-center">
                              <Camera className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">Unsplash</h3>
                              <p className="text-sm text-muted-foreground">
                                Destination Images
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                unsplashConnected ? 'default' : 'secondary'
                              }
                              className="px-4 py-2"
                            >
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
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>

                <Card className="shadow-xl border border-border">
                  <CardHeader>
                    <CardTitle className="text-xl">API Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Card className="bg-gradient-to-r from-secondary to-accent/20 border-0">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <Label className="font-medium">
                              Amadeus calls:
                            </Label>
                            <span className="font-bold text-lg">12,430</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-r from-muted to-secondary border-0">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <Label className="font-medium">
                              Geoapify calls:
                            </Label>
                            <span className="font-bold text-lg">6,320</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 "
              >
                <Card className="shadow-xl border text-foreground">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-2xl">
                      Billing & Subscription
                    </CardTitle>
                    <CardDescription className="text-base">
                      Manage your plan and payment methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <Card className="bg-gradient-to-br from-secondary to-accent/20 border-2">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <Label className="text-sm text-muted-foreground">
                                  Current Plan
                                </Label>
                                <h3 className="text-3xl font-bold mt-1 text-foreground">
                                  {plan}
                                </h3>
                              </div>
                              <Badge className="px-4 py-2">Active</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Next billing:{' '}
                              <span className="font-semibold text-foreground">
                                {nextBillingDate}
                              </span>
                            </p>
                          </CardContent>
                        </Card>

                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <Label className="text-lg font-bold">
                              Payment Methods
                            </Label>
                            <Button
                              onClick={addPaymentMethod}
                              size="sm"
                              className="bg-gradient-to-r from-primary to-accent"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Card
                            </Button>
                          </div>
                          <div className=" space-y-3">
                            {paymentMethods.map(pm => (
                              <Card
                                key={pm.id}
                                className="border-2 text-foreground hover:border-primary transition-all"
                              >
                                <CardContent className="p-5">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 bg-gradient-to-br from-foreground/80 to-foreground rounded-xl flex items-center justify-center">
                                        <CreditCard className="w-6 h-6 text-background" />
                                      </div>
                                      <div>
                                        <p className="font-bold">
                                          {pm.brand} •••• {pm.last4}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          Expires {pm.exp}
                                        </p>
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
                                            addNotification(
                                              'set default mock',
                                              'info'
                                            );
                                          }}
                                        >
                                          Make default
                                        </Button>
                                      )}
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() =>
                                          removePaymentMethod(pm.id)
                                        }
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-lg font-bold mb-4 block">
                            Invoices
                          </Label>
                          <div className="space-y-3">
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
                              <Card
                                key={inv.id}
                                className="border-2 text-foreground hover:border-primary transition-all"
                              >
                                <CardContent className="p-5">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-bold">{inv.id}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {inv.date}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <span className="text-xl font-bold">
                                        {inv.amount}
                                      </span>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => downloadInvoice(inv.id)}
                                      >
                                        <Download className="w-5 h-5" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Link to="/pricing" className="flex-1">
                            <Button
                              variant="default"
                              size="lg"
                              className="w-full border-2"
                            >
                              Change Plan
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="lg"
                            className="flex-1"
                            onClick={cancelSubscription}
                          >
                            Cancel subscription
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <Card className="border-2 text-foreground hover:border-primary transition-all">
                          <CardHeader>
                            <CardTitle className="text-xl">
                              Billing Summary
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between py-3 border-b">
                                <Label className="text-sm text-muted-foreground">
                                  Plan
                                </Label>
                                <span className="font-bold">{plan}</span>
                              </div>
                              <div className="flex items-center justify-between py-3 border-b">
                                <Label className="text-sm text-muted-foreground">
                                  Next payment
                                </Label>
                                <span className="font-bold">
                                  {nextBillingDate}
                                </span>
                              </div>
                              <div className="flex items-center justify-between py-3">
                                <Label className="text-sm text-muted-foreground">
                                  Annual cost
                                </Label>
                                <span className="font-bold text-xl">
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

                        <Card className="bg-gradient-to-br text-foreground from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-500/30">
                          <CardHeader>
                            <CardTitle className="text-xl">
                              Travel Credits
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-sm text-muted-foreground mb-4">
                              You have{' '}
                              <strong className="text-foreground text-2xl">
                                $120
                              </strong>{' '}
                              in travel credits.
                            </div>
                            <Button className="w-full bg-green-600 hover:bg-green-700">
                              Apply credits
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Travel Docs Tab */}
            {activeTab === 'docs' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="shadow-xl border text-foreground">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-2xl">Travel Documents</CardTitle>
                    <CardDescription className="text-base">
                      Upload passports, visas, insurance, and other documents
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label
                        htmlFor="doc-upload"
                        className="block w-full p-12 border-2 border-dashed border-border rounded-2xl hover:border-primary transition-all cursor-pointer bg-gradient-to-br from-secondary to-accent/20"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                            <FileText className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-lg">
                              Upload Document
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Passport, visa, insurance, or other travel
                              documents
                            </p>
                          </div>
                        </div>
                        <Input
                          id="doc-upload"
                          type="file"
                          onChange={handleUploadDoc}
                          className="hidden"
                        />
                      </Label>
                    </div>

                    <div>
                      <Label className="text-lg font-bold mb-4 block">
                        Uploaded documents
                      </Label>
                      {travelDocs.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No documents uploaded</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {travelDocs.map(d => (
                            <Card
                              key={d.id}
                              className="border-2 hover:border-primary transition-all"
                            >
                              <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                                      <FileText className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                      <span className="font-bold">
                                        {d.name}
                                      </span>
                                      <p className="text-sm text-muted-foreground">
                                        Uploaded recently
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        void toast.info(
                                          `Download ${d.name} (mock)`
                                        )
                                      }
                                    >
                                      <Download className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => {
                                        setTravelDocs(s =>
                                          s.filter(x => x.id !== d.id)
                                        );
                                        void toast.error('Document deleted');
                                      }}
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="shadow-xl border text-foreground">
                  <CardHeader className="pb-8">
                    <CardTitle className="text-2xl">
                      Security Settings
                    </CardTitle>
                    <CardDescription className="text-base">
                      Protect your account and data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Card className="border-2 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                              <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">
                                Two-Factor Authentication
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Add an extra layer of security
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={twoFactor}
                            onCheckedChange={setTwoFactor}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <div>
                      <Label className="text-lg font-bold mb-4 block">
                        Active sessions
                      </Label>
                      <div className="space-y-3">
                        {activeSessions.map((s, i) => (
                          <Card
                            key={i}
                            className="border-2 text-foreground hover:border-primary transition-all"
                          >
                            <CardContent className="p-5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
                                    <Globe className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <p className="font-bold">{s}</p>
                                    <p className="text-sm text-muted-foreground">
                                      Active now
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-2"
                                >
                                  Revoke
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 border-2"
                        onClick={() => {
                          void toast.info('Signed out everywhere (mock)');
                        }}
                      >
                        Sign out everywhere
                      </Button>
                      <Button
                        variant="destructive"
                        size="lg"
                        className="flex-1"
                        onClick={() => {
                           toast.error('Account deletion requested (mock)');
                        }}
                      >
                        Delete account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
