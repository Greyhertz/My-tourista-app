const signInWithGoogle = async () => {

  const navigate = useNavigate()
  
    try {
      console.log('🔵 Starting Google sign-in...');
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log('✅ Google authentication successful');

      const idToken = await user.getIdToken();
      localStorage.setItem('userId', user.uid); // Fixed typo: userid → userId
      localStorage.setItem('authToken', idToken); // Fixed typo: authTOken → authToken
      localStorage.setItem('userEmail', user.email || '');

      console.log('📝 Stored Google auth data');
      console.log('🔍 Checking if user exists in Firestore...');

      // Check if user exists in Firestore, if not create them
      const res = await fetch('http://localhost:3000/user/profile', { // Fixed: https → http
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (res.ok) {
        // User exists in Firestore
        const userData = await res.json();
        console.log('✅ User found in Firestore:', userData);

        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userAvatar', userData.avatar || user.photoURL || '');

        toast.success('Google sign-in successful!');

        if (userData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else if (res.status === 404) {
        // User doesn't exist in Firestore - create them
        console.log('⚠️ User not found in Firestore, creating...');
        
        const createRes = await fetch('http://localhost:3000/auth/google-signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            avatar: user.photoURL,
          }),
        });

        if (createRes.ok) {
          const newUserData = await createRes.json();
          console.log('✅ User created in Firestore:', newUserData);

          localStorage.setItem('userRole', newUserData.role || 'user');
          localStorage.setItem('userName', newUserData.name);
          localStorage.setItem('userAvatar', newUserData.avatar || '');

          toast.success('Welcome! Your account has been created.');
          navigate('/dashboard'); // New users go to user dashboard
        } else {
          throw new Error('Failed to create user in Firestore');
        }
      } else {
        throw new Error(`Profile fetch failed with status: ${res.status}`);
      }
    } catch (error: any) {
      console.error('❌ Google sign-in error:', error);
      
      // Better error messages
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in cancelled');
      } else if (error.code === 'auth/popup-blocked') {
        toast.error('Popup blocked. Please allow popups for this site.');
      } else if (error.message?.includes('Failed to fetch')) {
        toast.error('Cannot connect to server. Is the backend running?');
      } else {
        toast.error(error.message || 'Google sign-in failed');
      }
    }
  };'use client';

<<<<<<< Updated upstream
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
=======
<<<<<<< Updated upstream
// import { useState, useEffect } from 'react';
// import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
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
// import { useNavigate, useNavigation } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { AnimatePresence, motion } from 'framer-motion';
// import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '@/lib/firebase';
// import { toast, Toaster } from 'sonner';
=======
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
<<<<<<< Updated upstream
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/core/ThemeToggle';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { toast, Toaster } from 'sonner';
>>>>>>> Stashed changes

// // Initialize Google Provider
// const googleProvider = new GoogleAuthProvider();

// const loginSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   password: z.string().min(1, 'Password is required'),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [currentImage, setCurrentImage] = useState(0);

//   const slides = [
//     'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000',
//     'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000',
//     'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000',
//   ];

<<<<<<< Updated upstream
//   const navigate = useNavigate();
=======
=======
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { handleFirebaseError } from '@/lib/firebaseErrors';
export function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
>>>>>>> Stashed changes
  const navigate = useNavigate();
>>>>>>> Stashed changes

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });
  
//   const onSubmit = async (data: LoginFormData) => {
//     try {
//       console.log('🔐 Starting login process...');
      
//       // STEP 1: Authenticate with Firebase directly (this validates password!)
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password
//       );

//       console.log('✅ Firebase authentication successful');

//       // STEP 2: Get Firebase ID token (the real auth token)
//       const idToken = await userCredential.user.getIdToken();

//       // STEP 3: Store ID token for API requests
//       localStorage.setItem('authToken', idToken);
      
//       // Store user ID for current user identification
//       localStorage.setItem('userId', userCredential.user.uid);
//       localStorage.setItem('userEmail', userCredential.user.email || '');

//       console.log('📝 Stored auth data in localStorage');
//       console.log('🔍 Fetching user profile...');

//       // STEP 4: Fetch user profile to get role and other info
//       try {
//         const res = await fetch('http://localhost:3000/user/profile', {
//           headers: {
//             'Authorization': `Bearer ${idToken}`,
//           },
//         });

//         if (res.ok) {
//           const userData = await res.json();
          
//           // Store user data in localStorage
//           localStorage.setItem('userRole', userData.role);
//           localStorage.setItem('userName', userData.name);
//           localStorage.setItem('userAvatar', userData.avatar || '');

//           toast.success('Login successful!');
          
//           // CRITICAL: Route based on user role
//           if (userData.role === 'admin') {
//             navigate('/admin');
//           } else {
//             navigate('/dashboard'); // Regular user dashboard
//           }
//         } else {
//           // Profile fetch failed but login succeeded
//           toast.success('Login successful!');
//           navigate('/dashboard'); // Default to user dashboard
//         }
//       } catch (err) {
//         console.error('Failed to fetch user profile:', err);
//         toast.success('Login successful!');
//         navigate('/dashboard'); // Default to user dashboard on error
//       }
//     } catch (err: any) {
//       console.error('Login error:', err);
      
//       // Handle specific Firebase errors
//       if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
//         toast.error('Invalid email or password');
//       } else if (err.code === 'auth/too-many-requests') {
//         toast.error('Too many failed attempts. Please try again later.');
//       } else {
//         toast.error('An unexpected error occurred. Please try again.');
//       }
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage(prev => (prev + 1) % slides.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
//        <Toaster richColors position="top-right" />
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
//           <h2 className="text-4xl font-bold tracking-tight">Welcome Back!</h2>
//           <p className="text-lg opacity-90">Continue your journey with us.</p>
//         </div>

//         <motion.div
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1.2, ease: 'easeOut' }}
//           className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md 
//           rounded-2xl border border-white/20 p-6 text-white shadow-lg"
//         >
//           <h3 className="text-xl font-semibold mb-1">Your Adventure Awaits</h3>
//           <p className="text-sm text-white/90">
//             Log in to access your bookings, explore new destinations, and create
//             unforgettable memories.
//           </p>
//         </motion.div>
//       </div>

//       {/* Right side form */}
//       <div className="relative flex flex-col justify-center bg-background">
//         <div className="absolute top-4 right-4">
//           <ThemeToggle />
//         </div>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex items-center justify-center px-6 py-12"
//         >
//           <Card className="w-full max-w-md bg-transparent shadow-none border-none text-foreground">
//             <CardHeader className="space-y-2 text-center">
//               <CardTitle className="text-3xl font-bold tracking-tight">
//                 Welcome Back
//               </CardTitle>
//               <CardDescription>
//                 Log in to your <span className="font-semibold">TravelMate</span>{' '}
//                 account
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-4">
//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
//                   <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
//                   <Input
//                     {...register('email')}
//                     placeholder="you@example.com"
//                     id="email"
//                     type="email"
//                     className="pl-10 border-0 outline-none flex-1 text-foreground placeholder:text-muted-foreground"
//                   />
//                 </div>  
//                 {errors.email && (
//                   <p className="text-sm text-destructive">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="password">Password</Label>
//                   <a
//                     href="/forgot-password"
//                     className="text-sm text-primary hover:underline"
//                   >
//                     Forgot password?
//                   </a>
//                 </div>
//                 <div className="relative flex items-center bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-ring/60 focus-within:border-primary/70">
//                   <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
//                   <Input
//                     {...register('password')}
//                     id="password"
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="••••••••"
//                     className="pl-10 pr-10 border-0 outline-none flex-1 text-foreground placeholder:text-muted-foreground"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5" />
//                     ) : (
//                       <Eye className="h-5 w-5" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-sm text-destructive">
//                     {errors.password.message}
//                   </p>
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
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging
//                     in...
//                   </>
//                 ) : (
//                   <>Log In</>
//                 )}
//               </Button>

//               <div className="my-6 flex items-center">
//                 <Separator className="flex-1" />
//                 <span className="px-2 text-sm text-muted-foreground">
//                   or continue with
//                 </span>
//                 <Separator className="flex-1" />
//               </div>

//               {/* Social Logins */}
//               <div className="flex flex-col space-y-3">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={signInWithGoogle}
//                   className="w-full flex items-center justify-center gap-2"
//                 >
//                   <svg className="w-5 h-5" viewBox="0 0 24 24">
//                     <path
//                       fill="#4285F4"
//                       d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                     />
//                     <path
//                       fill="#34A853"
//                       d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                     />
//                     <path
//                       fill="#FBBC05"
//                       d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                     />
//                     <path
//                       fill="#EA4335"
//                       d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                     />
//                   </svg>
//                   Continue with Google
//                 </Button>

//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="w-full flex items-center justify-center gap-2"
//                 >
//                   <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
//                     <path d="M19.67 16.27c-.35.82-.52 1.19-.98 1.91-.64 1.01-1.54 2.27-2.65 2.29-1 .02-1.25-.67-2.59-.67s-1.62.65-2.64.69c-1.08.04-1.9-1.09-2.55-2.10-1.39-2.11-2.45-5.97-1.02-8.59.71-1.27 1.99-2.07 3.38-2.09 1.05-.02 2.04.71 2.59.71.55 0 1.82-.87 3.07-.74.52.02 1.98.21 2.92 1.58-2.52 1.39-2.11 5.02.47 6.01zM15.71 4.4c.53-.64.93-1.54.83-2.43-.8.03-1.76.53-2.33 1.17-.51.58-.96 1.5-.84 2.37.88.07 1.78-.45 2.34-1.11z" />
//                   </svg>
//                   Continue with Apple
//                 </Button>
//               </div>
//             </CardContent>

//             <CardFooter className="text-center text-sm text-muted-foreground">
//               Don't have an account?{' '}
//               <a
//                 href="/sign-up"
//                 className="ml-1 font-medium text-primary hover:underline"
//               >
//                 Sign up
//               </a>
//             </CardFooter>
//           </Card>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
>>>>>>> Stashed changes
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
import { useNavigate, useNavigation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { toast, Toaster } from 'sonner';

// Initialize Google Provider
const googleProvider = new GoogleAuthProvider();

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
<<<<<<< Updated upstream
      console.log('🔐 Starting login process...');
      
      // STEP 1: Authenticate with Firebase directly (this validates password!)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log('✅ Firebase authentication successful');

      // STEP 2: Get Firebase ID token (the real auth token)
      const idToken = await userCredential.user.getIdToken();

      // STEP 3: Store ID token for API requests
      localStorage.setItem('authToken', idToken);
      
      // Store user ID for current user identification
      localStorage.setItem('userId', userCredential.user.uid);
      localStorage.setItem('userEmail', userCredential.user.email || '');

      console.log('📝 Stored auth data in localStorage');
      console.log('🔍 Fetching user profile...');

      // STEP 4: Fetch user profile to get role and other info
      try {
        const res = await fetch('http://localhost:3000/user/profile', {
          headers: {
            'Authorization': `Bearer ${idToken}`,
          },
        });

        if (res.ok) {
          const userData = await res.json();
          
          // Store user data in localStorage
          localStorage.setItem('userRole', userData.role);
          localStorage.setItem('userName', userData.name);
          localStorage.setItem('userAvatar', userData.avatar || '');

          toast.success('Login successful!');
          
          // CRITICAL: Route based on user role
          if (userData.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard'); // Regular user dashboard
          }
        } else {
          // Profile fetch failed but login succeeded
          toast.success('Login successful!');
          navigate('/dashboard'); // Default to user dashboard
        }
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        toast.success('Login successful!');
        navigate('/dashboard'); // Default to user dashboard on error
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle specific Firebase errors
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        toast.error('Invalid email or password');
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('Too many failed attempts. Please try again later.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

=======
<<<<<<< Updated upstream
      await signIn(email, password);
      toast({ title: 'Signed in successfully!' });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast({ title: 'Signed in with Google!' });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Google sign in failed',
        description: error.message,
=======
<<<<<<< Updated upstream
      console.log('🔐 Starting login process...');
      
      // STEP 1: Authenticate with Firebase directly (this validates password!)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      console.log('✅ Firebase authentication successful');

      // STEP 2: Get Firebase ID token (the real auth token)
      const idToken = await userCredential.user.getIdToken();

      // STEP 3: Store ID token for API requests
      localStorage.setItem('authToken', idToken);
      
      // Store user ID for current user identification
      localStorage.setItem('userId', userCredential.user.uid);
      localStorage.setItem('userEmail', userCredential.user.email || '');

      console.log('📝 Stored auth data in localStorage');
      console.log('🔍 Fetching user profile...');

      // STEP 4: Fetch user profile to get role and other info
      try {
        const res = await fetch('http://localhost:3000/user/profile', {
          headers: {
            'Authorization': `Bearer ${idToken}`,
          },
        });

        if (res.ok) {
          const userData = await res.json();
          
          // Store user data in localStorage
          localStorage.setItem('userRole', userData.role);
          localStorage.setItem('userName', userData.name);
          localStorage.setItem('userAvatar', userData.avatar || '');

          toast.success('Login successful!');
          
          // CRITICAL: Route based on user role
          if (userData.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard'); // Regular user dashboard
          }
        } else {
          // Profile fetch failed but login succeeded
          toast.success('Login successful!');
          navigate('/dashboard'); // Default to user dashboard
        }
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        toast.success('Login successful!');
        navigate('/dashboard'); // Default to user dashboard on error
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle specific Firebase errors
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        toast.error('Invalid email or password');
      } else if (err.code === 'auth/too-many-requests') {
        toast.error('Too many failed attempts. Please try again later.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

>>>>>>> Stashed changes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);
<<<<<<< Updated upstream
=======
=======
      await signIn(email, password);
      toast({ title: 'Signed in successfully!' });
      navigate('/');
    } catch (error: any) {
      const errorMessage = handleFirebaseError(error);
      toast({
        title: 'Sign in failed',
        description: errorMessage,
>>>>>>> Stashed changes
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
<<<<<<< Updated upstream
=======

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
     navigate('/http://localhost:5174');
    } catch (error: any) {
      setGoogleLoading(false);
      const errorMessage = handleFirebaseError(error);
      toast({
        title: 'Google sign in failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };
>>>>>>> Stashed changes
>>>>>>> Stashed changes
>>>>>>> Stashed changes

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
       <Toaster richColors position="top-right" />
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

<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
        <div className="absolute top-1/4 left-10 text-white space-y-4 drop-shadow-lg">
          <h2 className="text-4xl font-bold tracking-tight">Welcome Back!</h2>
          <p className="text-lg opacity-90">Continue your journey with us.</p>
        </div>

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
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
<<<<<<< Updated upstream
            disabled={loading}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
=======
            disabled={loading || googleLoading}
          >
            {googleLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Redirecting to Google...
              </>
            ) : (
              <>
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </>
            )}
>>>>>>> Stashed changes
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            Don't have an account?{' '}
            <Link to="/signup" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
>>>>>>> Stashed changes
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
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={signInWithGoogle}
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

                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.67 16.27c-.35.82-.52 1.19-.98 1.91-.64 1.01-1.54 2.27-2.65 2.29-1 .02-1.25-.67-2.59-.67s-1.62.65-2.64.69c-1.08.04-1.9-1.09-2.55-2.10-1.39-2.11-2.45-5.97-1.02-8.59.71-1.27 1.99-2.07 3.38-2.09 1.05-.02 2.04.71 2.59.71.55 0 1.82-.87 3.07-.74.52.02 1.98.21 2.92 1.58-2.52 1.39-2.11 5.02.47 6.01zM15.71 4.4c.53-.64.93-1.54.83-2.43-.8.03-1.76.53-2.33 1.17-.51.58-.96 1.5-.84 2.37.88.07 1.78-.45 2.34-1.11z" />
                  </svg>
                  Continue with Apple
                </Button>
              </div>
            </CardContent>

            <CardFooter className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <a
                href="/sign-up"
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