import { useState } from "react";
import "./index.scss";
const Index = () => {
  const [category] = useState([
    {
      id: 1,
      imagePath:
        "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "SmartPhone",
    },
    {
      id: 2,
      imagePath:
        "https://images.pexels.com/photos/1714341/pexels-photo-1714341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Desktop",
    },
    {
      id: 3,
      imagePath:
        "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=600",
      alt: "Shoes",
    },
  ]);
  return (
    <>
      <h2 className="category-header" style={{ textAlign: "center" }}>
        Categories
      </h2>
      <div className="category-container">
        {category.map((item) => (
          <div className="image-grid" key={item.id}>
            <div className="image-grid-inner">
              <div className="image-grid-front">
                <img src={item.imagePath} alt={item.alt} />
              </div>
              <div className="image-grid-back">
                <h2>{item.alt}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Index;
