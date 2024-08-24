/* eslint-disable react/prop-types */
import "../styles/ProductSizeVariation.css";

export default function ProductSizeVariation({ size, id, onClick }) {
  return (
    <div className="productSizeVariation" onClick={() => onClick(id)}>
      <p>{size ? size : "NF"}</p>
    </div>
  );
}
