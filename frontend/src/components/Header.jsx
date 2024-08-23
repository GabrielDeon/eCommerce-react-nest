import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBars,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    Cookies.remove("token");
    navigate("/");
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
          <a href="" className="headerIcon">
            <FontAwesomeIcon icon={faUser} />
          </a>
          <a href="" className="headerIcon">
            <FontAwesomeIcon icon={faCartShopping} />
          </a>
          <a href="" onClick={handleLogOut} className="headerIcon">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </a>
          <a href="" className="headerIconBars">
            <FontAwesomeIcon icon={faBars} />
          </a>
        </div>
      </header>
    </div>
  );
}

export default Header;
