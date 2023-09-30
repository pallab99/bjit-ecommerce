import Api from './apiConfigs';

class AuthApi {
  endPoints = {
    signin: '/auth/login',
    getBookById: 'books/details/',
  };
  async signIn(data) {
    return await Api.http.post(this.endPoints.signin, data);
  }

  async getBookById(id) {
    return await Api.http.get(this.endPoints.getBookById + id);
  }
}

export default new AuthApi();
