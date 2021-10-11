("use strict");
const { sanitizeEntity } = require("strapi-utils");
const stripe = require("stripe")(process.env.STRIPE_SK);
const decToInt = (number) => parseInt(number * 100);

const clg = (value, label) => {
  console.log(`++++++++++++++++${label} Start++++++++++++++++++++`);
  console.log("|+|+||+|+||+|+||+|+||+|+|");
  console.log("|+|+||+|+||+|+||+|+||+|+|");
  console.log("|+|+||+|+||+|+||+|+||+|+|");
  console.log(value);
  console.log("|+|+||+|+||+|+||+|+||+|+|");
  console.log("|+|+||+|+||+|+||+|+||+|+|");
  console.log("|+|+||+|+||+|+||+|+||+|+|");
  console.log(`++++++++++++++++${label} End++++++++++++++++++++`);
};
module.exports = {
  async create(ctx) {
    const { user } = ctx.state;
    const {
      body: {
        products,
        paymentMethod,
        taxPrice,
        itemsPrice,
        totalPrice,
        shippingPrice,
        shippingAddress: {
          firstName,
          lastName,
          state,
          zipcode,
          country,
          city,
          address1,
          address2,
        },
      },
    } = ctx.request;
    console.log("ctx.requestctx.request", ctx.request);
    if (
      !products ||
      !paymentMethod ||
      !taxPrice ||
      !shippingPrice ||
      !itemsPrice ||
      !totalPrice ||
      !state ||
      !zipcode ||
      !country ||
      !city ||
      !address1 ||
      !address2
    ) {
      return ctx.throw(400, "Please specify complete info.");
    }
    const productsLength = products.length;
    const productIds = products.map((product) => product.product);
    const realProducts = await strapi.services.product.find({
      _id: { $in: productIds },
    });
    const realProductsLength = realProducts.length;
    if (productsLength !== realProductsLength) {
      // We can log security threats to admin panel.
      console.log("Exaggrated");
      return ctx.throw(400, "Please provide valid details.");
    }
    const realProductsIds = realProducts.map((product) => product.id);
    let quantity = [];
    // temp.qty = products.find((pro) => pro.id === product && pro.qty).qty;
    const teep = realProductsIds.map((product) => {
      let temp = {};
      const tempTwo = products.find((pro) => pro.product === product).qty;
      temp.qty = products.find((pro) => pro.product === product && product).qty;
      temp.product = product;
      quantity.push(temp);
      temp = {};
    });
    const BASE_URL = ctx.request.headers.origin || "http://localhost:3333";
    const lineItems = [];
    const taxes =
      (Number(shippingPrice) + Number(taxPrice)) / Number(realProductsLength);
    const temp = realProducts.map((product) => {
      let qty = products.find((pro) => pro.product === product.id).qty;
      const item = {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: decToInt(Number(product.price) + Number(taxes / qty)),
        },
        quantity: qty,
      };
      lineItems.push(item);
      qty = null;
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      mode: "payment",
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: BASE_URL,
      line_items: lineItems,
    });

    if (realProductsIds.length === quantity.length) {
      const createOrder = {
        user: user.id,
        products: realProductsIds,
        shippingAddress: ctx.request.body.shippingAddress,
        paymentMethod,
        isPaid: false,
        taxPrice,
        shippingPrice,
        totalPrice,
        itemsPrice,
        isDelivered: false,
        quantity,
        checkout_session: session.id,
      };
      const newOrder = await strapi.services.order.create(createOrder);
      return {
        id: newOrder.id,
        price: newOrder.totalPrice,
        sessionId: session.id,
      };
    } else {
      return {
        error: true,
      };
    }
  },
  async find(ctx) {
    const { user } = ctx.state;
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.order.search({
        ...ctx.query,
        user: user.id,
      });
    } else {
      entities = await strapi.services.order.find({
        ...ctx.query,
        user: user.id,
      });
    }
    return entities.map((enitity) =>
      sanitizeEntity(enitity, { model: strapi.models.order })
    );
  },
  async findOne(ctx) {
    const {
      state: { user },
      params: { id },
    } = ctx;

    let enitity = await strapi.services.order.findOne({
      id,
      ...ctx.query,
      user: user.id,
    });
    return sanitizeEntity(enitity, { model: strapi.models.order });
  },
  async confirm(ctx) {
    const { checkout_session } = ctx.request.body;
    const product = await strapi.services.order.findOne({
      checkout_session,
    });
    const reConfirming = product.isPaid;
    if (reConfirming) {
      return {
        reConfirming: true,
      };
    }
    const session = await stripe.checkout.sessions.retrieve(checkout_session);

    if (session.payment_status === "paid") {
      await strapi.services.order.update(
        {
          checkout_session,
        },
        {
          isPaid: true,
          paidAt: Date.now(),
        }
      );
      const updateOrder = await strapi.services.order.findOne({
        checkout_session,
      });
      return sanitizeEntity(
        { order: updateOrder.id },
        { model: strapi.models.order }
      );
    } else {
      ctx.throw(400, "The paymnet was not successfull");
    }
  },
};
