import './index.scss';
export default function index({ className, text }) {
  return (
    <div className="btn-container">
      <button className={className}>{text}</button>
    </div>
  );
}
