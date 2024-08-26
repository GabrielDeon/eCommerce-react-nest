import "../styles/Checkout.css";

function Checkout() {
  return (
    <div className="checkout">
      <div className="checkoutContent">
        <div className="checkoutContentLeft">
          <h1>Billing Details</h1>
          <form id="checkoutForm">
            <div className="checkoutContentNames">
              <div>
                <p>First Name</p>
                <input type="text" required></input>
              </div>
              <div>
                <p>Last Name</p>
                <input type="text" required></input>
              </div>
            </div>
            <div>
              <p>{`Company Name (Optional)`} </p>
              <input type="text"></input>
            </div>
            <div className="checkoutBasicField">
              <p>ZIP code</p>
              <input type="text" required></input>
            </div>
            <div className="checkoutBasicField">
              <p>Country / Region</p>
              <input type="text" required></input>
            </div>
            <div className="checkoutBasicField">
              <p>Street address</p>
              <input type="text" required></input>
            </div>
            <div className="checkoutBasicField">
              <p>Town / City</p>
              <input type="text" required></input>
            </div>
            <div className="checkoutBasicField">
              <p>Province</p>
              <input type="text" required></input>
            </div>
            <div className="checkoutBasicField">
              <p>Add-on address</p>
              <input type="text" required></input>
            </div>
            <div className="checkoutBasicField">
              <p>Email address</p>
              <input type="text" required></input>
            </div>
            <div className="checkoutBasicField last">
              <input type="text" placeholder="Additional Information"></input>
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
          <div className="ccrMirror">
            <div className="ProductQuantityCheckout">
              <p>Product</p>
              <p> X 10</p>
            </div>

            <p>Subtotal</p>
          </div>
          <div className="cctSubtotal ccrMirror">
            <p>Subtotal</p>
            <p>$2500000</p>
          </div>
          <div className="cctTotal ccrMirror">
            <p>Total</p>
            <p>$2500000</p>
          </div>
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
