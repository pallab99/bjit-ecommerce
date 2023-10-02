/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Card from "./cards";
import Loader from "./../loader";
import Category from "./../category";
import CategoryGrid from "./categoryGrid";
import "./index.scss";
import { useEffect, useState } from "react";
import BookApi from "../../api/BookApi";
import useDebounce from "../../hooks/useDebounce";

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);

  useEffect(() => {
    getAllBooks();
  }, [debouncedSearchTerm]);

  const getAllBooks = async () => {
    try {
      setIsLoading(true);
      const response = await BookApi.getAllBooks(debouncedSearchTerm);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log("search", e.target.value);
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
              textAlign: "center",
            }}
          >
            Books
          </h2>
          <div className="search-div">
            <input
              placeholder="Search book by title"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            ></input>
          </div>
          <Card data={data} isLoading={isLoading}></Card>
        </>
      )}
    </>
  );
}
