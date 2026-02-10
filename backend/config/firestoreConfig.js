import { initializeApp } from "firebase/app";
import {

  FIRESTORE_API_KEY,
  FIRESTORE_AUTH_DOMAIN,
  FIRESTORE_PROJECT_ID,
  FIRESTORE_STORAGE_BUCKET,
  FIRESTORE_MESSAGING_SENDER_ID,
  FIRESTORE_APP_ID

} from process.env

const firebaseConfig = {
  apiKey: FIRESTORE_API_KEY,
  authDomain: FIRESTORE_AUTH_DOMAIN,
  projectId: FIRESTORE_PROJECT_ID,
  storageBucket: FIRESTORE_STORAGE_BUCKET,
  messagingSenderId: FIRESTORE_MESSAGING_SENDER_ID,
  appId: FIRESTORE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;