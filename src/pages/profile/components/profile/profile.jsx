import "./profile.style.scss";
import ProfileIcon from "./../../../../assets/profile.png";
import { useSelector } from "react-redux";
import Navbar from "../../../Home/components/navbar/navbar";
const Profile = () => {
  const userData = useSelector((state) => state.user.userDetails);
  console.log("profile", userData);
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
      </div>
    </>
  );
};

export default Profile;
