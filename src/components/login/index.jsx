import "./index.scss";
import Button from "./../button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonLoader from "./../button-loader";
import { alertConfigs } from "../../utils/alertConfig";
import { useForm } from "react-hook-form";

function Index() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const [btnClicked, setBtnClicked] = useState(false);
  const handleLogin = async (data) => {
    try {
      setBtnClicked(true);
      const res = await AuthApi.signIn(data);
      showAlert(res.data);
      setTimeout(() => {
        setBtnClicked(false);
      }, 2500);
    } catch (error) {
      setBtnClicked(true);
      showAlert(error.response);
      setTimeout(() => {
        setBtnClicked(false);
      }, 2500);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  return (
    <div className="login-container">
      <form noValidate onSubmit={handleSubmit(handleLogin)}>
        <div className="login-div">
          <div className="email-div">
            <input
              className="input-field"
              type="text"
              placeholder="Enter your email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="error-span">{errors.email.message}</p>
            )}
          </div>
          <div className="password-div">
            <input
              type="password"
              className="input-field"
              placeholder="Enter your password"
              id="password"
              {...register("password", {
                required: "Password is required",
                validate: (value) => {
                  const hasMinLength = value.length >= 8;
                  const hasLowerCase = /[a-z]/.test(value);
                  const hasUpperCase = /[A-Z]/.test(value);
                  const hasSymbols = /\W|_/.test(value);
                  const hasNumbers = /\d/.test(value);

                  if (!hasMinLength) {
                    return "Password must have at least 8 characters";
                  }
                  if (!hasLowerCase) {
                    return "Password must have at least 1 lowercase character";
                  }
                  if (!hasUpperCase) {
                    return "Password must have at least 1 uppercase character";
                  }
                  if (!hasSymbols) {
                    return "Password must have at least 1 symbol";
                  }
                  if (!hasNumbers) {
                    return "Password must have at least 1 number";
                  }

                  return true;
                },
              })}
            />
            {errors.password && (
              <p className="error-span">{errors.password.message}</p>
            )}
          </div>
          <div className="btn-div">
            {!btnClicked ? (
              <Button className={"sign-in-btn"} text={"Log in"}></Button>
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
