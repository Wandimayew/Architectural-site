import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApprovedCard from './ApprovedCard';

const ApprovedCarts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [details, setDetails]=useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartItems = await axios.get(`http://localhost:5000/cart/approveCart`);
        const cartData = cartItems.data.aprovedcart;

        // Create a map to group items by user
        const groupedDataMap = new Map();

        // Fetch user details for each cart item
        await Promise.all(
          cartData.map(async (cartItem) => {
            const userId = cartItem.user;
            console.log("uses id",userId);
            const userResponse = await axios.get(`http://localhost:5000/user/getUserById/${userId}`);
            console.log("response for use",userResponse);
            const user = userResponse.data;

            if (!groupedDataMap.has(userId)) {
              groupedDataMap.set(userId, { user, items: [cartItem] });
            } else {
              groupedDataMap.get(userId).items.push(cartItem);
            }
          })
        );

        const groupedData = Array.from(groupedDataMap.values());
        setData(groupedData);
        console.log("grouepd data",groupedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Error fetching approved carts. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleDetail=()=>{
setDetails(!details)
    console.log("it is clicked");
  }

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className='p-5'>
          {data.map((userGroup, groupIndex) => (
            <div className='flex justify-between border-2 m-5 gap-3' key={groupIndex}>
              <h3 onClick={handleDetail} className='cursor-pointer px-3'><strong>
                User Email
                </strong>
                  <p>
                {userGroup.user.user.email}
                </p> 
                </h3>
              {
                details && 
                (
                  <div className='w-3/5 py-3'>
              <div>
                {userGroup.items.map((cartItem, cartIndex) => (
                  <ApprovedCard key={cartIndex} item={cartItem} index={cartIndex} />
                ))}
              </div>
              <h2>$ {userGroup.user.totalPrice} Total Prices</h2>
                  </div>
                )
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovedCarts;
