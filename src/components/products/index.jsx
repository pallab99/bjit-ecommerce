/* eslint-disable react/prop-types */
import Card from './cards';
import Loader from './../loader';

import Category from './../category';
import CategoryGrid from './categoryGrid';
import './index.scss';
import { ProductContext } from '../../productContext';
import { ThemeContext } from '../../themeContext';
import { useContext } from 'react';
export default function Index() {
  const { isLoading } = useContext(ProductContext);
  const { darkTheme } = useContext(ThemeContext);
  console.log('theme', darkTheme);
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
            Products
          </h2>
          <Card></Card>
        </>
      )}
    </>
  );
}
