import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import AuthApi from "../../api/AuthApi";
import { alertConfigs } from "../../utils/alertConfig";
import Button from "./../button";
import ButtonLoader from "./../button-loader";
const Index = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const [btnClicked, setBtnClicked] = useState(false);
  const handleVerifyCode = async (data) => {
    try {
      setBtnClicked(true);
      const res = await AuthApi.verifyAccount(data);
      console.log(res);
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

  return (
    <div className="verify-code-container">
      <form noValidate onSubmit={handleSubmit(handleVerifyCode)}>
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
              type="number"
              className="input-field"
              placeholder="Enter your verification code"
              id="verificationCode"
              {...register("verificationCode", {
                required: "verificationCode is required",
                valueAsNumber: true,
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
};

export default Index;
