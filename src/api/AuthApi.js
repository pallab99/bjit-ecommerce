import Api from "./apiConfigs";

class AuthApi {
  endPoints = {
    signIn: "/auth/login",
    signUp: "/auth/sign-up",
    verifyAccount: "/auth/verify-account",
  };
  async signIn(data) {
    return await Api.http.post(this.endPoints.signIn, data);
  }
  async signUp(data) {
    return await Api.http.post(this.endPoints.signUp, data);
  }

  async verifyAccount(data) {
    return await Api.http.post(this.endPoints.verifyAccount, data);
  }
}

export default new AuthApi();
