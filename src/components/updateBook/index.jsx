/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./../loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import Navbar from "./../navbar";
import BookApi from "../../api/BookApi";
import { isAdmin } from "../../helper/tokenAuthorizer";
import Cookies from "js-cookie";
import { alertConfigs } from "../../utils/alertConfig";
import Button from "./../button";
import ButtonLoader from "./../button-loader";
import { useForm } from "react-hook-form";

function BookForm() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

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

  const [updateBook, setUpdateBook] = useState(null);
  const getBookById = async (id) => {
    try {
      setIsLoading(true);
      const response = await BookApi.getBookById(id);
      setData(response.data);
      setUpdateBook({
        title: response.data?.data?.result?.title,
        description: response.data?.data?.result?.description,
        price: response.data?.data?.result?.price,
        rating: response.data?.data?.result?.rating,
        stock: response.data?.data?.result?.stock,
        author: response.data?.data?.result?.author,
        category: response.data?.data?.result?.category,
        publishedAt: response.data?.data?.result?.publishedAt.split("T")[0],
        isbn: response.data?.data?.result?.isbn,
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const { register, handleSubmit, setValue, formState } = useForm();
  const { error } = formState;

  useEffect(() => {
    if (updateBook) {
      for (const [key, value] of Object.entries(updateBook)) {
        setValue(key, value);
      }
    }
  }, [updateBook, setValue]);

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
  const handleUpdateBook = async (data) => {
    try {
      setBtnClicked(true);
      const res = await BookApi.updateBookById(bookId, data);
      showAlert(res.data);
      setTimeout(() => {
        setBtnClicked(false);
      }, 2500);
    } catch (error) {
      setBtnClicked(true);

      showAlert(error.response);
      setTimeout(() => {
        setBtnClicked(false);
      }, 2500);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar></Navbar>
          <h1 className="header-text">Update Book</h1>
          <div className="update-book-form-div">
            <form
              noValidate
              onSubmit={handleSubmit(handleUpdateBook)}
              className="book-form"
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                id="title"
                {...register("title")}
              />
              <textarea
                name="description"
                placeholder="Description"
                id="description"
                {...register("description")}
              ></textarea>
              <input
                type="number"
                name="price"
                placeholder="Price"
                id="price"
                {...register("price", { valueAsNumber: true })}
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating"
                id="rating"
                {...register("rating", { valueAsNumber: true })}
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                id="stock"
                {...register("stock", { valueAsNumber: true })}
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                id="author"
                {...register("author")}
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                id="author"
                {...register("category")}
              />
              <input
                type="date"
                name="publishedAt"
                placeholder="Published At"
                id="publishedAt"
                {...register("publishedAt")}
              />
              <input
                type="text"
                name="isbn"
                placeholder="ISBN"
                id="isbn"
                {...register("isbn")}
              />
              <div className="btn-div">
                {!btnClicked ? (
                  <Button className={"add-book-btn"} text={"Update"} />
                ) : (
                  <ButtonLoader />
                )}
              </div>

              <ToastContainer />
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default BookForm;
