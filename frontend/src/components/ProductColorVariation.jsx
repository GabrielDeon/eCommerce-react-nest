/* eslint-disable react/prop-types */
import "../styles/ProductColorVariation.css";

export default function ProductColorVariation({ color_code, id, onClick, isSelected}) {
  return (
    <div
      onClick={() => onClick(id)}
      className={`ProductColorVariation ${isSelected ? "selected" : ""}`}
      style={{
        backgroundColor: color_code,
      }}
    ></div>
  );
}
