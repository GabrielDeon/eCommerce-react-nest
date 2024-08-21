import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping, faBars} from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css'
 
function Header() {
  return (
    <div className='header'>
      <header className='header'>
        <div className='headerLeft'>
          <img className='headerLogo' src='header_Logo.png'></img>
          <a href=''>Furniro</a>
        </div>
        <div className='headerMid hover-effect'>
          <a href=''>Home</a>
          <a href=''>Shop</a>
          <a href=''>About</a>
          <a href=''>Contact</a>
        </div>
        <div className='headerRight'>        
          <a href='' className='headerIcon'><FontAwesomeIcon icon={faUser} /></a>          
          <a href='' className='headerIcon'><FontAwesomeIcon icon={faCartShopping} /></a>
          <a href='' className='headerIconBars'><FontAwesomeIcon icon={faBars} /></a>  
        </div>
      </header>
    </div>
  );
}

export default Header;
