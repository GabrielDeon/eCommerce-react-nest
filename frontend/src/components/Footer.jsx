import React from "react";
import './Footer.css';

function Footer() {
  //Hooks
  const [email, setEmail] = React.useState("");
  const [emailStatus, setEmailStatus] = React.useState("");

  //Handlers
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateEmail(email)) {
      setEmailStatus("sucess");
    } else {
      setEmailStatus("error");
    }
  };

  //Regexp function to validate email
  function validateEmail($email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test($email);
  }  

  return (
    <div className="footer">
      <header className="footerContent">
        <div className="footerContentTop">
          <div className="fctStreet">
            <h1>footer.</h1>
            <p>
              Rua Alexandre Dumas, 1711 - 6º andar - Chácara Santo Antônio, São
              Paulo - SP, 04717-004
            </p>
          </div>
          <div className="fctItens">
            <div className="fctItensLinks">
              <p>Links</p>
              <ul>
                <li>
                  <a href="">Home</a>
                </li>
                <li>
                  <a href="">Shop</a>
                </li>
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Contact</a>
                </li>
              </ul>
            </div>
            <div className="fctItensHelp">
              <p>Help</p>
              <ul>
                <li>
                  <a href="">Payment Options</a>
                </li>
                <li>
                  <a href="">Returns</a>
                </li>
                <li>
                  <a href="">Privacy Policies</a>
                </li>
              </ul>
            </div>
            <div className="fctNewsletter">
              <p>Newsletter</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter Your Email Address"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                ></input>                
                <button type="submit">SUBSCRIBE</button>
                {emailStatus && <span className={emailStatus}> {emailStatus == "sucess"? "Email subscribed!": "Invalid Email!" }  </span>}
              </form>
            </div>
          </div>
        </div>
        <div className="footerContentBot">
          <p>2024 Compass UOL</p>
        </div>
      </header>
    </div>
  );
}

export default Footer;
