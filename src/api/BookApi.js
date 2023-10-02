import Api from "./apiConfigs";

class BookApi {
  endPoints = {
    getAll: "/books/all",
    getBookById: "books/details/",
    createBook: "/books/create",
    updateBookById: "/books/update/",
    deleteBookById: "/books/delete/",
  };
  async getAllBooks(searchTerm, sortBy, sortOrder) {
    let queryParams = "";

    if (searchTerm) {
      queryParams += `?search=${searchTerm}`;
    }

    if (sortBy && sortOrder) {
      queryParams += queryParams ? "&" : "?";
      queryParams += `sortBy=${sortBy}&sortOrder=${sortOrder}`;
    }
    console.log(queryParams);
    return await Api.http.get(this.endPoints.getAll + queryParams);
  }

  async getBookById(id) {
    return await Api.http.get(this.endPoints.getBookById + id);
  }

  async createBook(data) {
    return await Api.http.post(this.endPoints.createBook, data);
  }

  async deleteBookById(id) {
    return await Api.http.delete(this.endPoints.deleteBookById + id);
  }

  async updateBookById(id, data) {
    return await Api.http.patch(this.endPoints.updateBookById + id, data);
  }
}

export default new BookApi();
