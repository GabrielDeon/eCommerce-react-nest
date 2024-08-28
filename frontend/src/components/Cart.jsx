import "../styles/Cart.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import formatPrice from "../utils/FormatPrice";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast, Bounce } from 'react-toastify';

const Cart = () => {
  const totalValue = useSelector((state) => state.cart.total_value);
  const products = useSelector((state) => state.cart.products);

  const RedirectSignin = () => {
    toast.info('You need to be logged to proceed.', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      onClose: ()=> window.location.href = "/signin"   
    });    
  }

  const handleCheckoutClick = () => {
    const token = Cookies.get("token");

    if (!token) {
      RedirectSignin();
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      if (decodedToken.exp && decodedToken.exp > currentTime) {
        window.location.href = "/checkout";
      } else {
        console.log("Token has expired. User needs to log in again.");
      }
    } catch (error) {
      console.log("Error decoding token:", error);
    }
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
          <button onClick={handleCheckoutClick}>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
