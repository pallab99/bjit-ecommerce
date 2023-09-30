/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Button from './../../button';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { isAdmin } from '../../../helper/tokenAuthorizer';

export default function Index({ data, isLoading }) {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCreateBook = () => {
    navigate('/createBook');
  };
  const handleShowBookDetails = (bookId) => {
    navigate(`/showBookDetails/${bookId}`);
  };
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      const res = isAdmin(token);
      if (res === true) {
        setAdmin(true);
      }
    }
  }, []);
  return (
    <>
      <div className="create-book-btn">
        {admin && (
          <Button
            className={'sign-in-btn'}
            text={'Create Book'}
            handleButtonClick={handleCreateBook}
          ></Button>
        )}
      </div>
      <div className={`card-container }`}>
        {data?.data?.products.map((item, index) => {
          return (
            <div
              key={index}
              className={`card ${
                hoveredCard !== null && hoveredCard !== index ? 'grayscale' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`card-image `}>
                <img
                  src="https://qph.cf2.quoracdn.net/main-qimg-880a65f86b1d5d73a962ee2520459af7-lq"
                  alt={item.title}
                />
              </div>
              <div className="card-text">
                <p className="price">Price : {item.price}</p>
                <p className="rating">Rating : {item.rating}</p>
                <h2 className="title">{item.title}</h2>

                <p className="description">{item.description}</p>
              </div>
              <Button
                className={'sign-in-btn'}
                text={'View'}
                handleButtonClick={() => handleShowBookDetails(item._id)}
              ></Button>
            </div>
          );
        })}
      </div>
    </>
  );
}
