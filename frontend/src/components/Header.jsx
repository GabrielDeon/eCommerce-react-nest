import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBars,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Minicart from "./MiniCart";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthenticateToken from "../utils/TokenValidation";
import Cookies from "js-cookie";
import { toast, Bounce } from "react-toastify";

function Header() {
  const [showMinicart, setShowMinicart] = useState(false);
  const [logged, setLogged] = useState(AuthenticateToken());

  const toggleMinicart = () => {
    setShowMinicart(!showMinicart);
  };

  const handleUserClick = () => {
    if(!logged) {
      window.location.href = "/signin";
    }
  }

  const handleLogOut = () => {
     Cookies.remove("token");
     setLogged(AuthenticateToken());
     toast.info(`User logged out.`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  return (
    <div className="header">
      <header className="header">
        <div className="headerLeft">
          <img className="headerLogo" src="/header_Logo.png"></img>
          <a href="">Furniro</a>
        </div>
        <div className="headerMid hover-effect">
          <a href="">Home</a>
          <Link to="/">Shop</Link>
          <a href="">About</a>
          <a href="">Contact</a>
        </div>
        <div className="headerRight">
          <button onClick={handleUserClick} href="" className="headerIcon">
            <FontAwesomeIcon icon={faUser} />
          </button>
          <button href="" className="headerIcon" onClick={toggleMinicart}>
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
          {logged && (
            <button href="" onClick={handleLogOut} className="headerIcon">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
          )}

          <button href="" className="headerIconBars">
            <FontAwesomeIcon icon={faBars} />
          </button>
          {showMinicart && <Minicart onClick={toggleMinicart} />}
        </div>
      </header>
    </div>
  );
}

export default Header;
