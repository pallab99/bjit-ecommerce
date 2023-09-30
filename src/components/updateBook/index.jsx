/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUpdateFormSubmit from '../../hooks/useUpdateBook';
import Loader from './../loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import Navbar from './../navbar';
import BookApi from '../../api/BookApi';
function BookForm() {
  const { bookId } = useParams();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

  const initialState = {
    title: data?.data?.result?.title,
    description: data?.data?.result?.description,
    price: data?.data?.result?.price,
    rating: data?.data?.result?.rating,
    stock: data?.data?.result?.stock,
    author: data?.data?.result?.author,
    category: data?.data?.result?.category,
    publishedAt: data?.data?.result?.publishedAt,
    isbn: data?.data?.result?.isbn,
  };
  useEffect(() => {
    if (data) {
      setUpdateBook({
        title: data?.data?.result?.title,
        description: data?.data?.result?.description,
        price: data?.data?.result?.price,
        rating: data?.data?.result?.rating,
        stock: data?.data?.result?.stock,
        author: data?.data?.result?.author,
        category: data?.data?.result?.category,
        publishedAt: data?.data?.result?.publishedAt,
        isbn: data?.data?.result?.isbn,
      });
    }
  }, [data]);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);

  const updateUrl = `http://localhost:8000/api/books/update/${bookId}`;
  const [updateBook, setUpdateBook, handleUpdate] = useUpdateFormSubmit(
    initialState,
    updateUrl
  );
  const notify = () => toast.success('Updated successfully');

  useEffect(() => {
    if (isUpdateClicked) {
      notify();
      setIsUpdateClicked(false);
    }
  }, [isUpdateClicked]);

  const handleUpdateChange = (e) => {
    setUpdateBook({ ...updateBook, [e.target.name]: e.target.value });
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
            <form onSubmit={handleUpdate} className="book-form">
              <input
                type="text"
                name="title"
                onChange={handleUpdateChange}
                placeholder="Title"
                value={updateBook.title}
              />
              <textarea
                name="description"
                onChange={handleUpdateChange}
                placeholder="Description"
                value={updateBook.description}
              ></textarea>
              <input
                type="number"
                name="price"
                onChange={handleUpdateChange}
                placeholder="Price"
                value={updateBook.price}
              />
              <input
                type="number"
                name="rating"
                onChange={handleUpdateChange}
                placeholder="Rating"
                value={updateBook.rating}
              />
              <input
                type="number"
                name="stock"
                onChange={handleUpdateChange}
                placeholder="Stock"
                value={updateBook.stock}
              />
              <input
                type="text"
                name="author"
                onChange={handleUpdateChange}
                placeholder="Author"
                value={updateBook.author}
              />
              <input
                type="text"
                name="category"
                onChange={handleUpdateChange}
                placeholder="Category"
                value={updateBook.category}
              />
              <input
                type="date"
                name="publishedAt"
                onChange={handleUpdateChange}
                placeholder="Published At"
                value={updateBook.publishedAt}
              />
              <input
                type="text"
                name="isbn"
                onChange={handleUpdateChange}
                placeholder="ISBN"
                value={updateBook.isbn}
              />
              <button type="submit">Update</button>
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
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default BookForm;
