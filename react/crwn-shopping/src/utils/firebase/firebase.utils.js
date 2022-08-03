import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';

import {
    getFirestore,
    doc,  //document instance
    getDoc,  //data from document
    setDoc,  //set data from document
    getDocFromCache
} from 'firebase/firestore'

// https://firebase.google.com/
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzcvBSwXncJkavRadefYPJnY6Edhcax_g",
    authDomain: "crwn-shopping-db-a2d7f.firebaseapp.com",
    projectId: "crwn-shopping-db-a2d7f",
    storageBucket: "crwn-shopping-db-a2d7f.appspot.com",
    messagingSenderId: "26706275334",
    appId: "1:26706275334:web:9cd4b74f57448713d9a787"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const {displayName, email } = userAuth
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }
        catch(error){
            console.log('error creating user', error.mesage)

        }

        return userDocRef;
    }
  }