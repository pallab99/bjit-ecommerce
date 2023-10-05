import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Cart from "./pages/cart";
import CreateBook from "./pages/createBook";
import UpdateBook from "./pages/updateBook";
import ShowBookDetails from "./pages/showBookDetails";
import NotFound from "./pages/notFound";
import Registration from "./pages/registration";
import CodeVerification from "./pages/codeVerification";
import LogInPage from "./pages/loginPage/loginPage";
import AuthenticateAdminPage from "./pages/authenticte-admin";
import AuthenticateUserPage from "./pages/authenticate-user";
function App() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route
        path="/showBookDetails/:bookId"
        Component={ShowBookDetails}
      ></Route>
      <Route path="/signUp" Component={Registration}></Route>
      <Route path="/verifyCode" Component={CodeVerification}></Route>
      <Route path="/userLogin" Component={LogInPage}></Route>
      <Route path="*" Component={NotFound}></Route>

      {/* Private routes for admin */}
      <Route element={<AuthenticateAdminPage />}>
        <Route path="/createBook" element={<CreateBook />}></Route>
        <Route path="/updateBook/:bookId" Component={UpdateBook}></Route>
      </Route>

      {/* Private routes for user */}
      <Route element={<AuthenticateUserPage />}>
        <Route path="/cart" Component={Cart}></Route>
      </Route>
    </Routes>
  );
}

export default App;
