import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDI5f3jNGGpYvlomzYCKIoZPm4_fzRFn9w",
  authDomain: "totalx-7993d.firebaseapp.com",
  projectId: "totalx-7993d",
  storageBucket: "totalx-7993d.firebasestorage.app",
  messagingSenderId: "868431091475",
  appId: "1:868431091475:web:4367c6dac83dd2107d6ce6",
  measurementId: "G-CPQ29ME1DT",
  DatabaseURL:'https://totalx-7993d-default-rtdb.firebaseio.com'
};

export const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
