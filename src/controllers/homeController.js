const db = require("../database/models");
module.exports = {
  home: async function (req, res) {
    let products = await db.Product.findAll({
      where: {
        marked: 1,
      },
    });

    return res.render("index", { title: "E-Commerce", products });
  },
  cart: function (req, res) {
    return res.render("cart");
  },
  order: async function (req, res) {
    let order = await db.Order.findByPk(req.params.id, {
      include: db.Order.OrderItems,
    });
    // res.send(order);
    return res.render("order", { order });
  },
};
