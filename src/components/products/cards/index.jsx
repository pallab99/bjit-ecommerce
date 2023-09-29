/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Button from "./../../button";
import "./index.scss";
import Modal from "./../../modal";

import { ProductContext } from "../../../context/productContext";
export default function Index() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Step 1: Add a state for search query

  const openModal = (index, e) => {
    e.stopPropagation();
    setSelectedItemIndex(index);
    setModalVisible(true);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setModalVisible(false);
  };
  const { data } = useContext(ProductContext);

  const filteredProducts = data?.products?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!data || !data.products) {
    return <div>Loading...</div>;
  }
  const productsToDisplay = searchQuery.length
    ? filteredProducts
    : data?.products;
  return (
    <>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className={`card-container }`}>
        {productsToDisplay.map((item, index) => {
          return (
            <div
              key={index}
              className={`card ${
                hoveredCard !== null && hoveredCard !== index ? "grayscale" : ""
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`card-image `}>
                <img src={item.images[0]} alt={item.title} />
              </div>
              <div className="card-text">
                <p className="price">Price : {item.price}</p>
                <p className="rating">Rating : {item.rating}</p>
                <h2 className="title">{item.title}</h2>
                <p className="description">{item.description}</p>
              </div>
              <Button
                className={"sign-in-btn"}
                text={"View"}
                handleButtonClick={(e) => openModal(index, e)}
              ></Button>
            </div>
          );
        })}
        <Modal
          modalVisible={modalVisible}
          handleCancel={handleCancel}
          index={selectedItemIndex}
        ></Modal>
      </div>
    </>
  );
}
