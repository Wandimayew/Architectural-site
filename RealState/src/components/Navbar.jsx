import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs } from "@material-tailwind/react";
import { FaCartPlus } from "react-icons/fa";

const Navbar = () => {
  const navigate=useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);

  };
  const handleCart=()=>{
    navigate("/cart")
console.log("cart is clicked");
  }

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <div className="flex bg-white shadow-lg rounded-lg  justify-between w-full xl:w-3/4">
      <div className="hidden  md:flex  w-full">
        <Tabs
          className="md:flex-1 hidden md:flex md:justify-evenly md:items-center py-4 px-2"
          value="home" // Set a default or dynamic value here
        >
          <Link to="/"  duration={500}>
            <div className="hover:border-b-2 hover:shadow-md cursor-pointer hover:border-gray-800">
              Home
            </div>
          </Link>
          <Link to="/designs"  duration={500}>
            <div className="hover:border-b-2 cursor-pointer hover:border-gray-800">
              Design
            </div>
          </Link>
          <Link to="/books"  duration={500}>
            <div className="hover:border-b-2 cursor-pointer hover:border-gray-800">
              Books
            </div>
          </Link>
          <Link to="/contact"  duration={500}>
            <div className="hover:border-b-2 cursor-pointer hover:border-gray-800">
              Contact
            </div>
          </Link>
        </Tabs>
        <div className="flex justify-start gap-6 lg:justify-evenly items-center px-5 w-2/5">
          <FaCartPlus size={30} className="cursor-pointer"
          onClick={handleCart}/>
          <button className='border-2 shadow-md w-28 py-2 px-4 border-solid rounded-full  h-fit'>Login</button>
          <button className='border-2 shadow-md w-28 py-2 px-4 border-solid rounded-full  h-fit'>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
