// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,getAuth,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { addDoc,collection,getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9qhX-Fn34gmQ9tIiixcHhtrxPCDkCCxs",
    authDomain: "netflix-clone-510ea.firebaseapp.com",
    projectId: "netflix-clone-510ea",
    storageBucket: "netflix-clone-510ea.appspot.com",
    messagingSenderId: "155738018850",
    appId: "1:155738018850:web:c802f222b95fdc6b24267b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db=getFirestore(app);

const signup = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider: "local",
            email
        })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async (email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout =async()=>{
    signOut(auth);
}
export {auth ,db,login,logout,signup}