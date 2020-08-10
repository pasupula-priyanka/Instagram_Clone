import React,{useState,useContext} from "react";
import {Link,useHistory} from "react-router-dom";
import M from "materialize-css";
import {UserContext} from "../components/App"
function Signup(){
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory();
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
 
  
  const postData = () =>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html:"Invalid Email ID",classes:"#9c27b0 purple"})
      return
    }
    fetch("/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
         password,
         email
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: data.error,classes:"#9c27b0 purple"})
      }
      else{
        localStorage.setItem("jwt",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
        dispatch({type:"USER",payload:data.user})
        M.toast({html:"signed in successfully",classes:"#4caf50 green"});
        history.push('/')
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }
    return(
      <div>
          <div className="my-card">
              <div className="card auth-card input-field">
              <h2 className="login-heading">Instagram</h2>
              
              <input 
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
             
              <button className="btn mask waves-effect waves-light #2196f3 blue" 
              onClick={()=>postData()}>
               Signin
              </button>
              <h5><Link to="./login">New to Photogram?</Link></h5>
              </div>
           </div>
      </div>
    )
}

export default Signup;