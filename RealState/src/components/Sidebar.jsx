import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IoHomeOutline,
  IoHome,
  IoHomeSharp,
} from "react-icons/io5";

import { IoMenu } from "react-icons/io5";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

const Sidebar = () => {

  const navigate=useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState(false);
  useEffect(() => {
    if (user === null) {
      setUsers(false);
    } else {
      setUsers(true);
    }
  }, [user]);
  const handleCart = () => {
    navigate("/cart");
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogin=()=>{
    navigate("/loginForm")
  }
  const handleSignUp=()=>{
    navigate("/signUpForm")
  }
  return (
    <>
      <div className="flex-1 -z-50 h-12 items-center justify-between flex md:hidden">
        <button className=" z-50 bg-gray-800"  onClick={handleMenuOpen}>
          <IoMenu size={20} className="text-white"/>
        </button>
        <div
          className={`fixed bg-gray-800 w-full sm:w-1/3 md:w-1/2  text-white font-bold text-xl z-10 top-0 h-full left-0 ease-in-out transform duration-500 transition-transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {isMenuOpen && (
            <div className="relative">
              <button
                className="absolute top-0 right-2"
                onClick={handleMenuOpen}
              >
                X
              </button>
              <div className="flex flex-col w-full justify-center py-4 pt-10 items-center  gap-8">
                <Link
                  to="/"
                  className="hover:border-b-2 cursor-pointer text-sm w-1/2 flex gap-2 justify-center items-center  hover:border-gray-800"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <IoHome size={15} />
                  <p>Home</p>
                </Link>
                <Link
                  to="/designs"
                  className="hover:border-b-2 flex gap-2 text-sm  justify-center items-center cursor-pointer hover:border-gray-800"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <IoHomeOutline size={15} />
                  <p>Design</p>
                </Link>
                <Link
                  to="/books"
                  className="hover:border-b-2 cursor-pointer text-sm  flex gap-2 justify-center items-center hover:border-gray-800"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <IoHomeSharp size={15} />
                  <p>Books</p>
                </Link>

              </div>
            </div>
          )}
        </div>
        <div className="flex w-full justify-between lg:gap-6 lg:justify-end items-center px-5 md:w-1/2">
          {users ? (
            <>
              <FaCartPlus
                size={30}
                className="cursor-pointer"
                onClick={handleCart}
              />
              <div className="flex justify-between w-1/3 pr-10">
                <p>Logo</p>
                <p>Name</p>
              </div>
            </>
          ) : (
            <div className="w-full flex justify-between gap-3">
              <button
                className="w-28 text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-full text-xs sm:text-sm px-2 md:px-5 py-1 md:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                 className=" w-28 text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-full text-xs sm:text-sm px-2 md:px-5 py-1 md:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                 onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
