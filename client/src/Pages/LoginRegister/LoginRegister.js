import React, { useRef, useState } from "react";
import "./LoginRegister.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


function LoginRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  
  const emailRef = useRef()
    const passwordRef = useRef()

const navigate=useNavigate()
  

  //<---------------switch panel implementation---------------------->//

  function switchContent() {
    const content = document.getElementById("content");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    registerBtn.addEventListener("click", () => {
      content.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
      content.classList.remove("active");
    });
  }


  const Validate=(email)=>{

    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email)

}
 //<---------------Register function---------------------->//


  const handleRegister = async (e) => {
    e.preventDefault();

if(!name){
return toast.warn('Name is required')
}else if(!Validate(email)){
  return toast.warn('Invalid email format')
}else if(password.length<=5){
  return toast.warn('Password must be at least 6 characters long')
}else if(!company){
  return toast.warn('Company name required')
}
    try {
      const response = await axios.post("http://localhost:8800/users", {
        name,email,password,company,
      });
      response.data && toast.success('Login Successful')
    } catch (error){
      console.log(error);
    }
 
  };


//<---------------login function---------------------->//

const handleLogin=async(e)=>{
  e.preventDefault();

 if(!emailRef){
    return toast.warn('Invalid email format')
  }else if(passwordRef.length<=5){
    return toast.warn('Password must be at least 6 characters long')
  }

 try{
  const response = await axios.post('http://localhost:8800/login', {email:emailRef.current.value,password:passwordRef.current.value });
  const { token, user } = response.data;

  if (token) {
    localStorage.setItem('token', token); 
    localStorage.setItem('userData', JSON.stringify(user));
    toast.success('Login Successful');
    navigate('/home');
  } else {
    toast.error('Login failed. Please try again.');
  }
} catch (error) {
  toast.error('An error occurred during login.');
  console.error(error);
}}



  return (
    <div className="landingpage d-flex justify-content-center align-items-center">
      <div className="content justify-content-center align-items-center d-flex shadow-lg"
        id="content"
      >
        {/*--------------------------register form-----------------*/}
  
        <div className="col-md-6 d-flex justify-content-center left-box">
          <form onSubmit={handleRegister}>
            <div className="header-text mb-3">
              <h1>Create Account</h1>
            </div>
            <div className="input-group mb-2">
              <input
                type="text"
                placeholder="Name"
                className="form-control form-control-lg bg-light fs-6"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group mb-2">
              <input
                type="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control form-control-lg bg-light fs-6"
              />
            </div>
            <div className="input-group mb-2">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control form-control-lg bg-light fs-6"
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="form-control form-control-lg bg-light fs-6"
              />
            </div>
            <div className="input-group mt-3 d-flex justify-content-center">
              <button
                type="submit"
                className="btn border-white text-white w-50 fs-6"
              >
                Register
              </button>
            </div>
          </form>
        </div>
  
        {/*--------------------------Login form-----------------*/}
  
        <div className="col-md-6 right-box">
          <form onSubmit={handleLogin}>
            <div className="header-text mb-4">
              <h1>Login Here</h1>
            </div>
  
            <div className="input-group mb-3">
              <input
                type="email"
                placeholder="Email"
                ref={emailRef}
                className="form-control form-control-lg bg-light fs-6"
              />
            </div>
  
            <div className="input-group mb-3">
              <input
                type="password"
                placeholder="Password"
                ref={passwordRef}
                className="form-control form-control-lg bg-light fs-6"
              />
            </div>
  
            <div className="input-group mb-5 d-flex justify-content-center">
              <button
                type="submit"
                className="btn border-white text-white w-50 fs-6"
              >
                Login
              </button>
            </div>
          </form>
        </div>
  
        {/*--------------------------switch panel-----------------*/}
  
        <div className="switch-content">
          <div className="switch">
            <div className="switch-panel switch-left">
              <h1>Hello Again</h1>
              <p>We are happy to see you back</p>
              <button
                className="hidden btn border-white text-white w-50 fs-6"
                id="login"
                onClick={switchContent}
              >
                Login
              </button>
            </div>
            <div className="switch-panel switch-right">
              <h1>Welcome</h1>
              <p>Join Our unique platform , Explore a New Experience</p>
              <button
                className="hidden btn border-white text-white w-50 fs-6"
                id="register"
                onClick={switchContent}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>


      <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>

    </div>
  );
}

export default LoginRegister;
