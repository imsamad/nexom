"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.product.search({
        ...ctx.query,
      });
    } else {
      entities = await strapi.services.product.find({
        ...ctx.query,
      });
    }
    entities = entities.map(({ orders, ...rest }) => rest);
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.product })
    );
  },
  async findOne(ctx) {
    const {
      params: { id },
    } = ctx;
    let entity = await strapi.services.product.findOne({
      id,
    });
    const { orders, ...rest } = entity;
    entity = { ...rest };
    return sanitizeEntity(entity, { model: strapi.models.product });
  },
};
