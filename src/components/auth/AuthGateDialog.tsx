import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface AuthGateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthGateDialog({ open, onOpenChange }: AuthGateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-primary" />
          <DialogTitle className="text-center">Sign in to save items</DialogTitle>
          <DialogDescription className="text-center">
            Create an account or sign in to add items to your cart and book your trip.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 mt-4">
          <Button asChild>
            <Link to="/sign-up">Create Account</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/log-in">Sign In</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}