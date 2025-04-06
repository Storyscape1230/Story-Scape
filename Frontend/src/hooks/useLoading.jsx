import { useState, useEffect } from 'react';

const useLoading = (initialState = true, delay = 2000) => {
  const [isLoading, setIsLoading] = useState(initialState);

  useEffect(() => {
    if (initialState) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [initialState, delay]);

  return isLoading;
};

export default useLoading; 