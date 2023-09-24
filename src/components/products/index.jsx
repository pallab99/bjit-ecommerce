import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './cards';
import Loader from './../loader';
export default function Index() {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchProductData();
  }, []);
  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://fakestoreapi.com/products');
      setProductData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };
  return isLoading ? <Loader /> : <Card data={productData}></Card>;
}
