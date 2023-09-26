import Navbar from './../../components/navbar';
import Product from './../../components/products';
import Footer from './../../components/footer';
import { ProductContext } from '../../productContext';
import { ThemeContext } from '../../themeContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../../cartContext';
function Index() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('https://fakestoreapi.com/products');
      setProducts(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [darkTheme, setDarkTheme] = useState(false);
  const toogleTheme = () => {
    setDarkTheme((prev) => !prev);
  };
  return (
    <>
      <ThemeContext.Provider value={{ darkTheme }}>
        {/* <button onClick={toogleTheme}>toogle theme</button> */}
        <ProductContext.Provider value={{ products, isLoading }}>
          <CartContext.Provider value={{ cartItems, setCartItems }}>
            <Navbar></Navbar>
            <Product></Product>
            <Footer></Footer>
          </CartContext.Provider>
        </ProductContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default Index;
