import React, { useEffect,useState } from "react";
import CartCard from "./CartCard";
import { useData } from "../contexts/DataContext";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Cart = () => {
  const { user } = useAuth();
  const { setCartData, cartData } = useData([]);
  console.log("userewjfb",user);
  const id=user.userId
  console.log("usr id is", id);
  
  const [subtotal, setSubtotal] = useState(0);
  const handleCheckOut = async () => {
    try {
      // Send a request to the server to update the cart items as approved
      const response = await axios.put(
        `http://localhost:5000/cart/cartCheckout/${id}`
      );
      console.log("the out put is",response);
      // Check the response for success and update the cart data if needed
      if (response.status === 200) {
        setCartData([]); // Clear the cart after successful checkout
        console.log("Checkout successful");
      } else {
        console.log("Checkout failed");
      }
    } catch (error) {
      console.error("Error during checkout", error);
    }
  };
  useEffect(() => {
    const handleGetCart = async () => {
      try {
        const cartItems = await axios.get(
          `http://localhost:5000/cart/getCart/${id}`
        );
        console.log("check out approval");
        setCartData(cartItems.data.cart);

        // Calculate subtotal when cart data is updated
        const calculatedSubtotal = cartItems.data.cart.reduce(
          (acc, item) => acc + item.price,
          0
        );
        setSubtotal(calculatedSubtotal);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetCart();
  }, [id, setCartData]);

  const onRemoveItem = async (itemToRemove) => {
    try {
      const idToRemove = itemToRemove._id;
      const cartItems = await axios.delete(
        `http://localhost:5000/cart/deleteCart/${idToRemove}`
      );
      console.log("check out approval", cartItems);

      // Calculate subtotal after removing an item
      const updatedCart = cartData.filter((item) => item !== itemToRemove);
      const calculatedSubtotal = updatedCart.reduce(
        (acc, item) => acc + item.price,
        0
      );
      setSubtotal(calculatedSubtotal);

      setCartData(updatedCart);
    } catch (error) {
      console.log(error);
    }
  };
  const total = subtotal;
  // console.log("hujhbuisdf", cartData);
  return (
    <div>
      <div className="h-auto bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 lg:flex md:space-x-4 lg:space-x-6 xl:px-0">
          <div className="rounded-lg w-full lg:w-2/3">
            {cartData.map((item, index) => (
              <CartCard key={index} item={item} onRemove={onRemoveItem} />
            ))}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 lg:w-1/3">
            <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
          <p className="text-gray-700">${subtotal.toFixed(2)}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
              <p className="mb-1 text-lg font-bold">${total.toFixed(2)} USD</p>
              </div>
            </div>
            <button
              onClick={handleCheckOut}
              className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
