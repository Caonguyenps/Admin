// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNUuC2VdTQopcTf7tG78c2GDyCa0aSiro",
  authDomain: "ecommercestore-cd8df.firebaseapp.com",
  projectId: "ecommercestore-cd8df",
  storageBucket: "ecommercestore-cd8df.appspot.com",
  messagingSenderId: "455334875658",
  appId: "1:455334875658:web:7608b37445f62e3e3c05f3",
  measurementId: "G-E7BWJY502M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const getTokenFirebase = () => {
  return new Promise(async (resolve, reject) => {
    await getToken(messaging, {
      vapidKey:
        "BGZTIopM1sKqBde-zsb4aOLWGnC0hwqwjLSB0kj1ImN-xOKwm42f19e_spdA-uDSGEkHdS7IZCQQ5qX8YTgWyc0",
    })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log(currentToken);
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  });
};

export const onMessageListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};
