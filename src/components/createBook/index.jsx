/* eslint-disable no-unused-vars */
import "./index.scss";
import Navbar from "./../navbar";
import { useState } from "react";
import BookApi from "../../api/BookApi";
import Button from "./../button";
import ButtonLoader from "./../button-loader";
import ToasterMessage from "./../toaster";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { alertConfigs } from "../../utils/alertConfig";
import { useForm } from "react-hook-form";
import { isValidISBN } from "../../helper/isValidIsbn";

function Index() {
  const navigate = useNavigate();
  const initialState = {
    title: "",
    description: "",
    price: 0,
    rating: 0,
    stock: 0,
    author: "",
    category: "",
    publishedAt: "",
    isbn: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [btnClicked, setBtnClicked] = useState(false);

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

  const handleCreateBook = async (data) => {
    const date = new Date(data.publishedAt);
    const formattedDate = date.toISOString().split("T")[0];
    data.publishedAt = formattedDate;
    try {
      setBtnClicked(true);
      const res = await BookApi.createBook(data);
      console.log(res);
      showAlert(res.data);
      setTimeout(() => {
        setBtnClicked(false);
      }, 2500);
    } catch (error) {
      console.log(error);
      setBtnClicked(true);
      showAlert(error.response);
      setTimeout(() => {
        setBtnClicked(false);
      }, 2500);
    }
  };
  console.log("errors", errors);
  return (
    <>
      <Navbar></Navbar>
      <div className="bouncing-text">
        <h1 className="header-text">Create Book</h1>
      </div>
      <div className="create-book-form-div">
        <form
          noValidate
          onSubmit={handleSubmit(handleCreateBook)}
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
          {errors.title && <p className="error-span">{errors.title.message}</p>}
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
          {errors.price && <p className="error-span">{errors.price.message}</p>}
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
          {errors.stock && <p className="error-span">{errors.stock.message}</p>}
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
          {errors.isbn && <p className="error-span">{errors.isbn.message}</p>}
          <div className="btn-div">
            {!btnClicked ? (
              <Button className={"add-book-btn"} text={"Create"} />
            ) : (
              <ButtonLoader />
            )}
          </div>
          <ToasterMessage></ToasterMessage>
        </form>
      </div>
    </>
  );
}

export default Index;
