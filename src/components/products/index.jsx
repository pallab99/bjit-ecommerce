/* eslint-disable react/prop-types */
import Card from './cards';
import Loader from './../loader';
import Category from './../category';
import CategoryGrid from './categoryGrid';
import './index.scss';
import { useEffect, useState } from 'react';
import BookApi from '../../api/BookApi';

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    try {
      setIsLoading(true);
      const response = await BookApi.getAllBooks();
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Category>
        <CategoryGrid />
      </Category>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2
            style={{
              textAlign: 'center',
            }}
          >
            Books
          </h2>

          <Card data={data} isLoading={isLoading}></Card>
        </>
      )}
    </>
  );
}
