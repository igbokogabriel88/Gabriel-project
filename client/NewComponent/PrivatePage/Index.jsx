import React, {useState, useEffect, useRef} from "react";
import { Account_Overview } from "./Account_Overview";
import { useSelector } from "react-redux";
import './Overview.css'

const AccountViewPage = () => {
    const [position, setPosition]= useState(0);
    // const [loggedIn, setLoggedIn] = useState(true)
    const verticalScrollRef = useRef();
    const auth = useSelector(state => state.Auths);
    const user = auth.user;   
    
         useEffect(()=>{
            const container = verticalScrollRef.current;
            const handleScroll = () => {
                const maxScroll = container.scrollHeight - container.clientHeight;
                const scrollRatio = container.scrollTop/ maxScroll;
                setPosition(scrollRatio * (container.clientHeight - 176))
            }
            container?.addEventListener('scroll', handleScroll);
            return () => {
                container?.removeEventListener('scroll', handleScroll)
            };
         },[]);
    
    console.log('vertical position:', position);
    return (
        <div className="overviewPage">
            <div className="vertical-scrollbar" style={{transform: `translateY(${position * 1.15}px)`}}></div>
         <div  className= {`overview ${user != null ? 'logIn': ''}`}
         ref={verticalScrollRef}>
            <Account_Overview />
            </div> </div>
    )
}
export default AccountViewPage