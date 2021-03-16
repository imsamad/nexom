import axios from "axios";
import { API_URL } from "./utils";
export const incOrDec = (pid, inc = true) => {
  let cartItems = JSON.parse(localStorage.getItem("carts"));
  const index = cartItems.map((el) => el.id).indexOf(pid);
  let item = cartItems[index];
  let { qty, ...rest } = item;
  let newQty = inc ? ++qty : --qty;
  cartItems[index] = { ...rest, qty: newQty };
  localStorage.setItem("carts", JSON.stringify(cartItems));
  return;
};

export const addToCart = async (pid) => {
  console.log("pidpid", pid);
  let cartItems = JSON.parse(localStorage.getItem("carts"));
  let itemExist = false;
  const { data } = await axios.get(`${API_URL}/products/${pid}`);
  const {
    name,
    slug,
    id,
    price,
    image: { url: imageUrl },
  } = data;
  let newItem = { name, slug, id, price, image: imageUrl, qty: 1 };
  if (cartItems) {
    itemExist = cartItems.find((c) => c.id === pid);
    if (itemExist) {
      return;
    } else {
      cartItems.push(newItem);
      localStorage.setItem("carts", JSON.stringify(cartItems));
      return;
    }
  } else {
    cartItems = [newItem];
    localStorage.setItem("carts", JSON.stringify([newItem]));
    return;
  }
};

export const getCartItems = (qty = false) => {
  let cartItems = JSON.parse(localStorage.getItem("carts"));
  if (cartItems && qty) {
    return cartItems.length;
  } else if (cartItems) return cartItems;
  else return false;
};

export const remove = (pid) => {
  let cartItems = JSON.parse(localStorage.getItem("carts"));
  let cartLength = cartItems && cartItems.length;
  if (cartLength === 1) {
    localStorage.removeItem("carts");
  } else if (cartLength) {
    const index = cartItems.map((el) => el.id).indexOf(pid);
    cartItems = cartItems.filter((el, elIndex) => elIndex !== index);
    return localStorage.setItem("carts", JSON.stringify(cartItems));
  } else localStorage.removeItem("carts");
};
export const deleteCart = () => {
  localStorage.removeItem("carts");
};
export const findItem = (pid) => {
  let cartItems = JSON.parse(localStorage.getItem("carts"));
  let cartLength = cartItems.length;
  if (cartLength) {
    cartItems = cartItems.find((el) => el.slug === pid);
    return cartItems;
  } else {
    return false;
  }
};

export function subtotal(cartItems) {
  const item = cartItems
    .map(({ price, qty }) => Number(price) * Number(qty))
    .reduce((sum, i) => sum + i, 0);
  return Number(item).toFixed(2);
}

export const TAX_RATE = 0.07;
export const SHIPPING_RATE = 0.05;
export const getCartInvoice = () => {
  const carts = getCartItems();
  if (carts) {
    const invoiceSubtotal = subtotal(carts);
    const taxPrice = (TAX_RATE * invoiceSubtotal).toFixed(2);
    const shippingPrice = (SHIPPING_RATE * invoiceSubtotal).toFixed(2);
    const totalPrice = (
      Number(invoiceSubtotal) +
      Number(taxPrice) +
      Number(shippingPrice)
    ).toFixed(2);

    return {
      invoiceSubtotal,
      taxPrice,
      shippingPrice,
      totalPrice,
      TAX_RATE,
      SHIPPING_RATE,
    };
  } else {
    return false;
  }
};

export const listForOrder = () => {
  const carts = getCartItems();
  const {
    invoiceSubtotal: itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = getCartInvoice();

  let products = [];
  let productsIds = [];
  carts.map((cart, index) => {
    let tempTwo = {};
    tempTwo.qty = cart.qty;
    tempTwo.product = cart.id;
    productsIds.push(cart.id);
    products.push(tempTwo);
    tempTwo = {};
  });
  const itemsList = {
    productsIds: productsIds,
    products,
    itemsPrice,
    taxPrice,
    totalPrice,
    shippingPrice,
  };
  return itemsList;
};
