import { useForm, Controller } from "react-hook-form";
import TextInput from "../../atoms/text-input/text-input";
import PasswordInput from "../../atoms/password-input/password-input";
// import AuthApi from "../../../api/AuthApi";
import "./form.style.scss";
import Button from "../../atoms/button/button";
import { useNavigate } from "react-router-dom";
import { isStrongPassword } from "../../../helper/isStrongPassword";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../../redux/slices/userSlice";
// import { logIn } from "../../../redux/actions/user";
const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.user?.userDetails);
  console.log("gggg", userDetails);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin = async () => {
    try {
      const data = {
        email: watch("email"),
        password: watch("password"),
      };
      navigate("/");
      dispatch(logIn(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
        <div className="email-field">
          <h4>Email</h4>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextInput
                placeholder={"Enter Your Email"}
                fieldValues={field}
                className={"text-input"}
              />
            )}
          />
          <div className="error-message">
            {errors.email && <h5>{errors.email.message}</h5>}
          </div>
        </div>

        <div className="password-field">
          <h4>Password</h4>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum length must be 6",
              },
              maxLength: {
                value: 20,
                message: "Max length must be 20",
              },
              validate: (value) => {
                return isStrongPassword(value);
              },
            }}
            render={({ field }) => (
              <PasswordInput
                placeholder={"Enter your password"}
                filedValues={field}
                className={"password-input"}
              />
            )}
          />
          <div className="error-message">
            {errors.password && <h5>{errors.password.message}</h5>}
          </div>
        </div>

        <Button className={"sign-in-btn"} text={"Sign in"} />
      </form>
    </div>
  );
};

export default Form;
