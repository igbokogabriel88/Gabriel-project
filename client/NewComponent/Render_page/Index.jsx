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
import { setAuthtoken } from "../Helper/setAuthToken";


const Main_Component = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // const auth = useSelector(state => state.Auths)
    const path = location.pathname;
    const showDashboard = path.includes('/overview') ||
    path.includes('/withdrawal') || path.includes('/deposit') ||
    path.includes('/overview/:mint') ||
     path.includes('/change-password') ||
      path.includes('/edit-profile');
   
    // useEffect(() => {
    
    //   Load_User(dispatch, navigate);
    //   },[dispatch, navigate])


  
    console.log('modalOpens:', sidebarOpen)
    return (
        <div style={{display: 'flex', flexDirection: 'column',
            width: '340px', height: '615px', position: 'relative',
            overflow: 'hidden'
        }}>
     <Fragment>
        { showDashboard && <Dashboard 
        />}
         <SearchModal/>
        
        <section>
         <AlertPage/> 
          <Routes>
          <Route exact path='/' 
          element={<RenderPage/>} />
          <Route path='/home/:selected'
           element={<RenderPage/>}/>

          <Route path='/login' 
          element={
            <ModalComponent/>
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