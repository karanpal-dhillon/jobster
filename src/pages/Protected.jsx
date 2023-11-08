import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector((state) => selectUser(state));
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default Protected;
