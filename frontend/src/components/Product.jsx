/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareNodes,
  faArrowRightArrowLeft,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Product.css";
import React from "react";

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

//Array of products that simulates a DB
const productArray = [
  new productObject(
    1,
    "Syltherine",
    "Stylish cafe chair",
    "2.500.000",
    "slytherImage",
    30,
    false,
    "3.500.000"
  ),
  new productObject(
    2,
    "Leviosa",
    "Stylish cafe chair",
    "2.500.000",
    "leviosaImage",
    0,
    false,
    ""
  ),
  new productObject(
    3,
    "Lolito",
    "Luxury big sofa",
    "7.000.000",
    "lolitoImage",
    50,
    false,
    "14.000.000"
  ),
  new productObject(
    4,
    "Respira",
    "Outdoor bar table and stool",
    "500.000",
    "respiraImage",
    0,
    true,
    ""
  ),
  new productObject(
    5,
    "Syltherine",
    "Stylish cafe chair",
    "2.500.000",
    "slytherImage",
    30,
    false,
    "3.500.000"
  ),
  new productObject(
    6,
    "Leviosa",
    "Stylish cafe chair",
    "2.500.000",
    "leviosaImage",
    0,
    false,
    ""
  ),
  new productObject(
    7,
    "Lolito",
    "Luxury big sofa",
    "7.000.000",
    "lolitoImage",
    50,
    false,
    "14.000.000"
  ),
  new productObject(
    8,
    "Respira",
    "Outdoor bar table and stool",
    "500.000",
    "respiraImage",
    0,
    true,
    ""
  ),
  new productObject(
    9,
    "Syltherine",
    "Stylish cafe chair",
    "2.500.000",
    "slytherImage",
    30,
    false,
    "3.500.000"
  ),
  new productObject(
    10,
    "Leviosa",
    "Stylish cafe chair",
    "2.500.000",
    "leviosaImage",
    0,
    false,
    ""
  ),
  new productObject(
    11,
    "Lolito",
    "Luxury big sofa",
    "7.000.000",
    "lolitoImage",
    50,
    false,
    "14.000.000"
  ),
  new productObject(
    12,
    "Respira",
    "Outdoor bar table and stool",
    "500.000",
    "respiraImage",
    0,
    true,
    ""
  ),
  new productObject(
    13,
    "Syltherine",
    "Stylish cafe chair",
    "2.500.000",
    "slytherImage",
    30,
    false,
    "3.500.000"
  ),
  new productObject(
    14,
    "Leviosa",
    "Stylish cafe chair",
    "2.500.000",
    "leviosaImage",
    0,
    false,
    ""
  ),
  new productObject(
    15,
    "Lolito",
    "Luxury big sofa",
    "7.000.000",
    "lolitoImage",
    50,
    false,
    "14.000.000"
  ),
  new productObject(
    16,
    "Respira",
    "Outdoor bar table and stool",
    "500.000",
    "respiraImage",
    0,
    true,
    ""
  ),
  new productObject(
    17,
    "Syltherine",
    "Stylish cafe chair",
    "2.500.000",
    "slytherImage",
    30,
    false,
    "3.500.000"
  ),
  new productObject(
    18,
    "Leviosa",
    "Stylish cafe chair",
    "2.500.000",
    "leviosaImage",
    0,
    false,
    ""
  ),
  new productObject(
    19,
    "Lolito",
    "Luxury big sofa",
    "7.000.000",
    "lolitoImage",
    50,
    false,
    "14.000.000"
  ),
  new productObject(
    20,
    "Respira",
    "Outdoor bar table and stool",
    "500.000",
    "respiraImage",
    0,
    true,
    ""
  ),
  new productObject(
    21,
    "Syltherine",
    "Stylish cafe chair",
    "2.500.000",
    "slytherImage",
    30,
    false,
    "3.500.000"
  ),
  new productObject(
    22,
    "Leviosa",
    "Stylish cafe chair",
    "2.500.000",
    "leviosaImage",
    0,
    false,
    ""
  ),
  new productObject(
    23,
    "Lolito",
    "Luxury big sofa",
    "7.000.000",
    "lolitoImage",
    50,
    false,
    "14.000.000"
  ),
  new productObject(
    24,
    "Respira",
    "Outdoor bar table and stool",
    "500.000",
    "respiraImage",
    0,
    true,
    ""
  ),
  new productObject(
    25,
    "Syltherine",
    "Stylish cafe chair",
    "2.500.000",
    "slytherImage",
    30,
    false,
    "3.500.000"
  ),
  new productObject(
    26,
    "Leviosa",
    "Stylish cafe chair",
    "2.500.000",
    "leviosaImage",
    0,
    false,
    ""
  ),
  new productObject(
    27,
    "Lolito",
    "Luxury big sofa",
    "7.000.000",
    "lolitoImage",
    50,
    false,
    "14.000.000"
  ),
  new productObject(
    28,
    "Respira",
    "Outdoor bar table and stool",
    "500.000",
    "respiraImage",
    0,
    true,
    ""
  ),
  new productObject(
    29,
    "Syltherine",
    "Stylish cafe chair",
    "2.500.000",
    "slytherImage",
    30,
    false,
    "3.500.000"
  ),
  new productObject(
    30,
    "Leviosa",
    "Stylish cafe chair",
    "2.500.000",
    "leviosaImage",
    0,
    false,
    ""
  ),
  new productObject(
    31,
    "Lolito",
    "Luxury big sofa",
    "7.000.000",
    "lolitoImage",
    50,
    false,
    "14.000.000"
  ),
  new productObject(
    32,
    "Respira",
    "Outdoor bar table and stool",
    "500.000",
    "respiraImage",
    0,
    true,
    ""
  ),
  new productObject(
    33,
    "Ouroboros",
    "Pool",
    "520.025",
    "respiraImage",
    99,
    false,
    "♾️"
  ),
];

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
            <h2>Rp {props.final_price}</h2>
            {props.base_price && <h3>Rp {props.base_price}</h3>}
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

// eslint-disable-next-line react-refresh/only-export-components
export { ProductTemplate, productArray };
