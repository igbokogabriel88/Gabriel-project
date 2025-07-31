import { auth } from "./Firebase"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const Logout = async (auth) => {
   const navigate = useNavigate();
   await signOut(auth);
   navigate('/')
}