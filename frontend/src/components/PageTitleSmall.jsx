/* eslint-disable react/prop-types */
import "../styles/PageTitleSmall.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PageTitleSmall({ productName }) {
  return (
    <div className="smallPageTitle">
      <p className="sptPath">Home</p>
      <FontAwesomeIcon icon={faChevronRight} />
      <p className="sptPath">Shop</p>
      <FontAwesomeIcon icon={faChevronRight} />
      <p className="sptProduct">
        {productName ? productName : "Product Name"}
        <b></b>
      </p>
    </div>
  );
}
