import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useData } from '../contexts/DataContext';
import { useAuth } from "../contexts/AuthContext";
import AuthenticationModal from "./LoginModal";
import axios from "axios";

const DesignDetail = () => {

  const {user}= useAuth();
  const { designData,setCartData } = useData();
  const [showModal, setShowModal]= useState(false)
  console.log("dataaaas", designData);
  const navigate= useNavigate()
  if (!designData) {
    return <p>Loading...</p>;
  }
  const secureurl = designData.file.secure_url;
  console.log("secfds",secureurl);
  const handleCartAdd= async()=>{
    if (user) {
      const newItem = {
        image: secureurl,
        name: designData.name,
        price: designData.price,
      };
      setShowModal(false)

      console.log("user is here you can shop");
      console.log("showmodal is",showModal);
      setCartData((prevCartData) => [...prevCartData, newItem]);
      const id=user.userId
      try {
        await axios.post(`http://localhost:5000/cart/addCart`,{id, newItem}).then((res)=>{
              console.log("success");
        }).catch((err)=>{
          console.log(err);
          console.log("error add occured");
        })
      } catch (error) {
        console.log(error);
        
      }
      
    }else{
      setShowModal(true);
      console.log("user is not here you can not shop");
      console.log("showmodal is",showModal);
    }
    console.log("cart adds");
  }

  const handleModalOpen = () => {
    console.log("Modal opened from DesignDetail");
  };
  const image=designData.file.secure_url;
  console.log("images",image);
  // console.log("from details",designData);
  const handleClose = () => {
    console.log("close Clicked");
    navigate('/')
  };
  const toggleModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex  my-10 px-3  justify-between sm:justify-center">
    <div className="sm:w-5/6 w-full h-auto lg:h-[450px] my-5 rounded-xl flex justify-center   relative border-2 border-solid">
      <button
        className="absolute right-0  w-10 h-10  text-red-600 hover:text-red-900 rounded-full top-0"
        onClick={handleClose}
      >
        X
      </button>
      <div className="flex bg-gray-200  flex-col justify-between lg:flex-row gap-6 w-full ">
    <div className="flex w-full  lg:w-1/2 justify-center items-center">
          <img
            src={image}
            alt="images"
            className="flex justify-center shadow-lg rounded-l-lg h-full w-full"
          />
        </div>
        <div className="w-full py-4 px-3 lg:w-1/2 h-full flex flex-col gap-7 lg:gap-3">
          <div className=" w-full flex flex-col gap-5 items-center h-5/6">
          <h1 className="text-xl sm:text-2xl py-5  w-1/2  flex justify-center items-center h-1/6 font-bold">{designData.name}</h1>
          <p className="flex w-full h-auto md:h-4/6 text-lg"> {designData.desc}</p>
          <p className="w-full text-gray-800 font-light h-1/6">{designData.price} birr</p>
          </div>
        <div className="flex justify-center items-center">
        <button onClick={handleCartAdd} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" 
        className=" align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-light-blue-200  hover:shadow-light-blue-400 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-light-blue-100  text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
  Add to Cart
</button>
                 {showModal && <AuthenticationModal onClose={toggleModal}/>}
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DesignDetail;