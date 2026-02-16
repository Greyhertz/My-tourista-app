import { auth } from '../firebase';

async function verifyEmail() {
  const uid = 'wRj538BVPeQtWHKRpym92nG6Rfy1'; // Your UID
  
  try {
    await auth.updateUser(uid, {
      emailVerified: true
    });
    
    console.log('✅ Email verified successfully!');
    console.log('🔄 Sign in again to get fresh token with emailVerified: true');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

verifyEmail();