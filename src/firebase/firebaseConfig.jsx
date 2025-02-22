// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9lDWwwx1yWJZhSKLrUIg8ejPhTW_lT2A",
  authDomain: "phoneauthproject-6a0d7.firebaseapp.com",
  projectId: "phoneauthproject-6a0d7",
  storageBucket: "phoneauthproject-6a0d7.firebasestorage.app",
  messagingSenderId: "738822120587",
  appId: "1:738822120587:web:cb136dd6512c97bbe4208e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.useDeviceLanguage(); // Use the device's language for OTP messages

// ReCAPTCHA verifier setup
export const setUpRecaptcha = (phoneNumber) => {
  const recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible", // Set "invisible" for automatic handling
      callback: (response) => {
        console.log("ReCAPTCHA solved");
      },
    },
    auth
  );
  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};
