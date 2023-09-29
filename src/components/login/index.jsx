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
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid Credentials");
      }

      // If the response is OK, you can choose to do something with the data if needed.
      // For example, if the server sends back JSON data, you can parse it like this:
      // const data = await response.json();

      navigate("/");
    } catch (error) {
      alert(error.message || "An error occurred");
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
