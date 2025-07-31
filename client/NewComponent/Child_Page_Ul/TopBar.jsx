import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Classic_Spinner } from "../LoadingSpinner/CircularSpinner/ClassicSpinner";
import { FaSearch } from "react-icons/fa";
import { Logout } from "../Redux/Action/Action";
// import { SearchModal } from "./Other_Category/SearchModal"
import { openSearchBox } from "../Redux/Action/Action";
import './ChildPage.css'

export const TopBar = ({scrollValue}) =>{
    const [status, setStatus] = useState('login');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const category = useSelector(state => state.Category);
    const searchInput = useSelector(state => state.search_Reducer);
    const auth = useSelector(state => state.Auths);
    const user = auth.user;
    const loading = auth.loading;
    const selected = category.name
    const searchModal = searchInput.searchOpen;
    console.log('AUTH_USER:', auth),
    console.log('TOPBARPAGE:', user, loading)
       
    useEffect(()=> {
        if ( user!= null){
            setStatus('logout');
             
        }
    },[loading, user]);
        
       const handleModal = ()=> {
            setStatus('loading');
            setTimeout(()=> {
             navigate('/login')
          }, 2000)
    }
               
       const openSearchModal = () => {
           dispatch(openSearchBox())
       };
       
    return (
        <div className={`top-bar ${scrollValue ? 'yes': ''}
        ${selected != 'all'? 'select': ''}`}>
          <div className={`logo ${scrollValue ?  'yes' : ''}
          ${selected != 'all'? 'select': ''}`}> <span>Logo</span><span>Mintxplore</span></div>
           <div className= {`span2 ${status === 'loading' ? 'loading': ''}
           ${selected != 'all'? 'select': ''}`}> 
            <span className={`span3 ${scrollValue ? 'yes' : ''}`}>
                <FaSearch onClick={openSearchModal}/></span>
           {status === 'login' ? <span className= {`span4 ${scrollValue ? 'yes' : ''}`}
            onClick={handleModal}>Login</span> :
            status === 'loading' ? 
            <span className="span5"><Classic_Spinner/></span> :
            <span className="span6"> Logout</span>}  </div>
             {/* <SearchModal open={searchModal}
             handleSearch={openSearchModal}/> */}
            </div>
    )
}