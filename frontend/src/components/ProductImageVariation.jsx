/* eslint-disable react/prop-types */
import "../styles/ProductImageVariation.css";

export default function ProductImageVariation(props) {
  return (
    <div
      className="productImageVariation"
      style={{
        //background: `url(http://localhost:3000/product-image/${props.image})`,
        background: `url(http://localhost:3000/product-image/fish3.png)`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(249, 241, 231, 1)",
      }}
    ></div>
  );
}
