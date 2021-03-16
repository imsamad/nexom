export const placeOrder = (data) => {
  const {
    items: {
      products,
      itemsPrice,
      taxPrice,
      totalPrice,
      shippingPrice,
      productsIds,
    },
    address: { paymentMethod, ...rest },
  } = data;

  const order = {
    productsIds,
    paymentMethod,
    taxPrice,
    itemsPrice,
    totalPrice,
    shippingPrice,
    shippingAddress: rest,
    products,
  };
  return order;
};
