/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "../styles/RelatedProducts.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductGridTemplate } from "./ProductGridTemplate";

export default function RelatedProducts({ productId, categoryId }) {
  const [categoryItems, setCategoryItems] = useState([]);
  const [showMore, setShowMore] = useState("hidden");

  const handleSeeMore = () => {
    if (showMore === "hidden") {
      setShowMore("");
    } else if (showMore === "") {
      window.location.href = "/shop";
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const getItems = async (params) => {
          const response = await axios.get("http://localhost:3000/product", {
            params,
          });
          const { totalPages, totalProducts, ...rest } = response.data;
          return Object.values(rest);
        };

        let categoryItems = await getItems({ perPage: 16, categoryId });

        if (categoryItems.length <= 4) {
          categoryItems = await getItems({ perPage: 16 });
        }

        const uniqueItems = new Map(
          categoryItems.map((item) => [item.id, item])
        );

        setCategoryItems(Array.from(uniqueItems.values()));
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, [categoryId]);

  return (
    <div className="RelatedProducts">
      <div className="RelatedProductsContent">
        <h1>Related Products</h1>

        <div className="rpcProducts">
          <div className="rpcProductsFirstLine">
            {categoryItems.slice(0, 4).map((item) => {
              return <ProductGridTemplate key={item.id} props={item} />;
            })}
          </div>
          <div className={`rpcProductsSecondLine ${showMore}`}>
            {categoryItems.slice(4, 8).map((item) => {
              return <ProductGridTemplate key={item.id} props={item} />;
            })}
          </div>
        </div>
        <div className="rpcBtn">
          <button onClick={handleSeeMore}>Show More</button>
        </div>
      </div>
    </div>
  );
}
