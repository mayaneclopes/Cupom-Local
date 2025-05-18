// config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD_xvpTQ9csuTsyw1UwAwS13ymdTCgFruM",
  authDomain: "cupom-local.firebaseapp.com",
  projectId: "cupom-local",
  storageBucket: "cupom-local.firebasestorage.app",
  messagingSenderId: "425770953222",
  appId: "1:425770953222:web:1ac921ec9b24bab2b8b187"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
