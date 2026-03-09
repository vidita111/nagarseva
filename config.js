// Firebase configuration - move sensitive data to environment variables
export const firebaseConfig = {
  apiKey: window.ENV?.FIREBASE_API_KEY || "",
  authDomain: "nagarseva-crm.firebaseapp.com",
  projectId: "nagarseva-crm",
  storageBucket: "nagarseva-crm.firebasestorage.app",
  messagingSenderId: "876853335899",
  appId: window.ENV?.FIREBASE_APP_ID || ""
};
