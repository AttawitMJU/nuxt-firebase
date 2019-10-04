import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  const config = {
    

  }
  firebase.initializeApp(config)
}

export const FirebaseStore = firebase.firestore() 

