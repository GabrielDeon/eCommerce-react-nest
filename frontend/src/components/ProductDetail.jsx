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
import { useDispatch } from "react-redux";
import { addProduct } from "../store/cart/cartSlice";

export default function ProductDetail({ data }) {
  const [quantity, setQuantity] = React.useState(0);
  const [mainImage, setMainImage] = React.useState(data.image_1);
  const [selectedVariation, setSelectedVariation] = React.useState({
    size: "",
    color: "",
  });
  const [SKU, setSKU] = React.useState(
    data.product_variations[0].SKU ? data.product_variations[0].SKU : ""
  );
  const images = [data.image_1, data.image_2, data.image_3, data.image_4];
  const allVariations = data.product_variations ? data.product_variations : "";
  const dispatch = useDispatch();

  const extractUniqueVariations = (productVariations) => {
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

  const removeDuplicatesById = (objectsArray) => {
    // Create a Map to store objects by their unique id
    const uniqueObjects = new Map();

    // Iterate over the array of objects
    objectsArray.forEach((obj) => {
      // If the id is not already in the map, add the object
      if (!uniqueObjects.has(obj.id)) {
        uniqueObjects.set(obj.id, obj);
      }
    });

    // Return an array of unique objects
    return Array.from(uniqueObjects.values());
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
              <ProductSizeVariation
                key={size.id}
                size={size.size_name}
                id={size.id}
                onClick={handleSizeVariationClick}
                isSelected={selectedVariation.size === size.id}
              />
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
                id={color.id}
                onClick={handleColorVariationClick}
                isSelected={selectedVariation.color === color.id}
              />
            ))}
          </div>
        </>
      );
    }
  };

  const generateImageVariations = (arrayImages) => {
    return arrayImages
      .filter((image) => image !== "" && image !== null)
      .map((image) => (
        <ProductImageVariation
          key={image}
          image={image}
          onClick={handleImageClick}
          isSelected={image === mainImage}
        />
      ));
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleColorVariationClick = (id) => {
    setSelectedVariation((prev) => ({
      ...prev,
      color: id,
    }));
  };

  const handleSizeVariationClick = (id) => {
    setSelectedVariation((prev) => ({
      ...prev,
      size: id,
    }));
  };

  const formatPrice = (price) => {
    let floatPrice = parseFloat(price);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(floatPrice);
  };

  const handleAddToCart = () => {    
    if (quantity <= 0) {
      alert("Selected quantity must be higher than 0.");
    } else {
      let chosenProduct = allVariations.find(
        (element) =>
          element.id_size === selectedVariation.size &&
          element.id_color === selectedVariation.color
      );

      if (chosenProduct) {
        if (!(chosenProduct.stock > quantity)) {
          setQuantity(0);
          alert("Quantity selected is not available.");
        } else {
          chosenProduct.image = images[0];
          chosenProduct.selectedQuantity = quantity;
          chosenProduct.name = data.product_name ? data.product_name : "NF";          
          dispatch(addProduct(chosenProduct));
          alert("Product added to the cart!");
        }
      } else {
        alert("This variation of Color/Size is unavailable");
      }
    }
  };

  let { uniqueSizes, uniqueColors } = extractUniqueVariations(
    data.product_variations
  );

  uniqueSizes = removeDuplicatesById(uniqueSizes);
  uniqueColors = removeDuplicatesById(uniqueColors);

  React.useEffect(() => {
    const handleSkuChange = async () => {
      let newSKU = allVariations.find(
        (element) =>
          element.id_size === selectedVariation.size &&
          element.id_color === selectedVariation.color
      );
      if (newSKU) {
        setSKU(newSKU.SKU);
      }
    };

    handleSkuChange();
  }, [allVariations, selectedVariation]);

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
          <div className="pdcdTitle">
            <h1>{data.product_name ? data.product_name : "Product Title"}</h1>
            {data.discount_percentage > 0 ? (
              <p>{data.discount_percentage + "% Off"}</p>
            ) : null}
          </div>
          <div className="pdcdPrice">
            <h2>{data.final_price ? formatPrice(data.final_price) : "$$$$"}</h2>{" "}
            {data.discount_percentage != 0 && (
              <h2 className="pdcdDiscounted">
                {data.base_price ? formatPrice(data.base_price) : "$$$$"}
              </h2>
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
            <button onClick={handleAddToCart} className="btnAddToCart">
              Add to Cart
            </button>
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
              <p>{SKU ? SKU : data.product_variations[0].SKU}</p>
              <p>{data.category.name && data.category.name}</p>
              <p>{data.tags && data.tags}</p>
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
