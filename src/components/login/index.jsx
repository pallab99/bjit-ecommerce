import './index.scss';
import Button from './../button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthApi from '../../api/AuthApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonLoader from './../button-loader';
function Index() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const showAlert = (res) => {
    console.log(res);
    if (res.success) {
      toast.success(res.message, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      toast.error(res.message, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  const [btnClicked, setBtnClicked] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnClicked(true);
      const data = {
        email: username,
        password,
      };
      const res = await AuthApi.signIn(data);
      console.log(res);
      showAlert(res.data);
      setTimeout(() => {
        setBtnClicked(false);
      }, 2500);
    } catch (error) {
      setBtnClicked(true);
      console.log(error);
      showAlert(error.response);
      setTimeout(() => {
        setBtnClicked(false);
      }, 2500);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="login-div">
          <div className="email-div">
            <input
              className="input-field"
              type="text"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="password-div">
            <input
              type="text"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="btn-div">
            {!btnClicked ? (
              <Button className={'sign-in-btn'} text={'Log in'}></Button>
            ) : (
              <ButtonLoader></ButtonLoader>
            )}
          </div>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}

export default Index;
