import axios from 'axios';

class Api {
  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:8000/api',
      withCredentials: true, // Set withCredentials to true
      credentials: 'include',
    });

    this.http.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  /**
   * @param {Object} response - The response from the API.
   * @returns {Object} The response from the API.
   */
  handleSuccess(response) {
    return response;
  }

  /**
   * @param {Object} error - The error from the API.
   * @returns {Promise} A rejected promise with the error.
   */
  handleError(error) {
    const errorObj = {
      response: error.response.data,
      statusCode: error.response.status,
    };
    return Promise.reject(errorObj);
  }
}

export default new Api();
