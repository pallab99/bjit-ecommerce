import Api from "./apiConfigs";

class AuthApi {
  endPoints = {
    signIn: "/auth/login",
    signUp: "/auth/sign-up",
  };
  async signIn(data) {
    return await Api.http.post(this.endPoints.signIn, data);
  }
  async signUp(data) {
    console.log(data);
    return await Api.http.post(this.endPoints.signUp, data);
  }
}

export default new AuthApi();
