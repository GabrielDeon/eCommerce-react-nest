/* eslint-disable react/prop-types */
import "../styles/MiniCartItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeProduct } from "../store/cart/cartSlice";

const MinicartItem = ({ id, image, name, selectedQuantity, final_price }) => {
  const dispatch = useDispatch();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleProductRemove = () => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="MiniCartItem">
      <img
        className="MiniCartItemImage"
        src={`http://localhost:3000/product-image/${image}`}
      ></img>

      <div className="MiniCartItemData">
        <h3>{name}</h3>
        <div className="mcidQuantityPrice">
          <p>{selectedQuantity ? selectedQuantity : "NF"}</p>
          <p>X</p>
          <p>{final_price ? formatPrice(final_price) : "NF"}</p>
        </div>
      </div>
      <div className="mcidButtonRight">
        <button onClick={handleProductRemove}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
      </div>
    </div>
  );
};

export default MinicartItem;
