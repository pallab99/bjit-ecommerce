/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./bookDetails.style.scss";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Loader from "../../../../components/atoms/loader";
import Button from "../../../../components/ui/button";
import Navbar from "../../../../components/navbar";
// import useDeleteBook from '../../hooks/useDeleteBook';
import BookApi from "../../../../api/BookApi";
import Cookies from "js-cookie";
import { isAdmin } from "../../../../helper/tokenAuthorizer";
import { ToastContainer, toast } from "react-toastify";
import { alertConfigs } from "../../../../utils/alertConfig";
const BookDetails = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const state = location.state;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      const res = isAdmin(token);
      if (res === true) {
        setAdmin(true);
      }
    }
    if (bookId) {
      getBookById(bookId);
    }
  }, [bookId]);

  const getBookById = async (id) => {
    try {
      setIsLoading(true);
      const response = await BookApi.getBookById(id);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const handleUpdateBook = () => {
    navigate(`/updateBook/${bookId}`);
  };

  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };

  const handleDeleteBook = async () => {
    try {
      const res = await BookApi.deleteBookById(bookId);
      showAlert(res.data);
    } catch (error) {
      console.log("error", error.response);
      showAlert(error.response);
    }
  };
  const [deleteClicked, setDeleteClicked] = useState(false);
  const handleDelete = () => {
    setDeleteClicked(!deleteClicked);
  };
  const [images] = useState([
    {
      url: "https://www.electronickits.com/wp-content/uploads/2015/02/products-EFDNEW-e1423809441405.jpg",
    },
    {
      url: "https://target.scene7.com/is/image/Target/GUEST_ba3fbb9a-daf5-4c17-8e62-3ba620852fb6?wid=488&hei=488&fmt=pjpeg",
    },
    {
      url: "https://qph.cf2.quoracdn.net/main-qimg-880a65f86b1d5d73a962ee2520459af7-lq",
    },
  ]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar></Navbar>
          <div className="book-details">
            <div className="book-details-img-div">
              {images.map((ele, index) => {
                return <img key={index} src={ele.url} alt="" />;
              })}
            </div>
            <div className="details-description">
              <h2>Title : {state?.title}</h2>
              <h4>Author: {state?.author}</h4>
              <h4>Price: ${state?.price}</h4>
              <h4>Rating: {state?.rating}/5</h4>
              <h4>Category: {state?.category}</h4>
              <h4>Description: {state?.description}</h4>
            </div>
            {admin && (
              <>
                <div className="btn-div-update-dlt">
                  <Button
                    className={"update-btn"}
                    text={"Update book"}
                    handleButtonClick={handleUpdateBook}
                  ></Button>
                  <Button
                    className={"delete-btn"}
                    text={"Delete book"}
                    // handleButtonClick={handleDeleteBook}
                    handleButtonClick={handleDelete}
                  ></Button>
                  <ToastContainer />
                </div>
                <div
                  className={`confirmation-box ${
                    deleteClicked ? "active" : ""
                  }`}
                >
                  <h3>Are you sure you want to delete this book?</h3>
                  <div className="alert-btn">
                    <Button
                      className={"update-btn"}
                      text={"Cancel"}
                      handleButtonClick={handleDelete}
                    ></Button>
                    <Button
                      className={"delete-btn"}
                      text={"Ok"}
                      handleButtonClick={handleDeleteBook}
                    ></Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default BookDetails;
