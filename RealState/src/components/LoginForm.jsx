import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useAuth} from '../contexts/AuthContext'

const LoginForm = () => {
  const [email, setEmail]= useState("")
const [password, setPassword]=useState("")
const {login , Token} =useAuth();
const navigate=useNavigate();
// const [conformPassword, setConformPassword]= useState("");
  const handleLogin=async(event)=>{
    event.preventDefault();
    try {
      const reponse= await axios.post("http://localhost:5000/user/login", {email, password}).then((res)=>{
        const {token, user}= res.data;
      console.log("logged", res.data);
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
    // console.log(conformPassword);

}
  return (
    <section className=" py-4 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0">
      <div className="w-full bg-blue-gray-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}
                       className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                        placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <button type="submit" onClick={handleLogin}
                   className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                  <p className="text-sm font-light flex text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? 
                      <Link to="/signUpForm">
                      <a href='' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                      </Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default LoginForm