export const API_URL =
  process.env.NEXT_PUBLIC_API_PRO || process.env.NEXT_PUBLIC_API_DEV;
export const STRIPE_PK =
  "pk_test_51IFz8NGSJtrseqLmRDzqmYBr3xZaHXAUJAkZpM4r5JQKarkWu5S5PYPq1NMBgBqI6Os4yufKnkb3QMAy7i1Ezrf800bcAOeHpp";

export const truncate = (str, len) => {
  if (str.length > len) return str.slice(0, len) + "...";
  else return str;
};
export const toMoney = (value) =>
  "$" + Number(value).toLocaleString("en-US", "USD") + ".00";
