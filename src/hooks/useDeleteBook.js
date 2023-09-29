import { useNavigate } from "react-router-dom";

const useDeleteBook = (bookId) => {
  const navigate = useNavigate();

  const handleDeleteBook = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/books/delete/${bookId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Book deleted successfully");
        navigate("/");
      } else {
        console.log("Error occurred while deleting book");
      }
    } catch (error) {
      console.log("Error occurred while deleting book:", error);
    }
  };
  return { handleDeleteBook };
};

export default useDeleteBook;
