// ToastMessage.js
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      progress={undefined}
      theme="light"
    />
  );
};

export default Index;
