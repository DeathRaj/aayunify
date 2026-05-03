"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** Returns false when Firebase public env hasn’t been completed yet — UI can fall back to seed data. */
export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

function warnMissing() {
  const missingKeys = (
    ["apiKey", "projectId"] as Array<keyof typeof firebaseConfig>
  ).filter((k) => !firebaseConfig[k]);
  if (missingKeys.length) {
    console.warn(
      "[AayuUnify] Firebase env incomplete — running in seeded demo mode:",
      missingKeys.join(", "),
    );
  }
}

export function getFirebaseApp() {
  warnMissing();
  if (!getApps().length) return initializeApp(firebaseConfig);
  return getApp();
}

export function getFirestoreDb() {
  return getFirestore(getFirebaseApp());
}

export function getFirebaseAuthClient() {
  return getAuth(getFirebaseApp());
}
