import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBo_O9-h9Huzv-Lbj2MVzghBlruNUP0vM4",
  authDomain: "fir-auth-next-4dfb2.firebaseapp.com",
  projectId: "fir-auth-next-4dfb2",
  storageBucket: "fir-auth-next-4dfb2.appspot.com",
  messagingSenderId: "806907220611",
  appId: "1:806907220611:web:7413f12bd3f61dc315c1b6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
