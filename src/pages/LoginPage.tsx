'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/core/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const slides = [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000',
  ];

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || 'Login failed');
        return;
      }

      // 1. Save JWT token for backend
      localStorage.setItem('token', result.token);

      // 2. Sign in to Firebase using custom token
      await signInWithCustomToken(auth, result.token);

      alert('Login successful!');

      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred. Please try again.');
    }
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Animated Section */}
      <div className="relative hidden lg:block">
        {/* Crossfade images */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.5, scale: 1.05 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slides[currentImage]})`,
              }}
            />
          </AnimatePresence>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Top text */}
        <div className="absolute top-1/4 left-10 text-white space-y-4 drop-shadow-lg">
          <h2 className="text-4xl font-bold tracking-tight">Welcome Back!</h2>
          <p className="text-lg opacity-90">Continue your journey with us.</p>
        </div>

        {/* Bottom text box */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md 
          rounded-2xl border border-white/20 p-6 text-white shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-1">Your Adventure Awaits</h3>
          <p className="text-sm text-white/90">
            Log in to access your bookings, explore new destinations, and create
            unforgettable memories.
          </p>
        </motion.div>
      </div>

      {/* Right side form */}
      <div className="relative flex flex-col justify-center bg-background">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center px-6 py-12"
        >
          <Card className="w-full max-w-md bg-transparent shadow-none border-none text-foreground">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold tracking-tight">
                Welcome Back
              </CardTitle>
              <CardDescription>
                Log in to your <span className="font-semibold">TravelMate</span>{' '}
                account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
                  <Mail className="absolute left-3 top-3 h-5  w-5 text-muted-foreground" />
                  <Input
                    {...register('email')}
                    placeholder="you@example.com"
                    id="email"
                    type="email"
                    className="pl-10 border-0 outline-none flex-1 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...register('password')}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10 border-0 outline-none flex-1 text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 focus-ring-4 hover:shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging
                    in...
                  </>
                ) : (
                  <>Log In</>
                )}
              </Button>

              <div className="my-6 flex items-center">
                <Separator className="flex-1" />
                <span className="px-2 text-sm text-muted-foreground">
                  or continue with
                </span>
                <Separator className="flex-1" />
              </div>

              {/* Social Logins */}
              <div className="flex flex-col space-y-3">
                {/* Google */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                {/* Apple */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.67 16.27c-.35.82-.52 1.19-.98 1.91-.64 1.01-1.54 2.27-2.65 2.29-1 .02-1.25-.67-2.59-.67s-1.62.65-2.64.69c-1.08.04-1.9-1.09-2.55-2.1-1.39-2.11-2.45-5.97-1.02-8.59.71-1.27 1.99-2.07 3.38-2.09 1.05-.02 2.04.71 2.59.71.55 0 1.82-.87 3.07-.74.52.02 1.98.21 2.92 1.58-2.52 1.39-2.11 5.02.47 6.01zM15.71 4.4c.53-.64.93-1.54.83-2.43-.8.03-1.76.53-2.33 1.17-.51.58-.96 1.5-.84 2.37.88.07 1.78-.45 2.34-1.11z" />
                  </svg>
                  Continue with Apple
                </Button>
              </div>
            </CardContent>

            <CardFooter className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <a
                href="/signup"
                className="ml-1 font-medium text-primary hover:underline"
              >
                Sign up
              </a>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
