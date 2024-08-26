import Header from "../components/Header.jsx";
import PageTitle from "../components/PageTitle.jsx";
import InfoQuality from "../components/InfoQuality.jsx";
import Footer from "../components/Footer.jsx";
import Checkout from "../components/Checkout.jsx";

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <PageTitle name={"Checkout"} />
      <Checkout />
      <InfoQuality />
      <Footer />
    </>
  );
}
