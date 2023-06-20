import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCYZnfiJeDlA7HVtMLPsMugaf35iS_veL0",
  authDomain: "search-cnpj.firebaseapp.com",
  databaseURL: "https://search-cnpj-default-rtdb.firebaseio.com",
  projectId: "search-cnpj",
  storageBucket: "search-cnpj.appspot.com",
  messagingSenderId: "1042200140294",
  appId: "1:1042200140294:web:0be3f44015deda4a700187"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const realtimeDatabase = getDatabase(app);