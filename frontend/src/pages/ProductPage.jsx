import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import PageTitleSmall from "../components/PageTitleSmall.jsx";
import ProductDetail from "../components/ProductDetail.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import axios from "axios";
import AuthenticateToken from "../utils/TokenValidation";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function ShopPage() {
  AuthenticateToken();
  ScrollToTop();
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product/${productId}`);
        setProductData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductData();
  }, [productId]);

  return (
    <>
      <Header />
      <PageTitleSmall />
      {productData ? <ProductDetail data={productData} /> : <p>Loading...</p>}
      <RelatedProducts/>
      <Footer />
    </>
  );
}
