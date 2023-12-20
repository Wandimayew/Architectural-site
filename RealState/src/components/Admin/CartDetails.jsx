import React, { useEffect, useState } from "react";
import axios from "axios";

const CartDetails = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user details
        const userResponse = await axios.get(`http://localhost:5000/user/getUserById/${userId}`);
        setUser(userResponse.data.data);

        // Fetch items associated with the user
        const itemsResponse = await axios.get(`http://localhost:5000/cart/getCartByUser/${userId}`);
        setItems(itemsResponse.data.cart);
      } catch (error) {
        console.error("Error fetching user or items:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="flex flex-col gap-5">
      <h1>User Details and Associated Items</h1>
      {user && (
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <p>Detail users</p>
            <p>Email: {user.email}</p>
          </div>
          <div className="flex flex-col items-center">
            {items.length > 0 && (
              <div>
                <p>Associated items:</p>
                <ul>
                  {items.map((item) => (
                    <li key={item._id}>
                      <p>Name: {item.name}</p>
                      <p>Price: {item.price}</p>
                      <p>Image: {item.image}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CartDetails;