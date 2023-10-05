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
      <Route path="/" element={<Home />} />

      <Route path="/showBookDetails" element={<ShowBookDetails />}>
        <Route path=":bookId" element={<ShowBookDetails />}></Route>
      </Route>

      <Route path="/signUp" element={<Registration />}></Route>
      <Route path="/verifyCode" element={<CodeVerification />}></Route>
      <Route path="/userLogin" element={<LogInPage />}></Route>
      <Route path="*" element={<NotFound />}></Route>

      {/* Private routes for admin */}
      <Route element={<AuthenticateAdminPage />}>
        <Route path="/createBook" element={<CreateBook />}></Route>

        <Route path="/updateBook/" element={<UpdateBook />}>
          <Route path=":bookId" element={<UpdateBook />}></Route>
        </Route>
      </Route>

      {/* Private routes for user */}
      <Route element={<AuthenticateUserPage />}>
        <Route path="/cart" element={<Cart />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
