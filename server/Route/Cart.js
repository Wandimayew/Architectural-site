import express from 'express'
import {cartAdd, getCart,removeCart, approveCarts,cartCheckOut} from '../Controller/Cart.js'


const cartRoute=express.Router();

cartRoute.post("/addCart", cartAdd)
cartRoute.get("/getCart/:id", getCart);
cartRoute.delete("/deleteCart/:id",removeCart)
cartRoute.get("/approveCart", approveCarts)
cartRoute.put("/cartCheckout/:id", cartCheckOut)

export default cartRoute;