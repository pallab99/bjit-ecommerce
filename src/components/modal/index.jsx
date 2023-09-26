/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./index.scss";
import { Modal } from "antd";
import axios from "axios";
import Loader from "./../loader";

const Index = ({ modalVisible, handleCancel, index }) => {
  const [productData, setProductData] = useState({});
  const [productRating, setProductRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchProductData();
  }, [index]);
  const fetchProductData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://fakestoreapi.com/products/${index + 1}`
      );
      setProductData(response.data);
      setProductRating(response.data.rating.rate);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <Modal open={modalVisible} closable onCancel={handleCancel}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="card-image">
            <img src={productData.image} alt={productData.title} />
          </div>
          <div className="card-text">
            <p className="price">Price : ${productData.price}</p>
            <p className="rating">Category : {productData.category}</p>
            <p className="rating">Rating : {productRating}</p>

            <h2 className="prod-title">{productData.title}</h2>
            <p className="prod-description">{productData.description}</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Index;