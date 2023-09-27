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

  return (
    <div className={`card-container }`}>
      {data.map((item, index) => {
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
              <img src={item.image} alt={item.title} />
            </div>
            <div className="card-text">
              <p className="price">Price : {item.price}</p>
              <p className="rating">Rating : {item.rating.rate}</p>
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
  );
}
