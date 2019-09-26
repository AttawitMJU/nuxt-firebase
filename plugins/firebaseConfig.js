import firebase from 'firebase/app'
import 'firebase/firestore'


if (!firebase.apps.length) {
    const config = {
        apiKey: "AIzaSyCGYfqCJaDd4wzDnh5BuVHJEk0N9kRLMiY",
        authDomain: "cs313project-29212.firebaseapp.com",
        databaseURL: "https://cs313project-29212.firebaseio.com",
        projectId: "cs313project-29212",
        storageBucket: "cs313project-29212.appspot.com",
        messagingSenderId: "22957030411",
        appId: "1:22957030411:web:57331720a1019c14d79b0e"
    }
    firebase.initializeApp(config)
}
export const db = firebase.firestore() 

