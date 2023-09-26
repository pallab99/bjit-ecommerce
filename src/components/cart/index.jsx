import axios from 'axios';
import { useEffect, useState } from 'react';
import './index.scss';
const Index = () => {
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
    }
  };
  const cartItems = localStorage.getItem('cartItems');
  console.log(productData);
  let newCartItems = [];
  productData.forEach((item) => {
    if (cartItems.includes(item.id)) {
      newCartItems.push(item);
    }
  });
  console.log('gggg', newCartItems);

  return (
    <>
      <div className="cart-container">
        {newCartItems.map((ele, index) => {
          return (
            <div className="cart-items" key={index}>
              <img src={ele.image} alt="" />
              <p>{ele.title}</p>
              <p>{ele.price}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Index;
