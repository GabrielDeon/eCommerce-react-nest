import "../styles/MiniCartItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
const MinicartItem = () => {
  return (
    <div className="MiniCartItem">
      <img className="MiniCartItemImage" src="http://localhost:3000/product-image/car.png"></img>
      <div className="MiniCartItemData">
        <h3>Item Name</h3>
        <div className="mcidQuantityPrice">
          <p>12</p>
          <p>X</p>
          <p>$470.000,00</p>
        </div>
      </div>
      <div className="mcidButtonRight">
        <button>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </div>
    </div>
  );
};

export default MinicartItem;
