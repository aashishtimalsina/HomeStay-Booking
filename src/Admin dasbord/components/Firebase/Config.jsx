import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhI8psJVI5vNSsWFaoz5LPMhZKUsHoot4",
  authDomain: "homestay-5ec25.firebaseapp.com",
  projectId: "homestay-5ec25",
  storageBucket: "homestay-5ec25.appspot.com",
  messagingSenderId: "217239505760",
  appId: "1:217239505760:web:19c56ef03f812170dd6c05",
  measurementId: "G-BP8Q23H083"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);