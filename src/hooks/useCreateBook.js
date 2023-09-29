import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useFormSubmit(initialState, url) {
  const [data, setData] = useState(initialState);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    console.log("data", data);
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return [data, setData, handleSubmit];
}

export default useFormSubmit;
