import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
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

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()) {
        const {displayName, email } = userAuth
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        }
        catch(error){
            console.log('error creating user', error.mesage)

        }

        return userDocRef;
    }
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email||!password) return; 
    return await signInWithEmailAndPassword(auth, email, password)
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email||!password) return; 
    return await createUserWithEmailAndPassword(auth, email, password)
  }