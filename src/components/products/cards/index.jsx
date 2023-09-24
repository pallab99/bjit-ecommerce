/* eslint-disable react/prop-types */
import './index.scss';
export default function Index({ data }) {
  return (
    <div className="card-container">
      {data.map((item, index) => {
        return (
          <div key={index} className="card">
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
