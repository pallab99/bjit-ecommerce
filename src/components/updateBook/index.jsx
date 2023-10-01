/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from './../loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import Navbar from './../navbar';
import BookApi from '../../api/BookApi';
import { isAdmin } from '../../helper/tokenAuthorizer';
import Cookies from 'js-cookie';
import { alertConfigs } from '../../utils/alertConfig';
import Button from './../button';
import ButtonLoader from './../button-loader';
function BookForm() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    const token = Cookies.get('accessToken');
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
        publishedAt: response.data?.data?.result?.publishedAt.split('T')[0],
        isbn: response.data?.data?.result?.isbn,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setBtnClicked(true);
      const res = await BookApi.updateBookById(bookId, updateBook);
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
  const handleUpdateChange = (e) => {
    let newValue = e.target.value;

    if (['price', 'stock', 'rating'].includes(e.target.name)) {
      newValue = parseFloat(newValue);
    }
    setUpdateBook({ ...updateBook, [e.target.name]: newValue });
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
                defaultValue={updateBook?.title}
              />
              <textarea
                name="description"
                onChange={handleUpdateChange}
                placeholder="Description"
                defaultValue={updateBook?.description}
              ></textarea>
              <input
                type="number"
                name="price"
                onChange={handleUpdateChange}
                placeholder="Price"
                defaultValue={updateBook?.price}
              />
              <input
                type="number"
                name="rating"
                onChange={handleUpdateChange}
                placeholder="Rating"
                defaultValue={updateBook?.rating}
              />
              <input
                type="number"
                name="stock"
                onChange={handleUpdateChange}
                placeholder="Stock"
                defaultValue={updateBook?.stock}
              />
              <input
                type="text"
                name="author"
                onChange={handleUpdateChange}
                placeholder="Author"
                defaultValue={updateBook?.author}
              />
              <input
                type="text"
                name="category"
                onChange={handleUpdateChange}
                placeholder="Category"
                defaultValue={updateBook?.category}
              />
              <input
                type="date"
                name="publishedAt"
                onChange={handleUpdateChange}
                placeholder="Published At"
                defaultValue={updateBook?.publishedAt}
              />
              <input
                type="text"
                name="isbn"
                onChange={handleUpdateChange}
                placeholder="ISBN"
                defaultValue={updateBook?.isbn}
              />
              <div className="btn-div">
                {!btnClicked ? (
                  <Button className={'add-book-btn'} text={'Update'} />
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
