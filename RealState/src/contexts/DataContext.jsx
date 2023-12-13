import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [designData, setDesignData] = useState(null);
  
    const setDesign = (data) => {
      setDesignData(data);
    };
  
    return (
      <DataContext.Provider value={{ designData, setDesign }}>
        {children}
      </DataContext.Provider>
    );
  };

export const useData = () => {
  return useContext(DataContext);
};
