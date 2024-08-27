/* eslint-disable react/prop-types */
import "../styles/ProductColorVariation.css";

export default function ProductColorVariation({ color_code, id, onClick, isSelected, disabled}) {
  return (
    <div
      onClick={() => onClick(id)}
      className={disabled?"ProductColorVariationDisabled":`ProductColorVariation ${isSelected ? "selected" : ""}`}
      style={disabled?{backgroundColor:"#767676"}:{backgroundColor: color_code,}}
    ></div>
  );
}
