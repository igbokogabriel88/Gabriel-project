import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

//there is no callback for redux
export const AuthLogin = async (callback)=> {
    onAuthStateChanged(auth, (user) =>{
if (user){
    console.log('User is logged in:', user.email);
    //dispatch(setUser(user5))
 } else {
    console.log('User is not logged in');
    //dispatch(clearUser())
 }
 if (callback){
    callback(user)
 }
    } )
} 

 //import and call in another component
   const Componenet = () => {
    const [currentUser, setCurentUser] = useState(null);
    useEffect(()=> {
        // no callback for redux. just call AuthLogin();
        const unsubscribe = AuthLogin((user)=> 
        setCurentUser(user))
    });
    return () => unsubscribe();
    }