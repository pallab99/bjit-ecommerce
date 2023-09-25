import "./index.scss";
import Button from "./../button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      alert("Invalid Credentials");
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
            />
          </div>
          <div className="password-div">
            <input
              type="text"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="btn-div">
            <Button className={"sign-in-btn"} text={"Log in"}></Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Index;
