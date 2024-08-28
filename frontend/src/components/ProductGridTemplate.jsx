/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareNodes,
  faArrowRightArrowLeft,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/ProductGridTemplate.css";
import formatPrice from "../utils/FormatPrice";

//Product Template that uses the Product class object
function ProductGridTemplate({ props }) {
  let classNameDiscount = "productTag";
  let classNameNew = "productTag";
  let tagText = "";

  const basePrice = parseFloat(props.base_price);
  const finalPrice = parseFloat(props.final_price);

  const handleProductClick = () => {
    window.location.href = `/product/${props.id}`;
  };

  const isCreatedInLast30Days = (date) => {
    const currentDate = new Date();
    const date30DaysAgo = new Date();
    date30DaysAgo.setDate(currentDate.getDate() - 30);
    return date >= date30DaysAgo;
  };

  if (props.created_on) {
    const ProductDate = new Date(props.created_on);

    if (isCreatedInLast30Days(ProductDate)) {
      classNameNew += " pdTagNew";
    } else {
      classNameNew += " pgTagNo";
    }
  } else {
    classNameNew += " pgTagNo";
  }

  if (props.discount_percentage > 0) {
    classNameDiscount += " pdTagDisc";
    tagText = "-" + props.discount_percentage.toString() + "%";
  } else {
    classNameDiscount += " pgTagNo";
  }

  return (
    <div className="product">
      <div
        className="productImage"
        style={{
          background: `url(http://localhost:3000/product-image/${props.image_1})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={classNameDiscount}>{tagText}</div>
        <div className={classNameNew}>New</div>
      </div>
      <div className="productText">
        <div className="productTextContent">
          <h1>{props.product_name}</h1>
          <p>{props.short_description}</p>
          <div className="productPrices">
            <h2>{formatPrice(finalPrice)}</h2>
            {props.base_price && props.discount_percentage > 0 && (
              <h3>{formatPrice(basePrice)}</h3>
            )}
          </div>
        </div>
      </div>

      <div className="hoverScreen">
        <div className="hoverContent">
          <div className="hoverButton">
            <button onClick={handleProductClick}>See Details</button>
          </div>
          <div className="hoverActions">
            <a href="">
              <FontAwesomeIcon icon={faShareNodes} />
              <p>Share</p>
            </a>
            <a href="">
              <FontAwesomeIcon icon={faArrowRightArrowLeft} />
              <p>Compare</p>
            </a>
            <a href="">
              <FontAwesomeIcon icon={faHeart} />
              <p>Like</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductGridTemplate };
