/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareNodes,
  faArrowRightArrowLeft,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Product.css";

//Product class
class productObject {
  constructor(
    id,
    name,
    description,
    price,
    image,
    discount = 0,
    isNew = false,
    priceWithoutDiscount = ""
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.discount = discount;
    this.isNew = isNew;
    this.priceWithoutDiscount = priceWithoutDiscount;

    if (discount >= 100) {
      this.discount = 99;
    }
  }
}

//Product Template that uses the Product class object
function ProductTemplate({ props }) {
  let className = "productTag";
  let tagText = "";

  if (props.isNew) {
    className += " newProductTag";
    tagText = "New";
  } else if (props.discount_percentage != 0) {
    className += " discountedTag";
    tagText = "-" + props.discount_percentage.toString() + "%";
  } else {
    className = "productTag";
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
        <div className={className}>{tagText}</div>
      </div>
      <div className="productText">
        <div className="productTextContent">
          <h1>{props.product_name}</h1>
          <p>{props.short_description}</p>
          <div className="productPrices">
            <h2>$ {props.final_price}</h2>
            {props.base_price && <h3>$ {props.base_price}</h3>}
          </div>
        </div>
      </div>

      <div className="hoverScreen">
        <div className="hoverContent">
          <div className="hoverButton">
            <button>See Details</button>
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

export { ProductTemplate };
