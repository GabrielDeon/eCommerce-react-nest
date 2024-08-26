import Header from "../components/Header.jsx";
import PageTitle from "../components/PageTitle.jsx";
import InfoQuality from "../components/InfoQuality.jsx";
import Footer from "../components/Footer.jsx";
import Cart from "../components/Cart.jsx";

export default function CartPage() {
  return (
    <>
      <Header />
      <PageTitle name={"Cart"}/>      
      <Cart/>
      <InfoQuality />
      <Footer />
    </>
  );
}
