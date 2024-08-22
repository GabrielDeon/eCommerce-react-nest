/* eslint-disable react/prop-types */
import "../styles/ProductColorVariation.css";

export default function ProductColorVariation(props) {
  return (
    <div
      className="ProductColorVariation"
      style={{
        backgroundColor: props.color_code,
      }}
    ></div>
  );
}
