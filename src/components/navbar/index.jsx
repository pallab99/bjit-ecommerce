import './index.scss';
import SignInButton from './../button';
export default function index() {
  return (
    <div className="nav">
      <div className="nav-container">
        <div className="hover">E-commerce store</div>
        <SignInButton className={'sign-in-btn'} text="Sign In"></SignInButton>
      </div>
    </div>
  );
}
