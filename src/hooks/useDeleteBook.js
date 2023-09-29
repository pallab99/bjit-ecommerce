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
        // Perform any additional actions after successful deletion
      } else {
        console.log("Error occurred while deleting book");
        // Handle error case
      }
    } catch (error) {
      console.log("Error occurred while deleting book:", error);
      // Handle error case
    }
  };
  return { handleDeleteBook };
};

export default useDeleteBook;
