import "./index.scss";
import Button from "../ui/button";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <div className="not-found-container">
      <h1>Look like you are come to wrong place</h1>
      <Button
        className={"navigate-to-home"}
        text={"Go to home"}
        handleButtonClick={navigateToHome}
      ></Button>
    </div>
  );
};

export default Index;
