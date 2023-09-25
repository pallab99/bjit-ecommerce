/* eslint-disable react/prop-types */
import Card from "./cards";
import Loader from "./../loader";
// import { useEffect, useState } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Index() {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchProductData();
  }, []);
  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://fakestoreapi.com/products");
      setProductData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return isLoading ? <Loader /> : <Card data={productData}></Card>;
}
