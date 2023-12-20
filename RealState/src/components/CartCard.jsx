import React from "react";

const CartCard = ({item, onRemove}) => {

      const handleExit=()=>{
        console.log("exitted");
        onRemove(item);
      }
  return (
    <div className="rounded-lg  lg:w-2/3">
      <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img
          src={item.image}
          alt="product-image"
          className="w-full rounded-lg sm:w-40"
        />
        <div className="sm:ml-4  sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">
              {item.name}
            </h2>
            <p className="mt-1 text-xs text-gray-700">{item.price}</p>
          </div>
          <div className="mt-4  flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex w-full justify-between  sm:items-center sm:space-x-4">
              <p className="text-sm">{item.price}</p>
              <svg
                // xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                onClick={handleExit}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
