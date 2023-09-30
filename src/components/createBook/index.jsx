import './index.scss';
import Navbar from './../navbar';
import { useState } from 'react';
import BookApi from '../../api/BookApi';
import Button from './../button';
import ButtonLoader from './../button-loader';
import ToasterMessage from './../toaster';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Index() {
  const navigate = useNavigate();
  const initialState = {
    title: '',
    description: '',
    price: 0,
    rating: 0,
    stock: 0,
    author: '',
    category: '',
    publishedAt: '',
    isbn: '',
  };
  const [btnClicked, setBtnClicked] = useState(false);
  const [book, setBook] = useState(initialState);

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (['price', 'stock', 'rating'].includes(e.target.name)) {
      newValue = parseFloat(newValue);
    }

    setBook({ ...book, [e.target.name]: newValue });
  };
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      toast.error(res.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnClicked(true);
      const res = await BookApi.createBook(book);
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
          <div className="btn-div">
            {!btnClicked ? (
              <Button className={'add-book-btn'} text={'Create'} />
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
