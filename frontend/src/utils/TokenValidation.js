import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthenticateToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const dateNow = Math.floor(Date.now() / 1000);
      const { exp } = jwtDecode(token);

      if (!(dateNow < exp)) {
        alert(`token expired: Date Now: ${dateNow} /n Expiration: ${exp}` );
        console.log("Date Now: " + dateNow);
        console.log("Exp: " + exp);

        Cookies.remove("token");
        navigate("/");
      }
      
    }
  }, [navigate]);
};

export default AuthenticateToken;
