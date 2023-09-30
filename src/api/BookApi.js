import Api from './apiConfigs';

class BookApi {
  endPoints = {
    getAll: '/books/all',
    getBookById: 'books/details/',
    createBook: '/books/create',
  };
  async getAllBooks() {
    return await Api.http.get(this.endPoints.getAll);
  }

  async getBookById(id) {
    return await Api.http.get(this.endPoints.getBookById + id);
  }

  async createBook(data) {
    return await Api.http.post(this.endPoints.createBook, data);
  }
}

export default new BookApi();
