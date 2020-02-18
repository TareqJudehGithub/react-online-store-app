import React, {useState, useEffect, useRef} from 'react';
//styled component:

import { Route, Switch, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils"

import HomePage from "./pages/homepage/homepage.component";
import ShopPage  from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInandSingOut from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import CheckOutPage from "./pages/checkout/checkout.component";

//selectors:
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user.selectors";

//redux needed library
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions"

//spinner animation
import withSpinner from ".//components/with-spinner/with-spinner.component";

import './App.css';


const App = ({ CurrentUser, currentUser }) => {

//main menu spinner animation:
const HomePageWithSpinner = withSpinner(HomePage);
const [isLoading, setIsLoading ] = useState(true);
  
const persistDataOverRender = useRef({ willUnmount: false });
  useEffect(() => {
     auth.onAuthStateChanged(async userAuth => {
      persistDataOverRender.current.willUnmount = true;
      if (userAuth) {
        const userRef =  await createUserProfileDocument(userAuth);
        
        !persistDataOverRender.current.willUnmount &&
        userRef.onSnapshot(snapShot => {   
          CurrentUser({      
             id: snapShot.id,
             ...snapShot.data()        
          });   
        });
      }
        CurrentUser(userAuth);
    });
   
    setTimeout(() => {
        setIsLoading(false);
      }, 500)
  
  }, [CurrentUser])


    return (
      <div>
        <Header />
          <Switch> 
            <Route exact path="/"
            render={(props) =>
            <HomePageWithSpinner isLoading={isLoading} {...props}/>}/>        
        
            <Route path="/shop" component={ShopPage}/>         
            <Route path="/checkout" component={CheckOutPage}/>
            <Route exact path="/signin" render={() =>
              currentUser
              ?
              (<Redirect to ="/"/>)
              :
              (<SignInandSingOut />)
              } />
         </Switch>   
      </div>
    );
}
const mapToStateProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  CurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapToStateProps, mapDispatchToProps)(App);
