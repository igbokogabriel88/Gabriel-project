import { useEffect, useState } from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user) =>
         {   setLoading(false);
        setUserLoggedIn(!!user);
         }
    );
    return () => unsubscribe();
    },[]);
    if (loading){5
        return <div>loading...</div>
    }
    if (!userLoggedIn){
        return Navigate('/login')
    };
    return children
}


