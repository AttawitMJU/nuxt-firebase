import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  const config = {
    apiKey: "AIzaSyD0HzIqPEp_Cf9Q9ZLaV1F3Qr0zQxPRN_Q",
    authDomain: "cs313fire.firebaseapp.com",
    databaseURL: "https://cs313fire.firebaseio.com",
    projectId: "cs313fire",
    storageBucket: "cs313fire.appspot.com",
    messagingSenderId: "590829463586",
    appId: "1:590829463586:web:3800c5793377b01fe7c27b"

  }
  firebase.initializeApp(config)
}

export const FirebaseStore = firebase.firestore() 

