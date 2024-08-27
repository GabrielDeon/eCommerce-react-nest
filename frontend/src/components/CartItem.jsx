/* eslint-disable react/prop-types */
import "../styles/CartItem.css";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, updateProduct } from "../store/cart/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import formatPrice from "../utils/FormatPrice";

const CartItem = ({ id, product_name, image }) => {
  const products = useSelector((state) => state.cart.products);
  const productData = products.find((element) => element.id === id);
  const [quantity, setQuantity] = useState(productData.selectedQuantity);

  const dispatch = useDispatch();  

  const handleProductRemove = () => {
    dispatch(removeProduct(id));
  };

  const handleQuantityChange = (operation) => {
    let newQuantity = quantity;
    if (operation === "increment") {
      newQuantity += 1;
    } else if (operation === "decrement" && newQuantity > 1) {
      newQuantity -= 1;
    }

    // Update the local state
    setQuantity(newQuantity);

    // Update the global state
    const updatedProduct = { ...productData, selectedQuantity: newQuantity };
    dispatch(updateProduct({ id, attProduct: updatedProduct }));
  };

  return (
    <div className="CartItem">
      <div className="CartItemImage">
        <img
          src={`http://localhost:3000/product-image/${image}`}
          alt="Product"
        ></img>
      </div>
      <div className="mciValue product">
        <p>{product_name ? product_name : "Name Not Found"}</p>
      </div>
      <div className="mciValue price">
        <p>{formatPrice(productData.final_price)}</p>
      </div>
      <div className="cartaddremoveBtn">
        <button
          onClick={() => handleQuantityChange("decrement")}
          className="cart-item-decrement-btn"
        >
          -
        </button>
        <input
          value={quantity}
          type="number"
          className="cart-item-number-input"
          readOnly
        />
        <button
          onClick={() => handleQuantityChange("increment")}
          className="cart-item-increment-btn"
        >
          +
        </button>
      </div>
      <div className="mciValue subtotal">
        <p>{formatPrice(productData.final_price * quantity)}</p>
      </div>
      <button onClick={handleProductRemove}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default CartItem;
