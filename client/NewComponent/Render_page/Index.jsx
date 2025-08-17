
import React, {Fragment, useEffect, useState} from "react";
import { Route, Routes } from 'react-router-dom';
import RenderPage from "./Render_page";
import { ModalComponent } from "../ModalPage/Index";
import { Mint_Nft } from "../MInt_Deposit_Withdraw/Mint_Nft";
import AccountViewPage from "../PrivatePage/Index";
import Exhibitions from "../PrivatePage/Add_Exhibition/Exhibition";
import Withdrawal from "../MInt_Deposit_Withdraw/Withdrawal/Withdrawal";
import DepositViewPage from "../PrivatePage/Deposit/Index";
import { Dashboard } from "../Icons/Dashboard";
import { Profile } from "./Profile";
// import { Dashboard } from "../Icons/Dashboard";
import NewPassword from "../ChangePassword_EditProfile/NewPassword/NewPassword";
import EditProfile from "../ChangePassword_EditProfile/EditProfile";
import ChangePassword from "../ChangePassword_EditProfile/ChangePassword.";
import SidebarComponent from "../Icons/SidebarComponent/Sidebar";
import { SearchModal } from "../Child_Page_Ul/Other_Category/SearchModal";
import { ProtectedRoute } from "../RouteGuard/RouteGuard"; 
// import { AlertPage } from "../MainBodyPage/AlertsPage";
import { useSelector, useDispatch } from "react-redux";
// import { PublicOnlyRoute } from "../RouteGuard/publicRoute";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Load_User from "../Helper/loadUser";
import { RouteLoadingPage } from "../RouteGuard/RouteLoading";
import { AlertPage } from "../MainBodyPage/AlertsPage";
import { setLoading, clearLoading, authError } from "../Redux/Action/Action";
import { setAuthtoken } from "../Helper/setAuthToken";
import { connectwallet } from "../Helper/walletConnect";
 import { NftUser } from "../Helper/nftUser";


const Main_Component = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const success = useSelector(state => state.Alert)
    const loading = useSelector(state => state.Loading)
    const user = useSelector(state => state.Auths.user)
    const walletAddress = useSelector(state => state.fetchWallet);
    // console.log('ANOTHER_WALLET_ADDRESS:', walletAddress)
    const path = location.pathname;
    const showDashboard = path.includes('/overview') ||
    path.includes('/withdrawal') || path.includes('/deposit') ||
    path.includes('/overview/:mint') ||
     path.includes('/change-password') ||
      path.includes('/edit-profile');
   
    useEffect(() => {
      dispatch(setLoading(true));
     if(localStorage.token){
       const timer = setTimeout(() => {
        dispatch(clearLoading(false));
        
        Load_User(dispatch, navigate);
       },500)
      
       return () => clearTimeout(timer)
          } else {
            dispatch(clearLoading(false))
            dispatch(authError());
          }
        },[dispatch, navigate]);

        useEffect(() => {
          if (walletAddress){
              console.log('WALLET_ADDRESS:', walletAddress)
            }
          },[walletAddress])

        useEffect(() => {
           connectwallet(dispatch)
        },[dispatch])
     
         useEffect(() => {
          console.log('NEW NFTS USER CREATED:', user)
          if (user){
            NftUser(user, walletAddress)
         }
         },[user, walletAddress])

    
    return (
        <div style={{display: 'flex', flexDirection: 'column',
            width: '340px', height: '615px', position: 'relative',
            padding: '0px'
        }}>
     <Fragment>
        { showDashboard && <Dashboard 
        />}
         <SearchModal/>
        
        <section>
         <AlertPage
         alerts={success}
         /> 
          <Routes>
          <Route exact path='/' 
          element={<RenderPage/>} />

          <Route path='/home/:selected'
           element={<RenderPage/>}/>

          <Route path='/about/:selected'
           element={<RenderPage/>}/>  

         <Route path='/profile'
           element={<Profile/>}/>  


          <Route path='/login' 
          element={
            <ModalComponent/>
          }/>

          <Route path='/loading' 
          element={
            <RouteLoadingPage/>
          }/>
          
          <Route path='/mint'
            element = {
                <ProtectedRoute>
                    <Mint_Nft/>
                    </ProtectedRoute>
              } />
           
          <Route path='/withdrawal'
            element = {
                <ProtectedRoute>
                    <Withdrawal/>
                    </ProtectedRoute>
              } />
  
          <Route path='/overview'
          element = {
            <ProtectedRoute>
                <AccountViewPage/>
                </ProtectedRoute>
          } />
           
          <Route path='overview/:exhibitions'
          element = {
            <ProtectedRoute>
                <Exhibitions/>
                </ProtectedRoute>
          } />
          
          <Route path='/deposit' 
          element = {
            <ProtectedRoute>
                <DepositViewPage/>
                </ProtectedRoute>
          } />
        
          <Route path='/change-password' 
           element = {
            <ProtectedRoute>
            <ChangePassword/>
            </ProtectedRoute>
          } />
          
          <Route path='/edit-profile' 
          element = {
                <ProtectedRoute>
                  <EditProfile/>
                </ProtectedRoute>
          } />
          <Route path='/reset'
          element = {
                <NewPassword/>
          } />
           {/* <Route path='/loading'
          element = {
                <RouteLoadingPage/>
          } /> */}

        </Routes>
        </section>
        </Fragment>
        </div>
    )
} 

export default Main_Component


{/* <Route path='/home' Component={HomePage}/>
          <Route path='/' Component={RenderPage}/>
           <Route path='/register' Component={AuthRegister}/>
          <Route path='/login' Component={AuthLogin}/>
          <Route path ='/test' Component={Testing}/>
          <Route path ='/step' Component={MultiStep}/>
          <Route path ='/stepper' Component={StepComponent}/>
          <Route path = '/switch' Component={SwitchResult}/> */}