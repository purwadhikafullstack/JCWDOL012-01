import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDvBjpjDPfQnl4y0BDr56sjlxp7ghNfmv8',
  authDomain: 'grocery-online-20ad3.firebaseapp.com',
  projectId: 'grocery-online-20ad3',
  storageBucket: 'grocery-online-20ad3.appspot.com',
  messagingSenderId: '108182135201',
  appId: '1:108182135201:web:1dc935f31c17206271abe0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
