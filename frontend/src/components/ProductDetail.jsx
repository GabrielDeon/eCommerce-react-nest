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

export default function ProductDetail({ data }) {
  const [quantity, setQuantity] = React.useState(0);

  const extractUniqueIds = (productVariations) => {
    const sizes = new Set();
    const colors = new Set();

    if (Array.isArray(productVariations)) {
      productVariations.forEach((variation) => {
        // Ensure records with specific IDs are not included
        if (
          variation.id_size &&
          variation.id_size !== "00000000-0000-0000-0000-000000000001"
        ) {
          sizes.add(variation.size);
        }

        if (
          variation.id_color &&
          variation.id_color !== "00000000-0000-0000-0000-000000000002"
        ) {
          colors.add(variation.color);
        }
      });
    }
    return {
      uniqueSizes: Array.from(sizes),
      uniqueColors: Array.from(colors),
    };
  };

  const generateSizeVariations = (arraySizes) => {
    if (arraySizes.length === 0) {
      return <></>;
    } else {
      return (
        <>
          <p className="detailType">Size</p>
          <div className="pdcdSizes">
            {arraySizes.map((size) => (
              <ProductSizeVariation key={size.id} size={size.size_name} />
            ))}
          </div>
        </>
      );
    }
  };

  const generateColorVariations = (arrayColors) => {
    if (arrayColors.length === 0) {
      return <></>;
    } else {
      return (
        <>
          <p className="detailType">Color</p>
          <div className="pdcdColors">
            {arrayColors.map((color) => (
              <ProductColorVariation
                key={color.id}
                color_code={color.color_code}
              />
            ))}
          </div>
        </>
      );
    }
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const generateImageVariations = (arrayImages) => {
    // const rightStyle = {
    //   background: url(http://localhost:3000/product-image/${image}),
    //   backgroundSize: "contain",
    //   backgroundPosition: "center",
    //   backgroundRepeat: "no-repeat",
    //   backgroundColor: "rgba(249, 241, 231, 1)",
    // };

    return arrayImages
      .filter((image) => image !== "")
      .map((image) => (
        <ProductImageVariation
          key={image}
          image={image}
          onClick={handleImageClick}
        />
      ));
  };

  const images = [data.image_1, data.image_2, data.image_3, data.image_4];
  const { uniqueSizes, uniqueColors } = extractUniqueIds(
    data.product_variations
  );

  const [mainImage, setMainImage] = React.useState(images[0]);

  return (
    <div className="productDetail">
      <div className="pdContent">
        <div className="pdcImages">
          <div className="pdciSecondaryImgs">
            {generateImageVariations(images)}
          </div>
          <div className="pdciMainImage">
            <img src={`http://localhost:3000/product-image/${mainImage}`}></img>
          </div>
        </div>
        <div className="pdcDetails">
          <h1>{data.product_name ? data.product_name : "Product Title"}</h1>
          <div className="pdcdPrice">
            <h2>{data.final_price ? "$" + data.final_price : "$$$$"}</h2>{" "}
            {data.discount_percentage != 0 && (
              <h2>{data.base_price ? "$" + data.base_price : "$$$$"}</h2>
            )}
          </div>
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
            {data.description ? data.description : null}
          </p>
          {generateSizeVariations(uniqueSizes)}
          {generateColorVariations(uniqueColors)}

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
