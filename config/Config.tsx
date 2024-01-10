import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage";
////////////////
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyA9uWEa1sLD_yfVv_h0bVbxK3pgbGCU20A",
  authDomain: "app-mov2andyj.firebaseapp.com",
  databaseURL: "https://app-mov2andyj-default-rtdb.firebaseio.com",
  projectId: "app-mov2andyj",
  storageBucket: "app-mov2andyj.appspot.com",
  messagingSenderId: "735483515468",
  appId: "1:735483515468:web:dad549919dcb521b721ae9"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig); 
 
export const auth = getAuth(app) 
export const storage=getStorage(app)