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
    watch,
    formState: { errors },
  } = useForm();
  const [btnClicked, setBtnClicked] = useState(false);
  const [book, setBook] = useState(initialState);

  // const handleChange = (e) => {
  //   let newValue = e.target.value;

  //   if (["price", "stock", "rating"].includes(e.target.name)) {
  //     newValue = parseFloat(newValue);
  //   }

  //   setBook({ ...book, [e.target.name]: newValue });
  // };
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

  const handleLogin = async (data) => {
    console.log("ggg");
    const date = new Date(data.publishedAt);
    const formattedDate = date.toISOString().split("T")[0];
    data.publishedAt = formattedDate;
    console.log(data);
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

  return (
    <>
      <Navbar></Navbar>
      <div className="bouncing-text">
        <h1 className="header-text">Create Book</h1>
      </div>
      <div className="create-book-form-div">
        <form
          noValidate
          onSubmit={handleSubmit(handleLogin)}
          className="book-form"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            id="title"
            {...register("title")}
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            id="description"
            {...register("description")}
          ></textarea>
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            id="price"
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            required
            id="rating"
            {...register("rating", { valueAsNumber: true })}
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            required
            id="stock"
            {...register("stock", { valueAsNumber: true })}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            required
            id="author"
            {...register("author")}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            required
            id="author"
            {...register("category")}
          />
          <input
            type="date"
            name="publishedAt"
            placeholder="Published At"
            required
            id="publishedAt"
            {...register("publishedAt")}
          />
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            required
            id="isbn"
            {...register("isbn")}
          />
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
