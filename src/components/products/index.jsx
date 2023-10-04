/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Card from "./cards";
import Loader from "../ui/loader";
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
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    getAllBooks();
  }, [debouncedSearchTerm, sortBy, sortOrder]);

  const getAllBooks = async () => {
    try {
      setIsLoading(true);
      const response = await BookApi.getAllBooks(
        debouncedSearchTerm,
        sortBy,
        sortOrder
      );
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
  const toggleSortOrder = (e) => {
    console.log(e.target.value);
    setSortOrder(e.target.value);
  };
  const toggleSortBy = (e) => {
    console.log(e.target.value);
    setSortBy(e.target.value);
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
            <div className="select-div">
              <select
                name="sortBy"
                id="sortBy"
                className="sort-select"
                onChange={toggleSortBy}
              >
                <option value="">
                  {sortBy === "stock"
                    ? "Stock"
                    : sortBy === "price"
                    ? "Price"
                    : sortBy === "rating"
                    ? "Rating"
                    : "Choose"}
                </option>
                <option value="stock">stock</option>
                <option value="price">price</option>
                <option value="rating">rating</option>
              </select>
              <select
                name="sortOrder"
                id="sortOrder"
                className="sort-select"
                onChange={toggleSortOrder}
              >
                <option value="">
                  {sortOrder === "asc"
                    ? "Ascending"
                    : sortOrder === "desc"
                    ? "Descending"
                    : "Choose"}
                </option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
          <Card data={data} isLoading={isLoading}></Card>
        </>
      )}
    </>
  );
}
