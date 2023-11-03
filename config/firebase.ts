import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDJyPQlhNcY_ZIlaBFc0JYFaDUY4wKKG5I",
  authDomain: "killer-diller-e1558.firebaseapp.com",
  projectId: "killer-diller-e1558",
  storageBucket: "killer-diller-e1558.appspot.com",
  messagingSenderId: "767806386669",
  appId: "1:767806386669:web:d912a5e08bdde577b4b7e4",
  measurementId: "G-LPDW5PK89J"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);