import "./index.scss";

export default function index({ className, text, handleButtonClick }) {
  return (
    <div className="btn-container">
      <button className={className} onClick={handleButtonClick}>
        {text}
      </button>
    </div>
  );
}
