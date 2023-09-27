import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  const fetchData = async (url) => {
    try {
      console.log("ffff", url);
      setIsLoading(true);
      const res = await axios.get(url);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { data, isLoading };
};

export default useFetchData;
