import { Route, Routes } from "react-router-dom";
import "./App.scss";

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/login" Component={Login}></Route>
    </Routes>
  );
}

export default App;
