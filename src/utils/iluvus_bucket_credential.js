import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBcEZpcgem2s_oY7k5blruDRbmBSfkb1GU",
    authDomain: "iluvus-2.firebaseapp.com",
    projectId: "iluvus-2",
    storageBucket: "iluvus-2.firebasestorage.app",
    messagingSenderId: "28085879424",
    appId: "1:28085879424:web:40342355df23a73c169c65"
  };
 
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)