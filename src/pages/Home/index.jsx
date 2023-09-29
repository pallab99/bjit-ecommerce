import Navbar from "./../../components/navbar";
import Product from "./../../components/products";
import Footer from "./../../components/footer";
import { useState } from "react";
import { ProductContext } from "../../context/productContext";
import { CartContext } from "../../context/cartContext";
// import useFetchData from "../../hooks/useApi";
import useFetchData from "../../hooks/useApiFetch";

function Index() {
  const URL = "https://dummyjson.com/products";
  //! custom hook call
  const { data, isLoading } = useFetchData(URL);
  const [cartItems, setCartItems] = useState([]);

  return (
    <>
      <ProductContext.Provider value={{ data, isLoading }}>
        <CartContext.Provider value={{ cartItems, setCartItems }}>
          <Navbar></Navbar>
          <Product></Product>
          <Footer></Footer>
        </CartContext.Provider>
      </ProductContext.Provider>
    </>
  );
}

export default Index;
