import { useState, useEffect } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  const fetchData = async (url) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const resData = await response.json();
      setData(resData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return { data, isLoading };
};

export default useFetchData;
