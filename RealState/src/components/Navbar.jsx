import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs } from "@material-tailwind/react";
import { FaCartPlus } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const Navbar2 = ({ activetab }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    console.log("typess", typeof activetab);
    activetab("cart");
    console.log("cart is clicked");
  };
  const handleLogin = () => {
    navigate("/loginForm");
    console.log("login clicked");
    activetab("login");
  };
  const handleSignUp = () => {
    navigate("/signUpForm");
    activetab("signup");
  };

  const handleActiveTabHome = () => {
    activetab("home");
    console.log("nav 2 tab in home");
  };
  const handleActiveTabBook = () => {
    activetab("book");
    console.log("nav 2 tab in book");
  };
  const handleActiveTabDesign = () => {
    activetab("design");
    console.log("nav 2 tab in design ");
  };

  return (
    <div className="flex bg-blue-gray-400 justify-between w-full">
      <div className="hidden  md:flex justify-between  w-full">
        <Tabs
          className="md:w-1/2 hidden md:flex md:justify-evenly md:items-center py-4 px-2"
          value="home"
        >
          <Link to="/" duration={500}>
            <div
              className="hover:border-b-2 hover:shadow-md cursor-pointer hover:border-gray-800"
              onClick={handleActiveTabHome}
            >
              Home
            </div>
          </Link>
          <Link to="/designs" duration={500}>
            <div
              className="hover:border-b-2 cursor-pointer hover:border-gray-800"
              onClick={handleActiveTabDesign}
            >
              Design
            </div>
          </Link>
          <Link to="/books" duration={500}>
            <div
              className="hover:border-b-2 cursor-pointer hover:border-gray-800"
              onClick={handleActiveTabBook}
            >
              Books
            </div>
          </Link>
        </Tabs>
        <div className="flex justify-start gap-6 lg:justify-end items-center px-5 w-1/2">
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
            <>
              <button
                className=" w-28 text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                 className=" w-28 text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                 onClick={handleSignUp}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
