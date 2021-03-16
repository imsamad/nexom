import Cart from "../components/Cart";
import { NextSeo } from "next-seo";

const seo = {
  title: "My Cart",
  description: "Your cart page.",
};

const cart = () => {
  return (
    <>
      <NextSeo {...seo} />
      <Cart />
    </>
  );
};

export default cart;
