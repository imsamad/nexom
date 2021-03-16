const attchQty = (data) => {
  let { products, quantity, ...rest } = data;
  let tempProducts = [];
  const xyz = products.map((product) => {
    let temp = { ...product };
    temp.qty = quantity.find((data) => data.product === product.id).qty;
    tempProducts.push(temp);
    temp = {};
  });
  tempProducts = { products: tempProducts, ...rest };
  return tempProducts;
};
export default attchQty;
