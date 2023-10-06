import "./profile.style.scss";
import ProfileIcon from "./../../../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../Home/components/navbar/navbar";
import Button from "../../../../components/atoms/button/button";
import { logOut } from "../../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userDetails);
  console.log("profile", userData);
  const handleLogout = () => {
    console.log("handle log out");
    dispatch(logOut());
    navigate("/");
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="profile-container">
        <div className="profile-card">
          <img src={ProfileIcon} alt="" />
          <h4>Name : {userData?.name}</h4>
          <h4>Email : {userData?.email}</h4>
          <h4>Phone : {userData?.phoneNumber}</h4>
        </div>
        <Button
          className={"log-out"}
          text={"Log Out"}
          handleButtonClick={handleLogout}
        ></Button>
      </div>
    </>
  );
};

export default Profile;
