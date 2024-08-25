import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBars,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Minicart from "./MiniCart";
import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

function Header() {
  const [showMinicart, setShowMinicart] = useState(false);
  
  const toggleMinicart = () => {
    setShowMinicart(!showMinicart);
  };

  const handleLogOut = () => {
    Cookies.remove("token");    
    window.location.href = '/';
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
          <Link to="/shop">Shop</Link>
          <a href="">About</a>
          <a href="">Contact</a>
        </div>
        <div className="headerRight">
          <button href="" className="headerIcon">
            <FontAwesomeIcon icon={faUser} />
          </button>
          <button href="" className="headerIcon" onClick={toggleMinicart}>
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
          <button href="" onClick={handleLogOut} className="headerIcon">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
          <button href="" className="headerIconBars">
            <FontAwesomeIcon icon={faBars} />
          </button>
          {showMinicart && <Minicart onClick={toggleMinicart}/>}
        </div>
      </header>
    </div>
  );
}

export default Header;
