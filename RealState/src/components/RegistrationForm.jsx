import React,{useState} from 'react'
import axios from 'axios'
import { useSnackbar } from "notistack";

const RegistrationForm = () => {
const [email, setEmail]= useState("")
const [password, setPassword]=useState("")
const [conformPassword, setConformPassword]= useState("");
const { enqueueSnackbar } = useSnackbar();

enqueueSnackbar("Registration successful", { variant: "success" });
        // enqueueSnackbar("Registration is Failed, Please try again", {
        //   variant: "error",
        // });


const handleRegister=async(event)=>{
      event.preventDefault();

      try {

        await axios.post("http://localhost:5000/user/register", {email, password}).then((res)=>{
          console.log("registered", res);
        }).catch((error)=>{
          console.log("error happened");
          console.log(error.message);
        })
        
      } catch (error) {
        
      }
      console.log("registering");
      console.log(password);
      console.log(email);
      console.log(conformPassword);

}
const handleEmailChange=(e)=>{
      setEmail(e.target.value)
}
const handlePasswordChange=(e)=>{
    setPassword(e.target.value)
}
const handleConformPasswordChange=(e)=>{
      setConformPassword(e.target.value)
}

  return (
    <div className='w-full'>
<form className="max-w-xl bg-blue-gray-100 py-10 px-10 rounded-lg mx-auto" >
  <div className='flex justify-center'>
  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Registration page</h1>
  </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}
     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@gmail.com" required />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}
     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='***********' required />
  </div>
  <div className="mb-5">
    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
    <input type="password" id="repeat-password" value={conformPassword} onChange={(e)=>setConformPassword(e.target.value)}
     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='***********' required />
  </div>
  
  <button type="submit" onClick={handleRegister}
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
</form>
    </div>
  )
}

export default RegistrationForm