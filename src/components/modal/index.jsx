/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./index.scss";
import { Modal } from "antd";
import Loader from "./../loader";
import { CartContext } from "../../context/cartContext";
import Button from "./../button";
// import useFetchData from "../../hooks/useApi";
import useFetchData from "../../hooks/useApiFetch";

const Index = ({ modalVisible, handleCancel, index }) => {
  console.log("index", index);
  const URL = `http://localhost:8000/api/books/details/${index}`;

  //! custom hook call
  const { data, isLoading } = useFetchData(URL);
  console.log("individual data", data?.data);

  //! cart context
  const { setCartItems } = useContext(CartContext);
  const notify = () => toast.success("Added to the cart");

  const addToCart = () => {
    setCartItems((prev) => [...prev, data]);
    notify();
  };

  return (
    <Modal open={modalVisible} closable onCancel={handleCancel}>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="card-image">
            <img
              src="https://qph.cf2.quoracdn.net/main-qimg-880a65f86b1d5d73a962ee2520459af7-lq"
              alt={data.title}
            />
          </div>
          <div className="card-text">
            <p className="price">Price : ${data?.data?.result.price}</p>
            <p className="rating">Category : {data?.data?.result.category}</p>
            <h2 className="prod-title">{data?.data?.result.title}</h2>
            {/* <p className="prod-description">{data.description}</p> */}
          </div>
          <div className="btn-div">
            <Button
              className={"add-to-cart-btn"}
              text={"add-to-cart"}
              handleButtonClick={addToCart}
            ></Button>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              pauseOnHover
              theme="colored"
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Index;
