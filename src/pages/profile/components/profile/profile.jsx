import "./profile.style.scss";
import ProfileIcon from "./../../../../assets/profile.png";
import { useSelector } from "react-redux";
const Profile = () => {
  const userData = useSelector((state) => state.user.userData);
  console.log(userData);
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={ProfileIcon} alt="" />
        <h2>Name : {userData?.name}</h2>
      </div>
    </div>
  );
};

export default Profile;
