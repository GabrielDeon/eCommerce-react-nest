const formatPrice = (price) => {
  let floatPrice = parseFloat(price);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(floatPrice);
};

export default formatPrice;
