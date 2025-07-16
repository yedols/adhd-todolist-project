importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBuABM6DPeFBJv3lGA-7rvfoBqKVPgFIOM",
  authDomain: "dotodo-ede09.firebaseapp.com",
  projectId: "dotodo-ede09",
  messagingSenderId: "324816079381",
  appId: "1:324816079381:web:5943ef9796c0c0e2081c1c",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  console.log('🔔 알림 제목:', payload.notification?.title);
});
