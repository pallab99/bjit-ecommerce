/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { isStrongPassword } from "../../helper/isStrongPassword";
import Button from "./../button";
import ButtonLoader from "./../button-loader";
import AuthApi from "../../api/AuthApi";
import { alertConfigs } from "../../utils/alertConfig";
import "./index.scss";
const Index = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      name: "",
      confirmPassword: "",
      country: "",
      city: "",
      area: "",
      street: "",
    },
  });
  const [btnClicked, setBtnClicked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const firstName = watch("firstName");
    const lastName = watch("lastName");
    console.log(firstName + lastName);
    setValue("name", `${firstName} ${lastName}`);
  }, [watch("firstName"), watch("lastName")]);
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      setTimeout(() => {
        // navigate("/");
      }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handleSignUp = async () => {
    const firstName = getValues("firstName");
    const lastName = getValues("lastName");
    const name = `${firstName} ${lastName}`;
    const email = getValues("email");
    const password = getValues("password");
    const confirmPassword = getValues("confirmPassword");
    const country = getValues("country");
    const city = getValues("city");
    const area = getValues("area");
    const street = getValues("street");
    const phoneNumber = getValues("phoneNumber");
    const userData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      name: name,
      phoneNumber: phoneNumber,
      address: {
        country: country,
        city: city,
        area: area,
        street: street,
      },
    };

    try {
      setBtnClicked(true);

      const res = await AuthApi.signUp(userData);
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
    <div className="login-container">
      <form noValidate onSubmit={handleSubmit(handleSignUp)}>
        <div className="login-div">
          <div className="email-div">
            <input
              className="input-field"
              type="text"
              placeholder="Enter your first name"
              id="firstName"
              {...register("firstName", {
                required: "firstName is required",
              })}
            />
            {errors.firstName && (
              <p className="error-span">{errors.firstName.message}</p>
            )}
          </div>

          <div className="email-div">
            <input
              className="input-field"
              type="text"
              placeholder="Enter your last name"
              id="lastName"
              {...register("lastName", {
                required: "lastName is required",
              })}
            />
            {errors.lastName && (
              <p className="error-span">{errors.lastName.message}</p>
            )}
          </div>

          <div className="email-div">
            <input
              className="input-field"
              type="text"
              placeholder="Enter your full name"
              id="name"
              {...register("name", {
                required: "FullName is required",
              })}
              disabled
            />
            {errors.name && <p className="error-span">{errors.name.message}</p>}
          </div>

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
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
                placeholder="Enter your password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  validate: (value) => {
                    return isStrongPassword(value);
                  },
                })}
              />
              <button
                className="toggle-button"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="error-span">{errors.password.message}</p>
            )}
          </div>

          <div className="password-div">
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input-field"
                placeholder="Enter your confirm password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "confirmPassword is required",
                  validate: (value) => {
                    if (value != watch("password"))
                      return "Password and confirm password should be same";
                    return isStrongPassword(value);
                  },
                })}
              />
              <button
                className="toggle-button"
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="error-span">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="email-div">
            <input
              className="input-field"
              type="text"
              placeholder="Enter your phone number"
              id="phoneNumber"
              {...register("phoneNumber", {
                required: "phoneNumber is required",
                pattern: {
                  value: /^(?:\+88|01)?\d{11}$/,
                  message: "Please enter a valid Phone Number.",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="error-span">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className="email-div">
            <input
              className="input-field"
              type="text"
              placeholder="Enter your country"
              id="country"
              {...register("country", {
                required: "country is required",
              })}
            />
            {errors.country && (
              <p className="error-span">{errors.country.message}</p>
            )}
          </div>

          <div className="email-div">
            <input
              className="input-field"
              type="text"
              placeholder="Enter your city"
              id="city"
              {...register("city", {
                required: "city is required",
              })}
            />
            {errors.city && <p className="error-span">{errors.city.message}</p>}
          </div>

          <div className="email-div">
            <input
              className="input-field"
              type="text"
              placeholder="Enter your area"
              id="area"
              {...register("area", {
                required: "area is required",
              })}
            />
            {errors.area && <p className="error-span">{errors.area.message}</p>}
          </div>

          <div className="email-div">
            <input
              className="input-field"
              type="text"
              placeholder="Enter your street"
              id="street"
              {...register("street", {
                required: "street is required",
              })}
            />
            {errors.street && (
              <p className="error-span">{errors.street.message}</p>
            )}
          </div>

          <div className="btn-div">
            {!btnClicked ? (
              <Button className={"sign-in-btn"} text={"Sign up"}></Button>
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
