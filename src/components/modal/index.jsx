/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

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
import { useNavigate } from "react-router-dom";

const Index = ({ modalVisible, handleCancel, index }) => {
  console.log("index", index);
  const URL = `http://localhost:8000/api/books/details/${index}`;
  const navigate = useNavigate();

  //! custom hook call
  const { data, isLoading } = useFetchData(URL);
  console.log("individual data", data?.data);

  //! cart context
  const notify = (msg) => toast.success(msg);

  const handleUpdateBook = () => {
    navigate(`/updateBook/${index}`);
  };
  const handleDeleteBook = (id) => {
    fetch(`http://localhost:8000/api/books/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Book deleted successfully");
          notify("Deleted Successfully");
          navigate("/");
          handleCancel();
        } else {
          notify("Something went wrong");
        }
      })
      .catch((error) => {
        console.log("Error occurred while deleting book:", error);
      });
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
            <p className="prod-description">{data?.data?.result.description}</p>
          </div>
          <div className="btn-div-update-dlt">
            <Button
              className={"add-to-cart-btn"}
              text={"Update book"}
              handleButtonClick={handleUpdateBook}
            ></Button>
            <Button
              className={"delete-btn"}
              text={"Delete book"}
              handleButtonClick={() => handleDeleteBook(data?.data?.result._id)}
            ></Button>
          </div>
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
      )}
    </Modal>
  );
};

export default Index;
