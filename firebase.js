// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const functions = require('firebase-functions');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvFl1FTUdYtSFFmQPUf6OSyWywRE_MBMY",
  authDomain: "tdmonitor-1b233.firebaseapp.com",
  projectId: "tdmonitor-1b233",
  storageBucket: "tdmonitor-1b233.appspot.com",
  messagingSenderId: "565270161309",
  appId: "1:565270161309:web:26a397b088901b2008f174",
  measurementId: "G-9Z299HKJ4L"
};

// Initialize Firebase
const app = functions.initializeApp(firebaseConfig);
const db = functions.getFirestore(app);

exports.reqDiario = async function getDiario(db) {
  const citiesCol = collection(db, 'diario');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}