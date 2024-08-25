/* eslint-disable react/prop-types */
import "../styles/ProductSizeVariation.css";

export default function ProductSizeVariation({ size, id, onClick, isSelected }) {
  return (
    <div className={`productSizeVariation ${isSelected? "selected" : ""}`} onClick={() => onClick(id)}>
      <p>{size ? size : "NF"}</p>
    </div>
  );
}
