// import { createContext, useContext, useEffect, useState,type  ReactNode } from 'react';
// import { 
//  type User,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut as firebaseSignOut,
//   signInAnonymously,
//   signInWithRedirect,  // Changed from signInWithPopup
//   getRedirectResult,    // Added
//   GoogleAuthProvider,
//   sendEmailVerification,
// } from 'firebase/auth';
// import { auth } from '@/lib/firebase';
// import { api } from '@/lib/api';

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   signIn: (email: string, password: string) => Promise<void>;
//   signUp: (email: string, password: string) => Promise<void>;
//   signInWithGoogle: () => Promise<void>;
//   signOut: () => Promise<void>;
//   sendVerificationEmail: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);


// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initAuth = async () => {
//       // Check for redirect result first
//       try {
//         const result = await getRedirectResult(auth);
//         if (result?.user) {
//           // Register with backend after Google sign-in
//           await api.post('/auth/register').catch(() => {
//             // Ignore if already registered
//           });
//         }
//       } catch (error) {
//         console.error('Redirect result error:', error);
//       }

//       // Sign in anonymously if no user
//       if (!auth.currentUser) {
//         try {
//           await signInAnonymously(auth);
//         } catch (error) {
//           console.error('Anonymous sign-in failed:', error);
//         }
//       }
//     };

//     initAuth();

//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   // .. signIn, signUp stay same ...
//    const signIn = async (email: string, password: string) => {
//     await signInWithEmailAndPassword(auth, email, password);
//   };

//   const signUp = async (email: string, password: string) => {
//     const { user } = await createUserWithEmailAndPassword(auth, email, password);
//    await sendEmailVerification(user);
//  };

//   const signInWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     // Use redirect instead of popup
//     await signInWithRedirect(auth, provider);
//     // User will be redirected away and back
//   };

//   // ... rest stays same ...


//   const signOut = async () => {
//     await firebaseSignOut(auth);
//     // Sign in anonymously again after sign out
//     await signInAnonymously(auth);
//   };


//     const sendVerificationEmail = async () => {
//     if (user) {
//       await sendEmailVerification(user);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       loading,
//       signIn,
//       signUp,
//       signInWithGoogle,
//       signOut,
//       sendVerificationEmail,
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// }

import { createContext, useContext, useEffect, useState,type ReactNode } from 'react';
import { 
 type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInAnonymously,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { api } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // CRITICAL: Check redirect result FIRST before signing in anonymously
        const result = await getRedirectResult(auth);
        
        if (result?.user) {
          console.log('✅ Google sign-in successful:', result.user.email);
          
          // Register with backend
          try {
            await api.post('/auth/register');
            console.log('✅ Registered with backend');
          } catch (error: any) {
            // Ignore if already registered
            if (!error.message?.includes('Already registered')) {
              console.error('Backend registration failed:', error);
            }
          }
          
          // Don't sign in anonymously - we have a real user
          return;
        }

        // Only sign in anonymously if NO redirect result and NO current user
        if (!auth.currentUser) {
          console.log('📝 No user found, signing in anonymously');
          await signInAnonymously(auth);
        }
        
      } catch (error: any) {
        console.error('Auth initialization error:', error);
        
        // If redirect error, still try anonymous sign-in
        if (!auth.currentUser) {
          try {
            await signInAnonymously(auth);
          } catch (anonError) {
            console.error('Anonymous sign-in failed:', anonError);
          }
        }
      }
    };

    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('👤 Auth state changed:', user?.email || 'anonymous');
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(user);
    
    // Register with backend
    await api.post('/auth/register');
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account' // Force account selection
    });
    
    console.log('🔄 Redirecting to Google sign-in...');
    await signInWithRedirect(auth, provider);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    // Sign in anonymously again after sign out
    await signInAnonymously(auth);
  };

  const sendVerificationEmail = async () => {
    if (user) {
      await sendEmailVerification(user);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      sendVerificationEmail,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}