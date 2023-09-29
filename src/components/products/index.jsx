/* eslint-disable react/prop-types */
import Card from "./cards";
import Loader from "./../loader";
import Category from "./../category";
import CategoryGrid from "./categoryGrid";
import "./index.scss";

import useFetchData from "../../hooks/useApiFetch";
export default function Index() {
  // const { isLoading } = useContext(ProductContext);
  const URL = "http://localhost:8000/api/books/all";
  const { data, isLoading } = useFetchData(URL);

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
              textAlign: "center",
            }}
          >
            Products
          </h2>
          <Card data={data} isLoading={isLoading}></Card>
        </>
      )}
    </>
  );
}
