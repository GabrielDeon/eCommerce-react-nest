/* eslint-disable react/prop-types */
import "../styles/ProductImageVariation.css";

export default function ProductImageVariation({ image, onClick }) {
  return (
    <div className="productImageVariation" onClick={() => onClick(image)}>
      <img src={`http://localhost:3000/product-image/${image}`}></img>
    </div>
  );
}
