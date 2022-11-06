import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlGnIa3S3ZmlLwUYazylyV5yc8s5cK1vQ",
  authDomain: "restaurant-faaba.firebaseapp.com",
  databaseURL: "https://restaurant-faaba-default-rtdb.firebaseio.com",
  projectId: "restaurant-faaba",
  storageBucket: "restaurant-faaba.appspot.com",
  messagingSenderId: "209497591730",
  appId: "1:209497591730:web:497c9c4eb90c1128249eab",
};

const app = getApps.length > 0 ? getApps() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
