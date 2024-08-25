import "../styles/MiniCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import MinicartItem from "./MiniCartItem";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const Minicart = ({ onClick }) => {
  const products = useSelector((state) => state.cart.products);
  const totalValue = useSelector((state) => state.cart.total_value);
  console.log("Minicart");
  console.log(products);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };
  
  

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
          <button>Cart</button>
          <button>Checkout</button>
          <button>Comparison</button>
        </div>
      </div>
    </div>
  );
};

export default Minicart;
