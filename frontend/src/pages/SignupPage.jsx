import "../styles/SignupPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function SignUpPage() {
  return (
    <div className="page">
      <div className="form">
        <div className="formContent">
          <h1>Get Started Now</h1>
          <p className="forminstruction">
            Enter your credentials to access your account
          </p>

          <label className="inputLabel">Name</label>
          <input
            className="input"
            type="text"
            placeholder="Enter your name"
          ></input>

          <label className="inputLabel">Email Address</label>
          <input
            className="input"
            type="text"
            placeholder="Enter your email"
          ></input>

          <label className="inputLabel secret">Password</label>
          <input
            className="input"
            type="password"
            placeholder="Enter your password"
          ></input>

          <div className="terms">
            <p>
              I agree to the <a href="">terms & policy</a>
            </p>
            <input type="checkbox" id="terms-checkbox" />
          </div>

          <button id="btnSignup">Signup</button>

          <div className="OrText">
            <p>Or</p>
          </div>
          <div className="outsideSignups">
            <button>
              <FontAwesomeIcon className="brand" icon={faGoogle} />
              Sign in with Google
            </button>
            <button>
              <FontAwesomeIcon className="brand" icon={faApple} />
              Sign in with Apple
            </button>
          </div>
          <div className="SingInRedirection">
            <p>
              Have an account? <a href="">Sign In</a>
            </p>
          </div>
        </div>
      </div>
      <div className="leftSideImage"></div>
    </div>
  );
}
