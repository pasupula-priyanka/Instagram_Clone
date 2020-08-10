import React,{useContext} from "react";
import {Link,useHistory} from "react-router-dom";
import {UserContext} from "./App"
function Navbar(){
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  const renderList = () =>{
     if(state){
       return[
      
      <li key='2'><Link to="/profile">profile</Link></li>,
      <li key='3'><Link to="/create">create post</Link></li>,
      <li key="4"><Link to="/myfollowingpost">My following post</Link></li>,
      <li>
      <button className="btn mask waves-effect waves-light #2196f3 blue" 
       onClick={()=>{
         localStorage.clear()
         dispatch({type:"CLEAR"})
         history.push('/signin')
       }}>
               LOGOUT
              </button>
      </li>
       ]
     }else{
       return[
      <li><Link to="/signin">SIGNIN</Link></li>,
        <li><Link to="/signup">SIGN-UP</Link></li>
       ]
     }
  }
    return(
        <nav>
    <div className="nav-wrapper white" style={{color:"black"}}>
      <Link to={state?"/":"/signin"}  className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
        </ul>
    </div>
  </nav>
    )
}
export default Navbar;