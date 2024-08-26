import "../styles/Cart.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
  const totalValue = useSelector((state) => state.cart.total_value);
  const products = useSelector((state) => state.cart.products);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="CartComponent">
      <div className="CartComponentContent">
        <div className="cccGrid">
          <div className="cccGridFields">
            <div className="cccgfCell product">
              <p>Product</p>
            </div>
            <div className="cccgfCell price">
              <p>Price</p>
            </div>
            <div className="cccgfCell quantity">
              <p>Quantity</p>
            </div>
            <div className="cccgfCell subtotal">
              <p>Subtotal</p>
            </div>
          </div>
          <div className="cccGridItems">
          {products.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  product_name={item.name}                  
                />
              );
            })}
          </div>
        </div>
        <div className="cccSummary">
          <h1>Cart Totals</h1>
          <div className="cccSummaryValues">
            <p>Subtotal</p>
            <p>{formatPrice(totalValue)}</p>
          </div>
          <div className="cccSummaryValuesTotal">
            <p>Total</p>
            <p className="cccsvFinalValue">{formatPrice(totalValue)}</p>
          </div>
          <button>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
