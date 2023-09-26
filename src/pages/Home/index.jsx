import Navbar from './../../components/navbar';
import Product from './../../components/products';
import Footer from './../../components/footer';
import { ProductContext } from '../../productContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Index() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('https://fakestoreapi.com/products');
      setCartItems(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  console.log('loading', isLoading);
  return (
    <>
      <ProductContext.Provider value={{ cartItems, isLoading }}>
        <Navbar></Navbar>
        <Product></Product>
        <Footer></Footer>
      </ProductContext.Provider>
    </>
  );
}

export default Index;
