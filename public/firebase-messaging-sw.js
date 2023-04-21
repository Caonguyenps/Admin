importScripts(
  "https://www.gstatic.com/firebasejs/9.6.7/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDNUuC2VdTQopcTf7tG78c2GDyCa0aSiro",
  authDomain: "ecommercestore-cd8df.firebaseapp.com",
  projectId: "ecommercestore-cd8df",
  storageBucket: "ecommercestore-cd8df.appspot.com",
  messagingSenderId: "455334875658",
  appId: "1:455334875658:web:7608b37445f62e3e3c05f3",
  measurementId: "G-E7BWJY502M",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
