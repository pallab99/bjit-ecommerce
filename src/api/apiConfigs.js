import axios from "axios";

class Api {
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:8000/api",
      timeout: 3000,
      withCredentials: true,
    });
    this.handleError = this.handleError.bind(this);

    this.http.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  handleSuccess(response) {
    return response;
  }

  async handleError(error) {
    try {
      if (
        error.config.url !== "/auth/sign-up" &&
        error.response.status === 401
      ) {
        console.log(error);
        await this.http.post("/auth/refreshToken");
        return this.http.request(error.config);
      }
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
    const errorObj = {
      response: error.response.data,
      statusCode: error.response.status,
    };
    return Promise.reject(errorObj);
  }
}

export default new Api();
