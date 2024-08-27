/* eslint-disable react/prop-types */
import "../styles/ProductSizeVariation.css";

export default function ProductSizeVariation({
  size,
  id,
  onClick,
  isSelected,
  disabled,
}) {
  return (
    <div
      className={`${
        disabled ? "productSizeVariationDisabled" : "productSizeVariation"
      } ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(id)}
    >
      <p>{size ? size : "NF"}</p>
    </div>
  );
}
