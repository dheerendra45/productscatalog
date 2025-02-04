
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductService } from '../services/api';

const AvailabilityContext = createContext();

export const AvailabilityProvider = ({ children }) => {
  const [availabilities, setAvailabilities] = useState({});
  const [isChecking, setIsChecking] = useState(false);

  const checkAvailability = async (productIds) => {
    setIsChecking(true);
    try {
      const results = await ProductService.batchCheckAvailability(productIds);
      const availabilityMap = results.reduce((acc, item) => {
        acc[item.id] = {
          inStock: item.inStock,
          stock: item.stock
        };
        return acc;
      }, {});
      setAvailabilities(availabilityMap);
    } catch (error) {
      console.error('Batch availability check failed:', error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <AvailabilityContext.Provider value={{ 
      availabilities, 
      checkAvailability, 
      isChecking 
    }}>
      {children}
    </AvailabilityContext.Provider>
  );
};

export const useAvailability = () => useContext(AvailabilityContext);