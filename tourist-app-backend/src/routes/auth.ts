// routes/auth.ts
import { Hono } from 'hono';
import { z } from 'zod';
import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';
import { requireAuth } from '../middleware/auth';

const router = new Hono();

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccountPath = process.env.FIREBASE_ACCOUNT_PATH;
  if (!serviceAccountPath) {
    throw new Error('❌ Missing FIREBASE_ACCOUNT_PATH in .env');
  }

  const fullPath = path.resolve(serviceAccountPath);
  const serviceAccount = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = admin.firestore();

// Validation schemas
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
    role: z.enum(['user', 'admin']).optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// SIGNUP
router.post('/signup', async c => {
  try {
    const body = await c.req.json().catch(() => null);
    console.log('signup page', body);
    if (!body) return c.json({ error: 'Request body is required' }, 400);

    const validated = signUpSchema.parse(body);

    // Check if user exists in Firestore
    const usersRef = firestore.collection('users');
    const existingUserSnap = await usersRef
      .where('email', '==', validated.email)
      .get();
    if (!existingUserSnap.empty)
      return c.json({ error: 'User already exists' }, 409);

    // Convert phone to E.164 format if not already
    let phone = validated.phone;
    if (!phone.startsWith('+')) {
      phone = '+234' + phone.replace(/^0+/, '');
    }

    // Create Firebase Auth user
    const userRecord = await admin.auth().createUser({
      email: validated.email,
      password: validated.password,
      displayName: validated.name,
    });

    // Add extra data to Firestore
    await usersRef.doc(userRecord.uid).set({
      uid: userRecord.uid,
      name: validated.name,
      email: validated.email,
      phone: phone,
      role: validated.role === 'admin' ? 'admin' : 'user',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Generate custom token
    const token = await admin.auth().createCustomToken(userRecord.uid);

    return c.json({ message: 'User created successfully', token }, 201);
  } catch (err: any) {
    if (err instanceof z.ZodError)
      return c.json({ error: 'Validation failed', details: err }, 400);
    console.error('Signup error:', err);
    return c.json({ error: 'Failed to create account' }, 500);
  }
});

// LOGIN
router.post('/login', async c => {
  try {
    const body = await c.req.json().catch(() => null);
    if (!body) return c.json({ error: 'Request body is required' }, 400);

    const { email, password } = loginSchema.parse(body);

    // Step 1: Verify email exists in Firestore
    const usersRef = firestore.collection('users');
    const userSnap = await usersRef.where('email', '==', email).get();
    if (userSnap.empty) {
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    const userDoc = userSnap.docs[0];
    const uid = userDoc.id;

    // Step 2: Validate with Firebase Auth
    try {
      await admin.auth().getUserByEmail(email);
    } catch (authError) {
      console.error('Auth error:', authError);
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    // Step 3: Generate custom token
    const token = await admin.auth().createCustomToken(uid);

    return c.json({
      message: 'Login successful',
      token,
      user: {
        uid: uid,
        name: userDoc.data().name,
        email: userDoc.data().email,
        role: userDoc.data().role,
      },
    });
  } catch (err: any) {
    if (err instanceof z.ZodError)
      return c.json({ error: 'Validation failed', details: err.message }, 400);
    console.error('Login error:', err);
    return c.json({ error: 'Invalid email or password' }, 500);
  }
});

// GOOGLE SIGNUP - ONLY for creating NEW accounts
router.post('/google-signup', requireAuth, async c => {
  try {
    const rawUid = (c as any).get('userId');
    if (typeof rawUid !== 'string' || !rawUid) {
      console.error('❌ Missing or invalid userId in request context');
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const uid = rawUid;
    const { email, name, avatar } = await c.req.json();

    console.log('🔵 Google SIGNUP request for:', email, 'UID:', uid);

    const usersRef = firestore.collection('users');
    
    // Check if user already exists
    const userDoc = await usersRef.doc(uid).get();

    if (userDoc.exists) {
      // USER ALREADY EXISTS - Reject signup
      console.log('❌ User already exists - cannot signup');
      return c.json({ 
        error: 'Account already exists',
        existingEmail: email,
      }, 409); // 409 Conflict
    }

    // USER DOESN'T EXIST - Create new account
    console.log('✅ New user - creating account');
    
    const newUserData = {
      uid,
      name: name || email?.split('@')[0] || 'User',
      email,
      avatar: avatar || '',
      role: 'user',
      phone: '',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      provider: 'google',
    };

    await usersRef.doc(uid).set(newUserData);

    console.log('✅ User account created successfully');

    return c.json({
      message: 'Account created successfully',
      user: {
        uid,
        role: 'user',
        name: newUserData.name,
        email: newUserData.email,
        avatar: newUserData.avatar,
        phone: '',
      }
    }, 201);

  } catch (err: any) {
    console.error('❌ Google signup error:', err);
    return c.json({ 
      error: 'Failed to create account',
      details: err.message 
    }, 500);
  }
});

export default router;