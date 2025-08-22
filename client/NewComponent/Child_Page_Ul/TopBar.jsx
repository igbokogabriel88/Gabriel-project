import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Classic_Spinner, Classic_Loader } 
from "../LoadingSpinner/CircularSpinner/ClassicSpinner";
import { FaSearch } from "react-icons/fa";
import { Logout, setLoading, clearLoading } from "../Redux/Action/Action";
// import { SearchModal } from "./Other_Category/SearchModal"
import { openSearchBox } from "../Redux/Action/Action";
import './ChildPage.css'

export const TopBar = ({scrollValue}) =>{
    const [status, setStatus] = useState('login');
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const category = useSelector(state => state.Category);
    // const searchInput = useSelector(state => state.search_Reducer);
    const auth = useSelector(state => state.Auths);
    const userLoading = useSelector(state => state.Loading);
    const user = auth.user;
    const loading = auth.loading;
    const selected = category.name
    const isAuthenticated = auth.isAuthenticated;
    const PF = 'http://localhost:4200/images/'
    // const searchModal = searchInput.searchOpen;
    // console.log('AUTH_USER:', auth),
    // console.log('TOPBARPAGE:', user, loading)
    // console.log('TOPBARPAGE_ISAUTHENTIC:', isAuthenticated);
    // console.log('USERLOADING:', userLoading)

    
     
        useEffect(()=> {
        if (userLoading === true){
            setStatus('loading');    
        } else if (isLoading === true){
            setStatus('loading')
        } else if (user != null){
            setStatus('logout')
        } else {
            setStatus('login')
        }
    },[userLoading, user, isLoading]);

     
       const handleModal = ()=> {
            setIsloading(true);
            setTimeout(()=> {
             navigate('/login')
             setIsloading(false)
           }, 2000)
    }
               
       const openSearchModal = () => {
           dispatch(openSearchBox(true))
       };
       const handleUsername = (value) => {
           return value.split(" ")[0];
           console.log('VALUE_SPLIT:', value)
       }

       const handleLogout = () => {
          dispatch(Logout())
       }

    return (
        <div className={`top-bar ${scrollValue ? 'yes': ''}
        ${selected != 'all'? 'select': ''}
        ${['privacy-policy', 'terms-of-service'].includes(selected) ? 'hide' : ''}`}>
        <div className={`logo ${scrollValue ?  'yes' : ''}
        ${selected != 'all'? 'select': ''}`}> 
        <span>Logo</span><span>Mintxplore</span></div>
        <div className= {`span2 ${status === 'loading' ? 'loading': ''}
        ${selected != 'all'? 'select': ''}`}> 
        <span className={`span3 ${scrollValue ? 'yes' : ''}
        ${user != null ? 'user' : 'non'}`}>
        <FaSearch onClick={openSearchModal}
        style={{marginTop: '2px'}}/></span>
        {status === 'login' ? <span className= {`span4 ${scrollValue ? 'yes' : ''}`}
        onClick={handleModal}>Login</span> :
        status === 'loading' ? 
        <span className={`span5 ${status === 'loading' ? 'shift' : ''}`}><Classic_Spinner/></span> :
        // status === 'userLoading' ? 
        // <span className="span5"><Classic_Loader/></span> :
        <span className={`span6 ${scrollValue ? 'yes' : ''}
             ${user && user.userImage === null ? 'null' : ''}`}
        style={{ display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', marginLeft: '24px',
        position: 'sticky'}}
        onClick={handleLogout}> 
           {user && user.userImage && 
            <img key="image1"
            src={PF + user.userImage}
            alt=""
            style={{width: '120%', height: '150%', 
                borderRadius: '50%', objectFit: 'cover'
            }}
            />}
            {user && !user.userImage &&
             <span style={{width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column', position: 'relative',
                alignItems: 'center', justifyContent: 'center', gap: '1',
                backgroundColor: 'transparent', marginLeft: '-1px'
             }}>
                <img key= "image2"
                src="/Upload/avatar1.jpg" 
                alt="Default"
                style={{width: '80%', objectFit: 'cover',
                    borderRadius: '50%',  marginTop: '-14px',
                    marginLeft: '6px', position: 'relative'
                }} className="h-image"/>
                <span style={{fontSize: '10px', backgroundColor: 'transparent',
                  top: '40%', position: 'absolute'
                }}>
                    {handleUsername(user.username)}
                </span>
                {/* <span>handleUsername(user.username)</span> */}
                </span>}</span>}  </div>
             {/* <SearchModal open={searchModal}/
             handleSearch={openSearchModal}/> */}
            </div>
    )
}