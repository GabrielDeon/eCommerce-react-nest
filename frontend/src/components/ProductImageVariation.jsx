/* eslint-disable react/prop-types */
import "../styles/ProductImageVariation.css";

export default function ProductImageVariation({ image, onClick, isSelected }) {
  return (
    <div
      className={`productImageVariation ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(image)}
    >
      <img src={`http://localhost:3000/product-image/${image}`}></img>
    </div>
  );
}
