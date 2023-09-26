import { Route, Routes } from 'react-router-dom';
import './App.scss';

import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/cart';

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/login" Component={Login}></Route>
      <Route path="/cart" Component={Cart}></Route>
    </Routes>
  );
}

export default App;
