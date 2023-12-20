import express from 'express'
import { addUser, userLogin,getUserById } from '../Controller/User.js';

const userRoute=express.Router();

userRoute.post("/register",addUser)
userRoute.post("/login", userLogin)
userRoute.get("/getUserById/:userId",getUserById)



export default userRoute;