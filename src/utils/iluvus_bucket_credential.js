// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAqlCLIfxvqA3FKpAKDh3AHmC0QreF6JpI',
    authDomain: 'iluvus-media.firebaseapp.com',
    projectId: 'iluvus-media',
    storageBucket: 'iluvus-media.appspot.com',
    messagingSenderId: '216159615818',
    appId: '1:216159615818:web:308da44805e506ea521fb3',
    measurementId: 'G-V33D8DC22X',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
