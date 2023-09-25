import "./index.scss";
export default function index({ className, text, handleButtonClick }) {
  console.log(text);
  return (
    <div className="btn-container">
      <button className={className} onClick={handleButtonClick}>
        {text}
      </button>
    </div>
  );
}
