/* eslint-disable react/prop-types */
import "./button.style.scss";
import ButtonLoader from "../button-loader";
export default function Button({
  className,
  text,
  handleButtonClick,
  btnClicked,
}) {
  return (
    <div className="btn-container">
      {btnClicked ? (
        <ButtonLoader></ButtonLoader>
      ) : (
        <button className={className} onClick={handleButtonClick}>
          {text}
        </button>
      )}
    </div>
  );
}
