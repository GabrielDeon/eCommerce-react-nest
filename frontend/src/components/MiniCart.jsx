import "../styles/MiniCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import MinicartItem from "./MiniCartItem";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const Minicart = ({ onClick }) => {
  const products = useSelector((state) => state.cart.products);
  const totalValue = useSelector((state) => state.cart.total_value);  

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleCartClick = () => {
    window.location.href = "/cart";
  }

  const handleCheckoutClick = () => {
    window.location.href = "/checkout";
  }

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
            {products.map((item) => {
              return (
                <MinicartItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  selectedQuantity={item.selectedQuantity}
                  final_price={item.final_price}
                />
              );
            })}
          </div>
          <div className="minicartTotals">
            <p>Subtotal</p>
            <p>{formatPrice(totalValue)}</p>
          </div>
        </div>
        <div className="minicart-buttons">
          <button onClick={handleCartClick}>Cart</button>
          <button onClick={handleCheckoutClick}>Checkout</button>
          <button>Comparison</button>
        </div>
      </div>
    </div>
  );
};

export default Minicart;
