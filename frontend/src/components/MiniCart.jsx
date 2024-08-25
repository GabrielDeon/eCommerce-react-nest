import "../styles/MiniCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import MinicartItem from "./MiniCartItem";

// eslint-disable-next-line react/prop-types
const Minicart = ({ onClick }) => {
  return (
    <div className="overlay">
      <div className="minicart">
        <div className="minicartContent">
          <div className="minicartTop">
            <h3 className="minicart-title">Shopping Cart</h3>
            <button onClick={onClick}>
              <FontAwesomeIcon
                className="minicartIcon"
                icon={faRectangleXmark}
              />
            </button>
          </div>

          <hr className="minicartSeparator" />
          <div className="minicart-items">
            <MinicartItem />
            <MinicartItem />
            <MinicartItem />
          </div>
          <div className="minicartTotals">
            <p>Subtotal</p>
            <p>$500</p>
          </div>
        </div>
        <div className="minicart-buttons">
          <button>Cart</button>
          <button>Checkout</button>
          <button>Comparison</button>
        </div>
      </div>
    </div>
  );
};

export default Minicart;
