/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../ui/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import Navbar from "./../navbar";
import BookApi from "../../api/BookApi";
import { isAdmin } from "../../helper/tokenAuthorizer";
import Cookies from "js-cookie";
import { alertConfigs } from "../../utils/alertConfig";
import Button from "../ui/button";
import ButtonLoader from "../ui/button-loader";
import { useForm } from "react-hook-form";
import { isValidISBN } from "../../helper/isValidIsbn";

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
  const { register, handleSubmit, setValue, formState } = useForm({
    mode: "onChange",
  });
  const { errors } = formState;

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
        navigate(`/showBookDetails/${bookId}`);
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
                required
                id="title"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title length must be minimum 3",
                  },
                  maxLength: {
                    value: 50,
                    message: "Title length can not be greater than 50",
                  },
                })}
              />
              {errors.title && (
                <p className="error-span">{errors.title.message}</p>
              )}
              <textarea
                name="description"
                placeholder="Description"
                required
                id="description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 15,
                    message: "Description length must be minimum 15",
                  },
                  maxLength: {
                    value: 200,
                    message: "Description length can not be greater than 200",
                  },
                })}
              ></textarea>
              {errors.description && (
                <p className="error-span">{errors.description.message}</p>
              )}

              <input
                type="number"
                name="price"
                placeholder="Price"
                required
                id="price"
                {...register("price", {
                  valueAsNumber: true,
                  required: "Price is required",
                  min: {
                    value: 1,
                    message: "Price can not be less than 1",
                  },
                  max: {
                    value: 10000,
                    message: "Price can not be greater than 10000",
                  },
                })}
              />
              {errors.price && (
                <p className="error-span">{errors.price.message}</p>
              )}
              <input
                type="number"
                name="rating"
                placeholder="Rating"
                required
                id="rating"
                {...register("rating", {
                  valueAsNumber: true,
                  required: "Rating is required",
                  min: {
                    value: 1,
                    message: "Rating can not be less than 1",
                  },
                  max: {
                    value: 5,
                    message: "Rating can not be greater than 5",
                  },
                })}
              />
              {errors.rating && (
                <p className="error-span">{errors.rating.message}</p>
              )}
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                required
                id="stock"
                {...register("stock", {
                  valueAsNumber: true,
                  required: "Stock is required",
                  min: {
                    value: 10,
                    message: "Stock can not be less than 10",
                  },
                  max: {
                    value: 500,
                    message: "Stock can not be greater than 500",
                  },
                })}
              />
              {errors.stock && (
                <p className="error-span">{errors.stock.message}</p>
              )}
              <input
                type="text"
                name="author"
                placeholder="Author"
                required
                id="author"
                {...register("author", {
                  required: "Author is required",
                })}
              />
              {errors.author && (
                <p className="error-span">{errors.author.message}</p>
              )}

              <input
                type="text"
                name="category"
                placeholder="Category"
                required
                id="category"
                {...register("category", {
                  required: "Category is required",
                })}
              />
              {errors.category && (
                <p className="error-span">{errors.category.message}</p>
              )}
              <input
                type="date"
                name="publishedAt"
                placeholder="Published At"
                required
                id="publishedAt"
                {...register("publishedAt", {
                  required: "Published at is required",
                })}
              />
              {errors.publishedAt && (
                <p className="error-span">{errors.publishedAt.message}</p>
              )}
              <input
                type="text"
                name="isbn"
                placeholder="ISBN"
                required
                id="isbn"
                {...register("isbn", {
                  required: "ISBN at is required",
                  validate: (value) => {
                    if (!isValidISBN(value)) {
                      return "Invalid ISBN provided";
                    }
                    return true;
                  },
                })}
              />
              {errors.isbn && (
                <p className="error-span">{errors.isbn.message}</p>
              )}
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
