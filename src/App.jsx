import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { CookiesProvider } from "react-cookie";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/cart";
import CreateBook from "./pages/createBook";
import UpdateBook from "./pages/updateBook";
import ShowBookDetails from "./pages/showBookDetails";
import NotFound from "./pages/notFound";
import Registration from "./pages/registration";
function App() {
  return (
    <CookiesProvider>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login}></Route>
        <Route path="/cart" Component={Cart}></Route>
        <Route path="/createBook" Component={CreateBook}></Route>
        <Route path="/updateBook/:bookId" Component={UpdateBook}></Route>
        <Route
          path="/showBookDetails/:bookId"
          Component={ShowBookDetails}
        ></Route>
        <Route path="/signUp" Component={Registration}></Route>
        <Route path="*" Component={NotFound}></Route>
      </Routes>
    </CookiesProvider>
  );
}

export default App;
