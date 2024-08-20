import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthenticateToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const dateNow = Date.now() / 1000;
      const { exp } = jwtDecode(token);

      if (dateNow < exp) {
        navigate("/shop");
      }
    }
  }, [navigate]);
};

export default AuthenticateToken;
