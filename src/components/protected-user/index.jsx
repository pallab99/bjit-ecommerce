/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
function Protected({ isUser, children }) {
  if (!isUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default Protected;
