/* eslint-disable react/prop-types */
import "../styles/ProductDetail.css";
import {
  faSquareTwitter,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ProductImageVariation from "./ProductImageVariation";
import ProductColorVariation from "./ProductColorVariation";
import ProductSizeVariation from "./ProductSizeVariation";

export default function ProductDetail() {
  const [quantity, setQuantity] = React.useState(0);
  const [mainImage, setmainImage] = React.useState('car.png');

  return (
    <div className="productDetail">
      <div className="pdContent">
        <div className="pdcImages">
          <div className="pdciSecondaryImgs">
            <ProductImageVariation />
            <ProductImageVariation />
            <ProductImageVariation />
            <ProductImageVariation />
          </div>
          <div
            className="pdciMainImage"
            style={{
              background: `url(http://localhost:3000/product-image/${mainImage})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "rgba(249, 241, 231, 1)",
            }}
          ></div>
        </div>
        <div className="pdcDetails">
          <h1>Product Tile</h1>
          <h2>Product Price</h2>
          <div className="pdcdStarReview">
            <div>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
            <p>| </p>
            <p> 5 Customer Review</p>
          </div>
          <p className="pdcdDescription">
            Product Description Product Description Product Description Product
            Description Product Description Product Description Product
            Description
          </p>
          <p className="detailType">Size</p>
          <div className="pdcdSizes">
            <ProductSizeVariation size='GG'/>
            <ProductSizeVariation size='XL'/>
            <ProductSizeVariation size='SM'/>
          </div>
          <p className="detailType">Color</p>
          <div className="pdcdColors">
            <ProductColorVariation color_code='red'/>
            <ProductColorVariation color_code='green'/>
            <ProductColorVariation color_code='blue'/>
          </div>
          <div className="pdcdControls">
            <div className="addremoveBtn">
              <button
                onClick={() =>
                  setQuantity((prevState) => Math.max(prevState - 1, 0))
                }
                className="decrement-btn"
              >
                -
              </button>
              <input
                type="number"
                className="number-input"
                value={quantity}
                readOnly
              />
              <button
                onClick={() => setQuantity((prevState) => prevState + 1)}
                className="increment-btn"
              >
                +
              </button>
            </div>
            <button className="btnAddToCart">Add to Cart</button>
          </div>
          <div className="pdcdExtras">
            <div className="pdcdExtrasLeft">
              <p>SKU</p>
              <p>Category</p>
              <p>Tags</p>
              <p>Share</p>
            </div>
            <div className="pdcdExtrasMiddle">
              <p>:</p>
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>
            <div className="pdcdExtrasRight">
              <p>Data SKU</p>
              <p>Data Category</p>
              <p>Data Tags</p>
              <div className="pdcdExtrasMidias">
                <FontAwesomeIcon icon={faSquareTwitter} />
                <FontAwesomeIcon icon={faLinkedin} />
                <FontAwesomeIcon icon={faFacebook} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
