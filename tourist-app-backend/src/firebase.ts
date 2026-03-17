// var admin = require('firebase-admin');

// var serviceAccount = require('path/to/serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// firebase.ts
import admin from "firebase-admin";
import fs from "fs";

const serviceAccountPath = './src/firebase-service-account.json';
const raw = fs.readFileSync(serviceAccountPath, 'utf-8');
const serviceAccount = JSON.parse(raw);

// Prevent re-initialization during hot reload
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("🔥 Firebase Admin initialized");
}

export default admin;
