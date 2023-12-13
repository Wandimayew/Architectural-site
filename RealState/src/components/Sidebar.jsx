import React from "react";
import { Link } from "react-router-dom";
import {
  IoHomeOutline,
  IoHome,
  IoHomeSharp,
  IoContractSharp,
} from "react-icons/io5";

import { IoMenu } from "react-icons/io5";
import { useState } from "react";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className="flex-1  z-50 h-12 items-center justify-between flex md:hidden">
        <button className=" z-50 bg-black"  onClick={handleMenuOpen}>
          <IoMenu size={20} className="text-white"/>
        </button>
        <div
          className={`fixed bg-gray-800 w-1/2 sm:w-3/5  text-white font-bold text-xl z-10 top-0 h-full left-0 ease-in-out transform duration-500 transition-transform ${
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
              <div className="flex flex-col  justify-center py-4 pt-10 items-center  gap-8">
                <Link
                  to="/homepage"
                  className="hover:border-b-2 cursor-pointer flex gap-2 justify-center items-center  hover:border-gray-800"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <IoHome size={20} />
                  <p>Home</p>
                </Link>
                <Link
                  to="/homepage/designs"
                  className="hover:border-b-2 flex gap-2 justify-center items-center cursor-pointer hover:border-gray-800"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <IoHomeOutline size={20} />
                  <p>Design</p>
                </Link>
                <Link
                  to="/homepage/books"
                  className="hover:border-b-2 cursor-pointer flex gap-2 justify-center items-center hover:border-gray-800"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <IoHomeSharp size={20} />
                  <p>Books</p>
                </Link>
                <Link
                  to="/homepage/contact"
                  className="hover:border-b-2 cursor-pointer flex gap-2 justify-center items-center hover:border-gray-800"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <IoContractSharp size={20} />
                  <p>Contact</p>
                </Link>
                <Link
                  to="chat"
                  className="hover:border-b-2 cursor-pointer flex gap-2 justify-center items-center hover:border-gray-800"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  <IoContractSharp size={20} />
                  <p>Chat Online</p>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="flex h-full  items-center justify-between px-4 w-1/2 sm:w-2/5 ">
          <p>Logo</p>
          <p>Name</p>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
