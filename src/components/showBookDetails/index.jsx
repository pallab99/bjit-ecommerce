/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./index.scss";
import useFetchData from "../../hooks/useApiFetch";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./../loader";
import Button from "./../button";
import Navbar from "./../navbar";
import useDeleteBook from "../../hooks/useDeleteBook";
const Index = () => {
  const { bookId } = useParams();
  const URL = `http://localhost:8000/api/books/details/${bookId}`;
  const { data, isLoading } = useFetchData(URL);

  const navigate = useNavigate();
  const handleUpdateBook = () => {
    navigate(`/updateBook/${bookId}`);
  };

  const { handleDeleteBook } = useDeleteBook(bookId);
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
              <h2>Title : {data?.data?.result?.title}</h2>
              <p>Author: {data?.data?.result?.author}</p>
              <p>Price: ${data?.data?.result?.price}</p>
              <p>Rating: {data?.data?.result?.rating}/5</p>
              <p>Category: {data?.data?.result?.category}</p>
              <p>Description: {data?.data?.result?.description}</p>
            </div>
            <div className="btn-div-update-dlt">
              <Button
                className={"update-btn"}
                text={"Update book"}
                handleButtonClick={handleUpdateBook}
              ></Button>
              <Button
                className={"delete-btn"}
                text={"Delete book"}
                handleButtonClick={handleDeleteBook}
              ></Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
