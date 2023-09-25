/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.scss";
export default function Index({ data }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="card-container">
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
            <div className="card-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="card-text">
              <p className="price">Price : {item.price}</p>
              <p className="rating">Rating : {item.rating.rate}</p>
              <h2 className="title">{item.title}</h2>
              <p className="description">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
