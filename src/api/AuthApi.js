import Api from "./apiConfigs";

class AuthApi {
  endPoints = {
    signIn: "/auth/login",
  };
  async signIn(data) {
    return await Api.http.post(this.endPoints.signIn, data);
  }
}

export default new AuthApi();
