/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import "./index.scss";
import { Modal } from "antd";
import Loader from "./../loader";
import { CartContext } from "../../context/cartContext";
import Button from "./../button";
import useFetchData from "../../hooks/useApi";
const Index = ({ modalVisible, handleCancel, index }) => {
  const URL = `https://fakestoreapi.com/products/${index + 1}`;
  //! custom hook call
  const { data, isLoading } = useFetchData(URL);
  //! cart context
  const { setCartItems } = useContext(CartContext);

  const addToCart = () => {
    setCartItems((prev) => [...prev, data]);
  };
  return (
    <Modal open={modalVisible} closable onCancel={handleCancel}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="card-image">
            <img src={data.image} alt={data.title} />
          </div>
          <div className="card-text">
            <p className="price">Price : ${data.price}</p>
            <p className="rating">Category : {data.category}</p>
            <h2 className="prod-title">{data.title}</h2>
            <p className="prod-description">{data.description}</p>
          </div>
          <div className="btn-div">
            <Button
              className={"add-to-cart-btn"}
              text={"add-to-cart"}
              handleButtonClick={addToCart}
            ></Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Index;
