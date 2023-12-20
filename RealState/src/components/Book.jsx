import React from "react";
import { useData } from "../contexts/DataContext";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";


const Book = ({ book , onAdd, onshow}) => {
  const {user}=useAuth()
  const { setCartData}= useData();

  if (book.file.public_id) {
    console.log("book is defined");
  } else {
    console.error("Invalid book is not defined structure:", book);
  }

  if (
    !book.file ||
    typeof book.file !== "object" ||
    !book.file.public_id
  ) {
    console.error("Invalid gallery file structure:", book.file);
    return null;
  }
    // Extracting the secure_url from gallery.file
    const secureurl = book.file.secure_url;
    // console.log("public hghbjn", secureurl);
    const handleCartAdd = async() => {
      if(user){
        const newItem = {
          image: secureurl,
          name: book.name,
          price: book.price,
        };
        // Use the spread operator to create a new array with the existing cart items and add the new item
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
          
        }
      }else{
        onshow();
        console.log("login first");
      }
    };
 
  return (
    <div className="relative h-[400px] mx-2 sm:h-auto flex w-full sm:w-[230px] lg:w-[300px] flex-col text-gray-700 bg-gray-200 shadow-md bg-clip-border rounded-xl">
      <div className="relative mx-4 mt-4 w-auto h-56 sm:h-64 overflow-hidden text-gray-700 bg-gray-200 bg-clip-border rounded-xl">
        <img
          src={secureurl}
          alt="card-image"
          className="object-cover w-full h-full"
          onError={(e) => console.error("Image failed to load", e)}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            {book.name}
          </p>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-800">
            {book.price
            }{" "}birr
          </p>
        </div>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
          {book.description}
        </p>
      </div>
      <div className="p-6 pt-0">
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-light-blue-200  hover:shadow-light-blue-400 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-light-blue-100  text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          type="button"
          onClick={handleCartAdd}
        >
          Add to Cart
        </button>
       
      </div>
    </div>
  );
};

export default Book;
