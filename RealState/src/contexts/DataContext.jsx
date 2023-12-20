import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [designData, setDesignData] = useState(null);
    const [cartData, setCartData] = useState([]);
    const [approvedCart, setApprovedCart]= useState(null);
  
    const setDesign = (data) => {
      setDesignData(data);
    };
    const setApproved=(data)=>{
      setApprovedCart(data)
    }
    const setCart=(data)=>{
      setCartData((prevCartData) => [...prevCartData, data]);
    }
  const value={
    designData, setDesign, cartData,setCartData, setCart,setApproved,approvedCart
  }
    return (
      <DataContext.Provider value={value}>
        {children}
      </DataContext.Provider>
    );
  };

export const useData = () => {
  return useContext(DataContext);
};
