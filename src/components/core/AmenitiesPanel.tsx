import { useState } from 'react';
import {
  Utensils, Coffee, Wine, Building2, Heart, Leaf, Landmark,
  Trophy, ShoppingBag, Film, Train, Wrench, Accessibility,
  Wifi, MapPin, Globe, Phone, Clock, Star, ChevronDown, ChevronUp,
  DollarSign,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// import type { AmenitiesResult, AmenityPlace } from '@/types/destinations';
import type { AmenitiesResult, AmenityPlace } from '@/types/destintion';
// ─── Category config ─────────────────────────────────────────────────────────

const TABS = [
  { key: 'food',           label: 'Food & Drink',   icon: Utensils,    color: '#f97316' },
  { key: 'accommodation',  label: 'Stay',            icon: Building2,   color: '#8b5cf6' },
  { key: 'tourism',        label: 'Attractions',     icon: Landmark,    color: '#0ea5e9' },
  { key: 'nature',         label: 'Nature',          icon: Leaf,        color: '#22c55e' },
  { key: 'healthcare',     label: 'Healthcare',      icon: Heart,       color: '#ef4444' },
  { key: 'sports',         label: 'Sports',          icon: Trophy,      color: '#eab308' },
  { key: 'shopping',       label: 'Shopping',        icon: ShoppingBag, color: '#ec4899' },
  { key: 'entertainment',  label: 'Entertainment',   icon: Film,        color: '#a855f7' },
  { key: 'transport',      label: 'Transport',        icon: Train,       color: '#64748b' },
  { key: 'services',       label: 'Services',        icon: Wrench,      color: '#6b7280' },
  { key: 'wheelchair',     label: 'Accessible',      icon: Accessibility, color: '#06b6d4' },
  { key: 'wifi',           label: 'WiFi',            icon: Wifi,        color: '#3b82f6' },
] as const;

type TabKey = typeof TABS[number]['key'];

// ─── PlaceCard ────────────────────────────────────────────────────────────────

function PlaceCard({ place }: { place: AmenityPlace }) {
  const [expanded, setExpanded] = useState(false);

  const distText = place.distance
    ? place.distance < 1000
      ? `${Math.round(place.distance)}m away`
      : `${(place.distance / 1000).toFixed(1)}km away`
    : null;

  return (
    <div className="bg-card border rounded-xl p-4 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
            {place.name}
          </p>
          {place.address && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              <MapPin className="inline h-2.5 w-2.5 mr-0.5" />
              {place.address}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          {distText && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">{distText}</span>
          )}
          {place.fee && (
            <Badge variant="secondary" className="text-[10px] h-4">
              <DollarSign className="h-2.5 w-2.5 mr-0.5" /> Paid
            </Badge>
          )}
        </div>
      </div>

      {/* Quick icons row */}
      <div className="flex items-center gap-2 mt-2">
        {place.wheelchair && (
          <Accessibility className="h-3.5 w-3.5 text-cyan-500" title="Wheelchair accessible" />
        )}
        {place.internetAccess && (
          <Wifi className="h-3.5 w-3.5 text-blue-500" title="WiFi available" />
        )}
        {place.openNow === true && (
          <span className="text-[10px] font-medium text-emerald-500">Open now</span>
        )}
        {place.openNow === false && (
          <span className="text-[10px] font-medium text-red-500">Closed</span>
        )}
      </div>

      {/* Expandable details */}
      {(place.website || place.phone || place.openingHours) && (
        <>
          <button
            onClick={() => setExpanded(e => !e)}
            className="mt-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {expanded ? 'Less' : 'Details'}
          </button>

          {expanded && (
            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              {place.phone && (
                <a href={`tel:${place.phone}`} className="flex items-center gap-1 hover:text-foreground">
                  <Phone className="h-3 w-3" /> {place.phone}
                </a>
              )}
              {place.openingHours && (
                <p className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {place.openingHours}
                </p>
              )}
              {place.website && (
                <a
                  href={place.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-foreground truncate"
                >
                  <Globe className="h-3 w-3 shrink-0" />
                  <span className="truncate">{place.website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Section helper ───────────────────────────────────────────────────────────

function PlaceSection({ title, places, limit = 6 }: { title: string; places: AmenityPlace[]; limit?: number }) {
  const [showAll, setShowAll] = useState(false);
  if (places.length === 0) return null;

  const displayed = showAll ? places : places.slice(0, limit);

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        {title} <span className="text-foreground">({places.length})</span>
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displayed.map((p, i) => <PlaceCard key={i} place={p} />)}
      </div>
      {places.length > limit && (
        <button
          onClick={() => setShowAll(s => !s)}
          className="mt-3 text-xs text-primary hover:underline"
        >
          {showAll ? 'Show less' : `Show all ${places.length}`}
        </button>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface AmenitiesPanelProps {
  amenities: AmenitiesResult;
}

export function AmenitiesPanel({ amenities }: AmenitiesPanelProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('food');

  const getTabContent = () => {
    switch (activeTab) {
      case 'food':
        return (
          <div className="space-y-6">
            <PlaceSection title="Restaurants" places={amenities.food.restaurants} />
            <PlaceSection title="Cafés" places={amenities.food.cafes} />
            <PlaceSection title="Bars & Nightlife" places={amenities.food.bars} />
          </div>
        );
      case 'accommodation':
        return <PlaceSection title="Hotels & Stays" places={amenities.accommodation} />;
      case 'tourism':
        return (
          <div className="space-y-6">
            <PlaceSection title="Top Attractions" places={amenities.tourism.attractions} />
            <PlaceSection title="Museums & Galleries" places={amenities.tourism.museums} />
            <PlaceSection title="Viewpoints" places={amenities.tourism.viewpoints} />
          </div>
        );
      case 'nature':
        return <PlaceSection title="Parks, Beaches & Nature" places={amenities.nature} />;
      case 'healthcare':
        return <PlaceSection title="Healthcare" places={amenities.healthcare} />;
      case 'sports':
        return <PlaceSection title="Sports & Recreation" places={amenities.sports} />;
      case 'shopping':
        return <PlaceSection title="Shopping" places={amenities.shopping} />;
      case 'entertainment':
        return <PlaceSection title="Entertainment" places={amenities.entertainment} />;
      case 'transport':
        return <PlaceSection title="Getting Around" places={amenities.transport} />;
      case 'services':
        return <PlaceSection title="Essential Services" places={amenities.services} />;
      case 'wheelchair':
        return <PlaceSection title="Wheelchair Accessible Places" places={amenities.wheelchairAccessible} />;
      case 'wifi':
        return <PlaceSection title="WiFi & Internet Access" places={amenities.wifiSpots} />;
    }
  };

  const getTabCount = (key: TabKey): number => {
    switch (key) {
      case 'food': return amenities.food.restaurants.length + amenities.food.cafes.length + amenities.food.bars.length;
      case 'accommodation': return amenities.accommodation.length;
      case 'tourism': return amenities.tourism.attractions.length + amenities.tourism.museums.length + amenities.tourism.viewpoints.length;
      case 'nature': return amenities.nature.length;
      case 'healthcare': return amenities.healthcare.length;
      case 'sports': return amenities.sports.length;
      case 'shopping': return amenities.shopping.length;
      case 'entertainment': return amenities.entertainment.length;
      case 'transport': return amenities.transport.length;
      case 'services': return amenities.services.length;
      case 'wheelchair': return amenities.wheelchairAccessible.length;
      case 'wifi': return amenities.wifiSpots.length;
    }
  };

  return (
    <div>
      {/* Tab strip — horizontally scrollable on mobile */}
      <div className="overflow-x-auto -mx-4 px-4 pb-1">
        <div className="flex gap-2 min-w-max">
          {TABS.map(({ key, label, icon: Icon, color }) => {
            const count = getTabCount(key);
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-foreground text-background border-foreground shadow-sm'
                    : 'bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: isActive ? 'inherit' : color }} />
                {label}
                {count > 0 && (
                  <span className={`text-[10px] rounded-full px-1.5 py-0.5 ${
                    isActive ? 'bg-background/20' : 'bg-muted'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">{getTabContent()}</div>
    </div>
  );
}