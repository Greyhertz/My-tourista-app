// src/pages/BillingPage.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Download, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BillingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Billing & Subscription</h1>

      {/* Tabs for organization */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Charges</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Current Plan */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-semibold">Pro Plan</p>
                  <p className="text-sm text-gray-500">
                    Billed {isYearly ? 'Yearly' : 'Monthly'}
                  </p>
                </div>
                <Button>Upgrade / Downgrade</Button>
              </div>

              {/* Monthly/Yearly Toggle */}
              <div className="flex items-center gap-3">
                <Label htmlFor="billing-cycle">Yearly Billing</Label>
                <Switch
                  id="billing-cycle"
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                />
              </div>

              <Separator />

              <p className="text-gray-600">
                Renewal Date: <span className="font-medium">Sept 30, 2025</span>
              </p>
            </CardContent>
          </Card>
          <div className='flex text-center justify-center mt-6'>
            <Link to="/pricing">
              <Button variant="default">View Pricing Plans</Button>
            </Link>
          </div>
        </TabsContent>

        {/* Payment Methods */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <p>Visa ending in 4242</p>
                </div>
                <Button variant="outline">Remove</Button>
              </div>
              <Button>Add New Payment Method</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upcoming Charges */}
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Charges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Your next payment of{' '}
                <span className="font-semibold">$29.00</span> will be charged on{' '}
                <span className="font-semibold">Sept 30, 2025</span>.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Includes access to premium travel tools, hotel data, and API
                integrations.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing History */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: 'Aug 30, 2025', amount: '$29.00', status: 'Paid' },
                  { date: 'Jul 30, 2025', amount: '$29.00', status: 'Paid' },
                  { date: 'Jun 30, 2025', amount: '$29.00', status: 'Paid' },
                ].map((invoice, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{invoice.amount}</p>
                      <p className="text-sm text-gray-500">{invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-green-600">
                        {invoice.status}
                      </span>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" /> Invoice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="destructive">Cancel Subscription</Button>
              <div className="flex items-center text-yellow-600 gap-2">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">
                  Cancelling will revoke premium access at the end of your
                  billing cycle.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
