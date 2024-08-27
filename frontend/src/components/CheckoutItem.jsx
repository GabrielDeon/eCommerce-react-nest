/* eslint-disable react/prop-types */
import "../styles/CheckoutItem.css";
import formatPrice from "../utils/FormatPrice";

const CheckoutItem = ({product_name, selected_quantity, calculated_price}) => {  

  return (
    <div className="checkoutItem">
      <div className="checkItemLeft">
        <p className="checkoutitemName">{product_name}</p>
        <p className="checkoutitemTimes">X</p>
        <p className="checkoutitemQnt">{selected_quantity}</p>
      </div>
      <div>
        <p className="checkoutitemSubtotal">{formatPrice(calculated_price)}</p>
      </div>
    </div>
  );
};

export default CheckoutItem;
