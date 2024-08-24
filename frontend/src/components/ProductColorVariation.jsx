/* eslint-disable react/prop-types */
import "../styles/ProductColorVariation.css";

export default function ProductColorVariation({ color_code, id, onClick }) {
  return (
    <div
      onClick={() => onClick(id)}
      className="ProductColorVariation"
      style={{
        backgroundColor: color_code,
      }}
    ></div>
  );
}
