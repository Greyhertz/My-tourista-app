'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Loader2, Lock, Mail, Phone, User } from 'lucide-react';
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
import { signUpSchema, type SignUpFormData } from '@/utils/validateForm';
// import { validateForm, validateField } from '@/utils/validateForm';
import { AnimatePresence, motion } from 'framer-motion';

export default function SignUpPage()
{
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const slides = [
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000',
    'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=2000',
    'https://plus.unsplash.com/premium_photo-1694475344148-f878057b9913?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=766',
  ];

  const navigate = useNavigate();

  const handleData = () =>
  {
    navigate(`/review/${formData.name}`, {
      state: { ...formData },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) =>
  {
    // Simulate animation before routing
      setTimeout(() => {
        handleData();
      }, 1500);
      console.log('✅ Submitted data:', data);
  
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // const [errors, setErrors] = useState<Partial<typeof formData>>({});

  // const validationOptions = {
  //   required: [
  //     'name',
  //     'email',
  //     'phone',
  //     'password',
  //     'confirmPassword',
  //   ] as Array<'name' | 'email' | 'phone' | 'password' | 'confirmPassword'>,
  //   minLength: [{ field: 'name', length: 3 }],
  //   email: ['email'] as Array<'email'>,
  //   phone: ['phone'] as Array<'phone'>,
  //   password: [
  //     {
  //       field: 'password',
  //       minLength: 8,
  //       requireUppercase: true,
  //       requireNumber: true,
  //       requireSpecialChar: true,
  //     },
  //   ],
  //   match: [
  //     {
  //       field: 'confirmPassword',
  //       matchWith: 'password',
  //       message: 'Passwords do not match',
  //     },
  //   ],
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // const error = validateField(
    //   name as keyof typeof formData,
    //   value,
    //   formData,
    //   validationOptions
    // );
    // setErrors(prev => ({ ...prev, [name]: error }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const newErrors = validateForm(formData, validationOptions);
  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length === 0) {
  //     setIsSubmitting(true);
  //     setTimeout(() => {
  //       handleData();
  //       setIsSubmitting(false);
  //     }, 1500);
  //   }
  // };

  function getPasswordStrength(password: string) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 1) return { label: 'Weak', color: 'text-red-500' };
    if (strength === 2) return { label: 'Medium', color: 'text-yellow-500' };
    return { label: 'Strong', color: 'text-green-500' };
  }

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Animated Section */}
      <div className="relative hidden lg:block">
        {/* Crossfade images using AnimatePresence + motion.div */}
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
          <h2 className="text-4xl font-bold tracking-tight">
            Welcome Adventurer!
          </h2>
          <p className="text-lg opacity-90">
            The world awaits. Embark on your next journey.
          </p>
        </div>

        {/* Bottom text box */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md 
          rounded-2xl border border-white/20 p-6 text-white shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-1">
            Wander, Explore, Experience
          </h3>
          <p className="text-sm text-white/90">
            Discover breathtaking destinations, vibrant cultures, and
            unforgettable adventures across the globe.
          </p>
        </motion.div>
      </div>

      {/* Right side form */}
      <div className="relative flex flex-col justify-center bg-background">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        {/* <div>
          <label>Email</label>
          <input {...register('email')} placeholder="Email Address" />
          {errors.email && <p>{errors.email.message}</p>}
        </div> */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center px-6 py-12"
        >
          <Card className="w-full max-w-md bg-transparent shadow-none border-none text-foreground">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold tracking-tight">
                Create an Account
              </CardTitle>
              <CardDescription>
                Sign up to <span className="font-semibold">TravelMate</span> and
                start your journey
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...register('name')}
                    placeholder="John Doe"
                    id="name"
                    name="name"
                    // value={formData.name}
                    onChange={handleChange}
                    className="pl-10 border-0 outline-none flex-1 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...register('email')}
                    placeholder="you@example.com"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 border-0 outline-none flex-1 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...register('phone')}
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 801 234 5678"
                    className="pl-10 border-0 outline-none flex-1 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...register('password')}
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
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
                {formData.password && (
                  <p
                    className={`text-sm font-semibold ${passwordStrength.color}`}
                  >
                    Strength: {passwordStrength.label}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...register('confirmPassword')}
                    
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10 pr-10 border-0 outline-none flex-1 text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive/80">
                    {errors.confirmPassword.message}
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
                
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing
                    up...
                  </>
                ) : (
                  <>Sign Up</>
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
              Already have an account?{' '}
              <a
                href="/login"
                className="ml-1 font-medium text-primary hover:underline"
              >
                Log in
              </a>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// // import { signUpSchema, SignUpFormData } from '@/schemas/signUpSchema';
// import { signUpSchema, type SignUpFormData } from '@/utils/validateForm';

// export default function SignUpForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     watch,
//   } = useForm<SignUpFormData>({
//     resolver: zodResolver(signUpSchema),
//   });

//   const onSubmit = (data: SignUpFormData) => {
//     console.log('✅ Submitted data:', data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label>Name</label>
//         <input {...register('name')} placeholder="Full Name" />
//         {errors.name && <p>{errors.name.message}</p>}
//       </div>

//       <div>
//         <label>Email</label>
//         <input {...register('email')} placeholder="Email Address" />
//         {errors.email && <p>{errors.email.message}</p>}
//       </div>

//       <div>
//         <label>Phone</label>
//         <input {...register('phone')} placeholder="+234..." />
//         {errors.phone && <p>{errors.phone.message}</p>}
//       </div>

//       <div>
//         <label>Password</label>
//         <input type="password" {...register('password')} />
//         {errors.password && <p>{errors.password.message}</p>}
//       </div>

//       <div>
//         <label>Confirm Password</label>
//         <input type="password" {...register('confirmPassword')} />
//         {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
//       </div>

//       <button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? 'Submitting...' : 'Sign Up'}
//       </button>
//     </form>
//   );
// }
