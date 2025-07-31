import React, { Fragment, useEffect} from "react"
import { BrowserRouter as Router } from 'react-router-dom';
import { Pop_upMain } from "../Component1/Pop_upContainer/Pop_upMain"
import { Register } from "../Component/AuthComponent/AuthRegister/Register"
import { Login } from "../Component/AuthComponent/AuthLogin/Login";
import userRegister from "../Component/AuthComponent/AuthRegister/UserRegister";
import { Provider } from "react-redux";
//  import store from "../Store/Store";
import NFT_store from "../Store/Store_NFT";
import HomePage from "../Component/AuthComponent/Helpers/HomePage";
import Main_Component from "../NewComponent/Render_page/Index";
import { setAuthtoken } from "../NewComponent/Helper/setAuthToken";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Load_User from "../NewComponent/Helper/loadUser";

function App() {  
    
  return (
    <Provider store={NFT_store}>
  <Router>
   <Main_Component/>
 </Router>
     </Provider>
  )
}
export default App
// export default connect()(App)




// <Fragment>
//           <Routes>
//           <Route exact path='/register' Component={userRegister}/>
//           <Route path='/login' Component={Login}/>
//           <Route path='/home' Component={HomePage}/>
//           <Route path='/' Component={RenderPage}/>
//            <Route path='/register' Component={AuthRegister}/>
//           <Route path='/login' Component={AuthLogin}/>
//           <Route path ='/test' Component={Testing}/>
//           <Route path ='/step' Component={MultiStep}/>
//           <Route path ='/stepper' Component={StepComponent}/>
//           <Route path = '/switch' Component={SwitchResult}/> 
//         </Routes>
//         </Fragment>