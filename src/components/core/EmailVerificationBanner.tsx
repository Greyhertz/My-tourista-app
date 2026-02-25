import { useAuth } from '@/context/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function EmailVerificationBanner() {
  const { user, sendVerificationEmail } = useAuth();
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  // Don't show if user is anonymous or email is verified
  if (!user || user.isAnonymous || user.emailVerified) {
    return null;
  }

  const handleResend = async () => {
    setSending(true);
    try {
      await sendVerificationEmail();
      toast({
        title: 'Verification email sent',
        description: 'Please check your inbox',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to send email',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Alert className="border-yellow-500 bg-yellow-50">
      <Mail className="h-4 w-4" />
      <AlertTitle>Verify your email</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>
          Please verify your email to write reviews and unlock all features.
        </span>
        <Button
          size="sm"
          variant="outline"
          onClick={handleResend}
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Resend Email'}
        </Button>
      </AlertDescription>
    </Alert>
  );
}