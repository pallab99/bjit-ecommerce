/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
function Protected({ admin, children }) {
  if (!admin) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default Protected;
