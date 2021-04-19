import firebase from "firebase/app";

import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBgoWKSYqCNqG82BkYm8ogLzJs0_adDV5c",
  authDomain: "e-comart.firebaseapp.com",
  projectId: "e-comart",
  storageBucket: "e-comart.appspot.com",
  messagingSenderId: "758831920732",
  appId: "1:758831920732:web:4c9a7e67426e1a3c271899",
  measurementId: "G-LDPFDBFXBY"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
