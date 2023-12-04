import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isAuthenticate } = useAuth();

  useEffect(
    function () {
      if (!isAuthenticate) navigate("/");
    },
    [isAuthenticate, navigate]
  );

  return isAuthenticate ? children : null;
}
export default ProtectedRoute;
