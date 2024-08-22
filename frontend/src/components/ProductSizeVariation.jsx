/* eslint-disable react/prop-types */
import "../styles/ProductSizeVariation.css";

export default function ProductSizeVariation(props) {
  return (
    <div className="productSizeVariation">
      <p>{props.size ? props.size : "NF"}</p>
    </div>
  );
}
