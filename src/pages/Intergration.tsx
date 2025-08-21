import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";

export function IntegrationsList({
  unsplashConnected,
  geoapifyConnected,
  amadeusConnected,
  onDisconnect,
  toastSuccess,
}: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations & API Keys</CardTitle>
        <CardDescription>
          Connect third-party services used by the app (images, maps, flights).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">Unsplash (Images)</p>
              <p className="text-sm text-muted-foreground">
                Use Unsplash to fetch location and hotel images.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">
                {unsplashConnected ? 'Connected' : 'Disconnected'}
              </p>
              <Button
                size="sm"
                onClick={() =>
                  unsplashConnected
                    ? onDisconnect('Unsplash')
                    : toastSuccess('Connect flow placeholder')
                }
              >
                {unsplashConnected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">Geoapify (Geocoding)</p>
              <p className="text-sm text-muted-foreground">
                Reverse geocoding, places and routing features.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">
                {geoapifyConnected ? 'Connected' : 'Disconnected'}
              </p>
              <Button
                size="sm"
                onClick={() =>
                  geoapifyConnected
                    ? onDisconnect('Geoapify')
                    : toastSuccess('Connect flow placeholder')
                }
              >
                {geoapifyConnected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">Amadeus (Flights & Hotels)</p>
              <p className="text-sm text-muted-foreground">
                Commercial flight and hotel search integration.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground">
                {amadeusConnected ? 'Connected' : 'Disconnected'}
              </p>
              <Button
                size="sm"
                onClick={() =>
                  amadeusConnected
                    ? onDisconnect('Amadeus')
                    : toastSuccess('Connect flow placeholder')
                }
              >
                {amadeusConnected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">
                API Keys are stored securely and are only visible to admins.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                Regenerate keys
              </Button>
              <Button size="sm" onClick={() => toastSuccess('Keys copied')}>
                Copy keys
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
