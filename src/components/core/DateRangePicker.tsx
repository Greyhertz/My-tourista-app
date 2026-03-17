import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateRangePickerProps {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  onCheckInChange: (date: Date | undefined) => void;
  onCheckOutChange: (date: Date | undefined) => void;
}

export function DateRangePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: DateRangePickerProps) {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of day

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Check-in */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Check-in</label>
        <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !checkIn && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkIn ? format(checkIn, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkIn}
              onSelect={(date) => {
                onCheckInChange(date);
                setCheckInOpen(false);
                // If checkout exists and is before/equal new checkin, clear it
                if (date && checkOut && checkOut <= date) {
                  onCheckOutChange(undefined);
                }
              }}
              disabled={(date) => {
                // Disable dates before today
                if (date < today) return true;
                
                // If checkout exists, checkin must be before it
                if (checkOut) {
                  return date >= checkOut;
                }
                
                return false;
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Check-out */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Check-out</label>
        <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !checkOut && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkOut ? format(checkOut, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkOut}
              onSelect={(date) => {
                onCheckOutChange(date);
                setCheckOutOpen(false);
              }}
              disabled={(date) => {
                // Disable dates before today
                if (date < today) return true;
                
                // Checkout must be after checkin
                if (checkIn) {
                  return date <= checkIn;
                }
                
                return false;
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}