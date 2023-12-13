import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useData } from '../contexts/DataContext';

const DesignDetail = () => {
  const { designData } = useData();
  const navigate= useNavigate()
  if (!designData) {
    return <p>Loading...</p>;
  }
  console.log("from details",designData);
  const handleClose = () => {
    console.log("close Clicked");
    navigate('/')
  };
  return (
    <div className="flex  px-3 justify-between sm:justify-center">
    <div className="sm:w-5/6 w-full h-auto lg:h-[450px] my-5 shadow-lg rounded-xl flex justify-center   relative border-2 border-solid">
      <button
        className="absolute right-1 w-10 h-10 bg-gray-600 text-white rounded-full top-0"
        onClick={handleClose}
      >
        X
      </button>
      <div className="flex  flex-col justify-between lg:flex-row gap-6 w-full ">
    <div className="flex w-full  lg:w-2/3 justify-center items-center">
          <img
            src={designData.image}
            alt="images"
            className="flex justify-center shadow-lg rounded-l-lg h-full w-full"
          />
        </div>
        <div className="w-full py-4 px-3 lg:w-1/2 h-full flex flex-col gap-7 lg:gap-3">
          <div className=" w-full flex flex-col gap-5 items-center h-5/6">
          <h1 className="text-xl py-5  shadow-lg w-1/2 rounded-b-lg flex justify-center items-center h-1/6 font-bold">{designData.name}</h1>
          <p className="flex w-full h-auto md:h-4/6 text-xl font-sans"> {designData.description}</p>
          <p className="w-full h-1/6">Price 300</p>
          </div>
        <div className="flex justify-center items-center">
          <button className="border-2 border-solid py-2 px-4 rounded-xl shadow-lg">Add to Cart</button>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DesignDetail;
