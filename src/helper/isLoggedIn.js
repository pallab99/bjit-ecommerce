import Cookies from "js-cookie";

export const isLoggedIn = () => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  //   console.log(accessToken, refreshToken);
  if (accessToken && refreshToken) {
    return true;
  }
  return false;
};
