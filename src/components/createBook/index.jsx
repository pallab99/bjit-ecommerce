import "./index.scss";
import useFormSubmit from "../../hooks/useCreateBook";
import Navbar from "./../navbar";

function Index() {
  const initialState = {
    title: "",
    description: "",
    price: "",
    rating: "",
    stock: "",
    author: "",
    category: "",
    publishedAt: "",
    isbn: "",
  };
  const url = "http://localhost:8000/api/books/create";
  const [book, setBook, handleSubmit] = useFormSubmit(initialState, url);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="create-book-form-div">
        <form onSubmit={handleSubmit} className="book-form">
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Description"
            required
          ></textarea>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            type="number"
            name="rating"
            onChange={handleChange}
            placeholder="Rating"
            required
          />
          <input
            type="number"
            name="stock"
            onChange={handleChange}
            placeholder="Stock"
            required
          />
          <input
            type="text"
            name="author"
            onChange={handleChange}
            placeholder="Author"
            required
          />
          <input
            type="text"
            name="category"
            onChange={handleChange}
            placeholder="Category"
            required
          />
          <input
            type="date"
            name="publishedAt"
            onChange={handleChange}
            placeholder="Published At"
            required
          />
          <input
            type="text"
            name="isbn"
            onChange={handleChange}
            placeholder="ISBN"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Index;
