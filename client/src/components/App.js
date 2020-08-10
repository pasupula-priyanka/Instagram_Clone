import React,{useEffect,createContext,useReducer,useContext}from "react";
import Navbar from "./Navbar";
import {BrowserRouter,Route,Switch,useHistory} from "react-router-dom"
import "./App.css";
import Home from "../screens/home";
import Login from "../screens/signin";
import Profile from "../screens/profile";
import Signup from "../screens/signup";
import Createpost from "../screens/createpost";
import UserProfile from "../screens/userProfile";
import SubscribeUser from "../screens/subscribepost"
import {reducer,initialState} from "../Reducers/userReducer"
export const UserContext = createContext()
const Routing = ()=>{
    const history = useHistory()
    const{state,dispatch} = useContext(UserContext)
    useEffect(()=>{
       const user= JSON.parse(localStorage.getItem("user"))
       if(user){
          dispatch({type:"USER",payload:user})
           
       }
       else{
           history.push('/signin')
       }
    },[])
    return(
        <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/signup">
            <Signup />
        </Route>
        <Route path="/signin">
            <Login />
        </Route>
        <Route exact path="/profile">
            <Profile />
        </Route>
        <Route path="/create">
            <Createpost />
        </Route>
        <Route path="/profile/:userid">
            <UserProfile />
        </Route>
        <Route path="/myfollowingpost">
        <SubscribeUser />
      </Route>
        </Switch>
    )
}
function App(){
    const[state,dispatch] = useReducer(reducer,initialState)
    return (
        <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
        <Navbar />
        <Routing />
        </BrowserRouter>
        </UserContext.Provider>
    )
}
export default App;