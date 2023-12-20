import React,{useState} from "react";
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useAuth} from '../contexts/AuthContext'

const AuthenticationModal = ({ onClose }) => {
  const [email, setEmail]= useState("")
  const [password, setPassword]=useState("")
  const {login , Token} =useAuth();
const navigate=useNavigate();
  const handleLogin=async(event)=>{
    event.preventDefault();
    try {
      const reponse= await axios.post("http://localhost:5000/user/login", {email, password}).then((res)=>{
        const {token, user}= res.data;
      console.log("logged", res.data);
      onClose();
      console.log("user is", user);
      login(user)
      Token(token);
      const role=user.role;
      console.log("roles",role);
      if(role === "admin"){
        navigate("/dashboard")
        console.log("yes it is admin");
      }else{
        navigate("/")
        console.log("no it is not admin");
      }
      console.log("token:", token);
      }).catch((error)=>{
        console.log("error happened");
        console.log(error.message);
      })
      
    } catch (error) {
      console.log(error);
      console.log("error to login");
      
    }
    console.log("loggining");
    console.log(password);
    console.log(email);
}

  return (
    <>
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 right-0 z-50 left-0 bottom-0 w-full h-full flex items-center justify-center"
      >
        <div className="bg-white p-8 max-w-md w-full mx-auto rounded-lg shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            X
          </button>
          <h3 className="text-2xl font-semibold mb-4">Sign in to your account</h3>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
              value={email}
                type="email"
                id="email"
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <button
              type="submit"

              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
      <div
        className="fixed top-0 right-0 left-0 bottom-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
    </>
  );
};

export default AuthenticationModal;