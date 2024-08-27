import "../styles/Checkout.css";
import CheckoutItem from "./CheckoutItem";
import { useSelector } from "react-redux";
import formatPrice from "../utils/FormatPrice";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function Checkout() {
  const totalValue = useSelector((state) => state.cart.total_value);
  const products = useSelector((state) => state.cart.products);

  const [orderValues, setOrderValues] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    zipCode: "",
    country: "",
    streetAddress: "",
    city: "",
    province: "",
    addressLine2: "",
    email: "",
    additionalInfo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderValues({
      ...orderValues,
      [name]: value,
    });
  };

  const CreateBill = async (id_cart) => {
    try {
      const billData = {
        id_cart: id_cart,
        first_name: orderValues.firstName,
        last_name: orderValues.lastName,
        company_name: orderValues.companyName,
        zip_code: orderValues.zipCode,
        country_region: orderValues.country,
        street_address: orderValues.streetAddress,
        city_town: orderValues.city,
        province: orderValues.province,
        address_line_2: orderValues.addressLine2,
        email_address: orderValues.email,
        additional_info: orderValues.additionalInfo,
        final_price: `${totalValue}`,
      };      

      await axios.post("http://localhost:3000/bill", billData);

      toast.success("Your order has been made. Waiting for payment!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

    } catch (error) {
      console.log(error);
    }
  };

  const PlaceOrder = async (e) => {
    e.preventDefault();

    try {
      const decodedToken = await jwtDecode(Cookies.get("token"));

      const responseCartCreation = await axios.post(
        "http://localhost:3000/cart",
        {
          id_user: decodedToken.sub,
        }
      );

      products.forEach(async (element) => {
        try {
          await axios.post("http://localhost:3000/cart-item", {
            id_cart: responseCartCreation.data.id,
            id_product_variation: element.id,
            quantity: element.selectedQuantity,
            price_at_addition: element.base_price,
          });
        } catch (error) {
          console.log("Error", error.message);
        }
      });

      CreateBill(responseCartCreation.data.id);
    } catch (err) {
      console.error(
        `Error while creating a Cart and its items: ` + err.message
      );
    }   
  };

  return (
    <div className="checkout">
      <div className="checkoutContent">
        <div className="checkoutContentLeft">
          <h1>Billing Details</h1>
          <form id="checkoutForm" onSubmit={PlaceOrder}>
            <div className="checkoutContentNames">
              <div>
                <p>First Name</p>
                <input
                  type="text"
                  name="firstName"
                  value={orderValues.firstName}
                  onChange={handleInputChange}
                  required
                ></input>
              </div>
              <div>
                <p>Last Name</p>
                <input
                  type="text"
                  name="lastName"
                  value={orderValues.lastName}
                  onChange={handleInputChange}
                  required
                ></input>
              </div>
            </div>
            <div>
              <p>{`Company Name (Optional)`} </p>
              <input
                type="text"
                name="companyName"
                value={orderValues.companyName}
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="checkoutBasicField">
              <p>ZIP code</p>
              <input
                type="text"
                name="zipCode"
                value={orderValues.zipCode}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="checkoutBasicField">
              <p>Country / Region</p>
              <input
                type="text"
                name="country"
                value={orderValues.country}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="checkoutBasicField">
              <p>Street address</p>
              <input
                type="text"
                name="streetAddress"
                value={orderValues.streetAddress}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="checkoutBasicField">
              <p>Town / City</p>
              <input
                type="text"
                name="city"
                value={orderValues.city}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="checkoutBasicField">
              <p>Province</p>
              <input
                type="text"
                name="province"
                value={orderValues.province}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="checkoutBasicField">
              <p>Add-on address</p>
              <input
                type="text"
                name="addressLine2"
                value={orderValues.addressLine2}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="checkoutBasicField">
              <p>Email address</p>
              <input
                type="text"
                name="email"
                value={orderValues.email}
                onChange={handleInputChange}
                required
              ></input>
            </div>
            <div className="checkoutBasicField last">
              <input
                type="text"
                name="additionalInfo"
                placeholder="Additional Information"
                value={orderValues.additionalInfo}
                onChange={handleInputChange}
              ></input>
            </div>
          </form>
        </div>
      </div>
      <div className="checkoutContentRight">
        <div className="ccrMirror">
          <div>
            <h2>Product</h2>
          </div>
          <h2>Subtotal</h2>
        </div>
        <div className="checkoutContentItems">
          {products.map((item) => {
            return (
              <CheckoutItem
                key={item.id}
                id={item.id}
                selected_quantity={item.selectedQuantity}
                calculated_price={item.calculated_price}
                product_name={item.name}
              />
            );
          })}
        </div>
        <div className="cctSubtotal ccrMirror">
          <p>Subtotal</p>
          <p>{formatPrice(totalValue)}</p>
        </div>
        <div className="cctTotal ccrMirror">
          <p>Total</p>
          <p>{formatPrice(totalValue)}</p>
        </div>

        <div className="checkoutRightOrder">
          <div className="croSelectedMethod">
            <div className="croBall Selected"></div>
            <p> Direct Bank Transfer</p>
          </div>
          <div className="croSelectedInfo">
            <p>
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference. Your order will not be shipped
              until the funds have cleared in our account.
            </p>
          </div>
          <div className="croOtherOptions">
            <div className="croSelectedMethod">
              <div className="croBall"></div>
              <p> Direct Bank Transfer</p>
            </div>
            <div className="croSelectedMethod">
              <div className="croBall"></div>
              <p> Cash on Delivery</p>
            </div>
          </div>
          <div className="croLastText">
            <p>
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our <b>privacy policy</b>.
            </p>
          </div>
          <div className="btnCheckout">
            <button type="submit" form="checkoutForm">
              Place Order
            </button>            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
