// // SignUpPage.tsx
// console.log("🔥 SIGNUP PAGE FILE LOADED");

// 'use client';
// import { useState, useEffect } from 'react';
// import { Eye, EyeOff, Loader2, Lock, Mail, Phone, User } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Separator } from '@/components/ui/separator';
// import { ThemeToggle } from '@/components/core/ThemeToggle';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { signUpSchema, type SignUpFormData } from '@/utils/validateForm';
// import { AnimatePresence, motion } from 'framer-motion';
// import { toast, Toaster } from 'sonner';
// import { auth } from '@/firebaseConfig';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// export default function SignUpPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [currentImage, setCurrentImage] = useState(0);
//   const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
//   const slides = [
//     'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000',
//     'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=2000',
//     'https://plus.unsplash.com/premium_photo-1694475344148-f878057b9913?q=80&w=2000',
//   ];

//   const navigate = useNavigate();
//   const googleProvider = new GoogleAuthProvider();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });

//   // FIXED: Streamlined Google Sign-Up with proper error handling
//   const signUpWithGoogle = async () => {
//     if (isGoogleLoading) return; // Prevent multiple clicks
    
//     setIsGoogleLoading(true);
    
//     try {
//       console.log('🔵 Step 1: Opening Google popup...');

//       // Step 1: Authenticate with Google
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       console.log('✅ Step 2: Google authentication successful');
//       console.log('   User:', user.email, 'UID:', user.uid);

//       // Step 2: Get Firebase ID token
//       const idToken = await user.getIdToken();
//       console.log('✅ Step 3: Got Firebase ID token');

//       // Step 3: Try to create account on backend
//       console.log('🔍 Step 4: Attempting to create account...');
      
//       const createRes = await fetch('http://localhost:3000/auth/google-signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${idToken}`,
//         },
//         body: JSON.stringify({
//           uid: user.uid,
//           email: user.email,
//           name: user.displayName || user.email?.split('@')[0],
//           avatar: user.photoURL || '',
//         }),
//       });

//       const responseData = await createRes.json();
//       console.log('📦 Backend response:', createRes.status, responseData);

//       // Handle response based on status code
//       if (createRes.status === 409) {
//         // User already exists - this is for SIGNUP page
//         console.log('⚠️ User already exists - redirecting to login');
        
//         // Sign out from Firebase
//         await auth.signOut();
        
//         // Show error toast
//         toast.error('Account already exists! Please log in instead.', {
//           duration: 4000,
//           description: 'You will be redirected to the login page...'
//         });

//         // Redirect to login after delay
//         setTimeout(() => {
//           navigate('/log-in');
//         }, 2000);
        
//       } else if (createRes.ok && createRes.status === 201) {
//         // Successfully created new account
//         console.log('✅ Account created successfully');

//         // Store user data in localStorage
//         localStorage.setItem('userId', user.uid);
//         localStorage.setItem('authToken', idToken);
//         localStorage.setItem('userEmail', responseData.user.email);
//         localStorage.setItem('userRole', responseData.user.role);
//         localStorage.setItem('userName', responseData.user.name);
//         localStorage.setItem('userAvatar', responseData.user.avatar || '');

//         // Show success toast
//         toast.success('Welcome to TravelMate! 🎉', {
//           duration: 3000,
//           description: 'Your account has been created successfully'
//         });

//         // Navigate to dashboard
//         setTimeout(() => {
//           navigate('/dashboard');
//         }, 1500);
        
//       } else {
//         // Other errors
//         throw new Error(responseData.error || 'Failed to create account');
//       }

//     } catch (error: any) {
//       console.error('❌ Google sign-up error:', error);

//       // Handle specific Firebase Auth errors
//       if (error.code === 'auth/popup-closed-by-user') {
//         toast.info('Sign-up cancelled', {
//           description: 'You closed the popup window'
//         });
//       } else if (error.code === 'auth/popup-blocked') {
//         toast.error('Popup blocked', {
//           description: 'Please allow popups for this site in your browser settings'
//         });
//       } else if (error.code === 'auth/cancelled-popup-request') {
//         // Silent - user opened popup multiple times
//         console.log('Popup request cancelled (multiple popups)');
//       } else {
//         // Generic error
//         toast.error('Sign-up failed', {
//           description: error.message || 'An unexpected error occurred'
//         });
//       }
      
//       // Clean up: sign out if partially authenticated
//       try {
//         await auth.signOut();
//       } catch (signOutError) {
//         console.error('Error signing out:', signOutError);
//       }
      
//     } finally {
//       setIsGoogleLoading(false);
//     }
//   };

//   // Regular email/password signup
//   async function handleSignup() {
//     try {
//       const res = await fetch('http://localhost:3000/auth/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password,
//           confirmPassword: formData.confirmPassword,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.error || 'Signup failed', {
//           description: 'Please check your information and try again'
//         });
//         return;
//       }

//       toast.success('Account created successfully!', {
//         description: 'Redirecting to login page...'
//       });
      
//       setTimeout(() => {
//         navigate('/log-in');
//       }, 1500);
//     } catch (err) {
//       console.error('Signup error:', err);
//       toast.error('An error occurred!', {
//         description: 'Please try again later'
//       });
//     }
//   }

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<SignUpFormData>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       phone: '',
//     },
//     mode: 'onBlur',
//   });

//   const onSubmit = (data: SignUpFormData) => {
//     console.log('✅ Form submitted:', data);
//     setTimeout(() => {
//       handleSignup();
//     }, 300);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage(prev => (prev + 1) % slides.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   function getPasswordStrength(password: string) {
//     let strength = 0;
//     if (password.length >= 8) strength++;
//     if (/[A-Z]/.test(password)) strength++;
//     if (/[0-9]/.test(password)) strength++;
//     if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

//     if (strength <= 1) return { label: 'Weak', color: 'text-red-500' };
//     if (strength === 2) return { label: 'Medium', color: 'text-yellow-500' };
//     return { label: 'Strong', color: 'text-green-500' };
//   }

//   const passwordStrength = getPasswordStrength(formData.password);

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
//       {/* Toaster component - place at top level */}
//       <Toaster richColors position="top-right" />
      
//       {/* Left Animated Section */}
//       <div className="relative hidden lg:block">
//         <div className="absolute inset-0">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentImage}
//               initial={{ opacity: 0, scale: 1.05 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0.5, scale: 1.05 }}
//               transition={{ duration: 1.6, ease: 'easeInOut' }}
//               className="absolute inset-0 bg-cover bg-center"
//               style={{
//                 backgroundImage: `url(${slides[currentImage]})`,
//               }}
//             />
//           </AnimatePresence>
//         </div>

//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

//         <div className="absolute top-1/4 left-10 text-white space-y-4 drop-shadow-lg">
//           <h2 className="text-4xl font-bold tracking-tight">Welcome Adventurer!</h2>
//           <p className="text-lg opacity-90">The world awaits. Embark on your next journey.</p>
//         </div>

//         <motion.div
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1.2, ease: 'easeOut' }}
//           className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-white shadow-lg"
//         >
//           <h3 className="text-xl font-semibold mb-1">Wander, Explore, Experience</h3>
//           <p className="text-sm text-white/90">
//             Discover breathtaking destinations, vibrant cultures, and unforgettable adventures across the globe.
//           </p>
//         </motion.div>
//       </div>

//       {/* Right side form */}
//       <div className="relative flex flex-col justify-center bg-background">
//         <div className="absolute top-4 right-4">
//           <ThemeToggle />
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center px-6 py-12">
//           <Card className="w-full max-w-md bg-transparent shadow-none border-none text-foreground">
//             <CardHeader className="space-y-2 text-center">
//               <CardTitle className="text-3xl font-bold tracking-tight">Create an Account</CardTitle>
//               <CardDescription>
//                 Sign up to <span className="font-semibold">TravelMate</span> and start your journey
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-4">
//               {/* Name */}
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
//                   <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
//                   <Input
//                     {...register('name')}
//                     placeholder="John Doe"
//                     id="name"
//                     name="name"
//                     onChange={handleChange}
//                     className="pl-10 border-0 outline-none flex-1 text-foreground placeholder:text-muted-foreground"
//                   />
//                 </div>
//                 {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
//               </div>

//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
//                   <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
//                   <Input
//                     {...register('email')}
//                     placeholder="you@example.com"
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="pl-10 border-0 outline-none flex-1 text-foreground placeholder:text-muted-foreground"
//                   />
//                 </div>
//                 {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
//               </div>

//               {/* Phone */}
//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone</Label>
//                 <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
//                   <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
//                   <Input
//                     {...register('phone')}
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="+234 801 234 5678"
//                     className="pl-10 border-0 outline-none flex-1 text-foreground placeholder:text-muted-foreground"
//                   />
//                 </div>
//                 {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
//                   <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
//                   <Input
//                     {...register('password')}
//                     id="password"
//                     name="password"
//                     type={showPassword ? 'text' : 'password'}
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="••••••••"
//                     className="pl-10 pr-10 border-0 outline-none flex-1 text-foreground placeholder:text-muted-foreground"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
//                   >
//                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
//                 {formData.password && (
//                   <p className={`text-sm font-semibold ${passwordStrength.color}`}>
//                     Strength: {passwordStrength.label}
//                   </p>
//                 )}
//               </div>

//               {/* Confirm Password */}
//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
//                   <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
//                   <Input
//                     {...register('confirmPassword')}
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="••••••••"
//                     className="pl-10 pr-10 border-0 outline-none flex-1 text-foreground placeholder:text-muted-foreground"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
//                   >
//                     {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="text-sm text-destructive/80">{errors.confirmPassword.message}</p>
//                 )}
//               </div>

//               {/* Submit */}
//               <Button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 focus-ring-4 hover:shadow-lg"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing up...
//                   </>
//                 ) : (
//                   <>Sign Up</>
//                 )}
//               </Button>

//               <div className="my-6 flex items-center">
//                 <Separator className="flex-1" />
//                 <span className="px-2 text-sm text-muted-foreground">or continue with</span>
//                 <Separator className="flex-1" />
//               </div>

//               {/* Social Logins */}
//               <div className="flex flex-col space-y-3">
//                 {/* Google */}
//                 <Button
//                   type="button"
//                   onClick={signUpWithGoogle}
//                   disabled={isGoogleLoading}
//                   variant="outline"
//                   className="w-full flex items-center justify-center gap-2"
//                 >
//                   {isGoogleLoading ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       Signing up...
//                     </>
//                   ) : (
//                     <>
//                       <svg className="w-5 h-5" viewBox="0 0 24 24">
//                         <path
//                           fill="#4285F4"
//                           d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                         />
//                         <path
//                           fill="#34A853"
//                           d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                         />
//                         <path
//                           fill="#FBBC05"
//                           d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                         />
//                         <path
//                           fill="#EA4335"
//                           d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                         />
//                       </svg>
//                       Sign up with Google
//                     </>
//                   )}
//                 </Button>

//                 {/* Apple */}
//                 <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2">
//                   <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
//                     <path d="M19.67 16.27c-.35.82-.52 1.19-.98 1.91-.64 1.01-1.54 2.27-2.65 2.29-1 .02-1.25-.67-2.59-.67s-1.62.65-2.64.69c-1.08.04-1.9-1.09-2.55-2.10-1.39-2.11-2.45-5.97-1.02-8.59.71-1.27 1.99-2.07 3.38-2.09 1.05-.02 2.04.71 2.59.71.55 0 1.82-.87 3.07-.74.52.02 1.98.21 2.92 1.58-2.52 1.39-2.11 5.02.47 6.01zM15.71 4.4c.53-.64.93-1.54.83-2.43-.8.03-1.76.53-2.33 1.17-.51.58-.96 1.5-.84 2.37.88.07 1.78-.45 2.34-1.11z" />
//                   </svg>
//                   Sign up with Apple
//                 </Button>
//               </div>
//             </CardContent>

//             <CardFooter className="text-center text-sm text-muted-foreground">
//               Already have an account?{' '}
//               <a href="/log-in" className="ml-1 font-medium text-primary hover:underline">
//                 Log in
//               </a>
//             </CardFooter>
//           </Card>
//         </form>
//       </div>
//     </div>
//   );
// }

console.log("🔥 SIGNUP PAGE FILE LOADED");

'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Loader2, Lock, Mail, Phone, User, AlertCircle, X } from 'lucide-react';
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
import { toast, Toaster } from 'sonner';
import { auth } from '@/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Validation Schema
const signUpSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\+?[0-9]{7,15}$/, 'Invalid phone number'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must include an uppercase letter')
      .regex(/[0-9]/, 'Password must include a number')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must include a special character'
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  
  const slides = [
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000',
    'https://images.unsplash.com/photo-1493558103817-58b2924bce98?q=80&w=2000',
    'https://plus.unsplash.com/premium_photo-1694475344148-f878057b9913?q=80&w=2000',
  ];

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const passwordValue = watch('password', '');

  // Google Sign-Up
  const signUpWithGoogle = async () => {
    if (isGoogleLoading) return;
    
    setIsGoogleLoading(true);
    
    try {
      console.log('🔵 Starting Google sign-up...');

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log('✅ Google authentication successful');
      const idToken = await user.getIdToken();

      console.log('📝 Creating new account...');

      const createRes = await fetch('http://localhost:3000/auth/google-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName || user.email?.split('@')[0],
          avatar: user.photoURL || '',
        }),
      });

      const responseData = await createRes.json();

      if (createRes.status === 409) {
        console.log('⚠️ Account already exists');
        await auth.signOut();
        
        setErrorEmail(user.email || '');
        setShowErrorModal(true);
        return;
      }

      if (createRes.ok && createRes.status === 201) {
        console.log('✅ Account created successfully');

        localStorage.setItem('userId', user.uid);
        localStorage.setItem('authToken', idToken);
        localStorage.setItem('userEmail', responseData.user.email);
        localStorage.setItem('userRole', responseData.user.role);
        localStorage.setItem('userName', responseData.user.name);
        localStorage.setItem('userAvatar', responseData.user.avatar || '');

        toast.success('Welcome to TravelMate! 🎉', {
          duration: 3000,
          description: 'Your account has been created successfully'
        });

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
        
      } else {
        throw new Error(responseData.error || 'Failed to create account');
      }

    } catch (error: any) {
      console.error('❌ Google sign-up error:', error);

      if (error.code === 'auth/popup-closed-by-user') {
        toast.info('Sign-up cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        toast.error('Popup blocked. Please allow popups for this site.');
      } else if (error.code !== 'auth/cancelled-popup-request') {
        toast.error(error.message || 'Google sign-up failed');
      }
      
      try {
        await auth.signOut();
      } catch (e) {
        console.error('Signout error:', e);
      }
      
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Regular Email Sign-Up
  const onSubmit = async (data: SignUpFormData) => {
    try {
      const res = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (res.status === 409) {
        toast.error('Email already registered', {
          description: 'Please use a different email or log in.'
        });
        return;
      }

      if (!res.ok) {
        toast.error(responseData.error || 'Signup failed');
        return;
      }

      toast.success('Account created successfully! 🎉', {
        description: 'Redirecting to login page...'
      });
      
      setTimeout(() => {
        navigate('/log-in');
      }, 1500);
    } catch (err) {
      console.error('Signup error:', err);
      toast.error('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  function getPasswordStrength(password: string) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 1) return { label: 'Weak', color: 'bg-red-500', width: '25%' };
    if (strength === 2) return { label: 'Fair', color: 'bg-yellow-500', width: '50%' };
    if (strength === 3) return { label: 'Good', color: 'bg-blue-500', width: '75%' };
    return { label: 'Strong', color: 'bg-green-500', width: '100%' };
  }

  const passwordStrength = getPasswordStrength(passwordValue);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className='fixed top-4 right-4 z-[9999]'>
         <Toaster richColors position="top-right" />
      </div>
     
      {/* Error Modal */}
      <AnimatePresence>
        {showErrorModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowErrorModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4"
            >
              <Card className="bg-card border-2 border-destructive/20 shadow-2xl">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>

                <CardHeader className="text-center pb-3">
                  <div className="mx-auto w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mb-3">
                    <AlertCircle className="h-7 w-7 text-destructive" />
                  </div>
                  <CardTitle className="text-xl">Account Already Exists</CardTitle>
                  <CardDescription className="text-sm mt-2">
                    The account <strong className="text-foreground">{errorEmail}</strong> is already registered.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <Button
                    onClick={() => {
                      setShowErrorModal(false);
                      navigate('/log-in');
                    }}
                    className="w-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 text-white"
                  >
                    Go to Login
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setShowErrorModal(false)}
                    className="w-full"
                  >
                    Try Another Account
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Left Animated Section */}
      <div className="relative hidden lg:block">
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute top-1/4 left-10 text-white space-y-4 drop-shadow-lg">
          <h2 className="text-4xl font-bold tracking-tight">Join TravelMate</h2>
          <p className="text-lg opacity-90">Start your adventure today.</p>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md 
          rounded-2xl border border-white/20 p-6 text-white shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-1">Begin Your Journey</h3>
          <p className="text-sm text-white/90">
            Create an account to unlock exclusive travel deals, personalized recommendations, 
            and seamless booking experiences.
          </p>
        </motion.div>
      </div>

      {/* Right Form Section */}
      <div className="relative flex flex-col justify-center bg-background">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-center px-6 py-12"
        >
          <Card className="w-full max-w-md bg-transparent shadow-none border-none">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold tracking-tight">
                Create Account
              </CardTitle>
              <CardDescription>
                Join <span className="font-semibold">TravelMate</span> and start exploring
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...register('name')}
                    id="name"
                    placeholder="John Doe"
                    className="pl-10"
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...register('phone')}
                    id="phone"
                    placeholder="+234 801 234 5678"
                    className="pl-10"
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...register('password')}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {passwordValue && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Password strength:</span>
                      <span className={`font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: passwordStrength.width }}
                      />
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    {...register('confirmPassword')}
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 text-white font-semibold rounded-full hover:scale-105 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>

              <div className="my-6 flex items-center">
                <Separator className="flex-1" />
                <span className="px-2 text-sm text-muted-foreground">or continue with</span>
                <Separator className="flex-1" />
              </div>

              {/* Social Sign-Up */}
              <div className="flex flex-col space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={signUpWithGoogle}
                  disabled={isGoogleLoading}
                  className="w-full"
                >
                  {isGoogleLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing up...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Continue with Google
                    </>
                  )}
                </Button>

                <Button type="button" variant="outline" className="w-full">
                  <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24">
                    <path d="M19.67 16.27c-.35.82-.52 1.19-.98 1.91-.64 1.01-1.54 2.27-2.65 2.29-1 .02-1.25-.67-2.59-.67s-1.62.65-2.64.69c-1.08.04-1.9-1.09-2.55-2.10-1.39-2.11-2.45-5.97-1.02-8.59.71-1.27 1.99-2.07 3.38-2.09 1.05-.02 2.04.71 2.59.71.55 0 1.82-.87 3.07-.74.52.02 1.98.21 2.92 1.58-2.52 1.39-2.11 5.02.47 6.01zM15.71 4.4c.53-.64.93-1.54.83-2.43-.8.03-1.76.53-2.33 1.17-.51.58-.96 1.5-.84 2.37.88.07 1.78-.45 2.34-1.11z" />
                  </svg>
                  Continue with Apple
                </Button>
              </div>
            </CardContent>

            <CardFooter className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <a href="/log-in" className="ml-1 font-medium text-primary hover:underline">
                Log in
              </a>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}