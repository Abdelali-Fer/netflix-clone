import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login,logout, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const [singState,setSignState]=useState("Sign In");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);

  const user_auth = async (event)=>{
    event.preventDefault();
    setLoading(true);
    if(singState==="Sign In"){
      await login(email,password);
    }else{
      await signup(name,email,password);
    }
    setLoading(false);
  }
  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h2>{singState}</h2>
        <form>
        {singState==="Sign Up"? <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Your name'/>:<></>   }
          
          <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='exemple@domain.com'/>
          <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password'/>
          <button onClick={user_auth} type='submit'>{singState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox"/>
              <label htmlFor="">remember me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
        {singState==="Sign In"?<p>New in Netflix? <span onClick={()=>{
          setSignState("Sign Up")
        }}>Sign Up  Now</span></p>:<p>Alredy have an account? <span onClick={()=>{
          setSignState("Sign In")
        }}> Sign In Now</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login