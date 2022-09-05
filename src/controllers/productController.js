const db = require("../database/models");

const controller = {
  index: async function (req, res) {
    let products = await db.Product.findAll();
    return res.render("products/list", { products });
  },
  detail: async function (req, res) {
    let product = db.Product.findByPk(req.params.id);
    return res.render("products/detail", { product });
  },
  create: function (req, res) {
    return res.render("products/create");
  },
  store: async function (req, res) {
    let image = "";
    if (req.file) {
      image = req.file.filename;
    }

    //guardo el nuevo producto con la estructura
    await db.Product.create({
      name: req.body.name,
      price: req.body.price,
      img: image,
      marked: req.body.marked ? true : false,
    });

    //redireccione al listado de productos
    return res.redirect("/products");
  },
  edit: async function (req, res) {
    let product = await db.Product.findByPk(req.params.id);
    if (product) {
      return res.render("products/edit", { product });
    }
    return res.redirect("/products");
  },
  update: async function (req, res) {
    let product = await db.Product.findByPk(req.params.id);
    if (product) {
      let image = product.img;
      if (req.file) {
        image = req.file.filename;
      }
      await product.update({
        name: req.body.name,
        price: req.body.price,
        img: image,
        marked: req.body.marked ? true : false,
      });
    }
    return res.redirect("/products");
  },
  delete: async function (req, res) {
    await db.Product.destroy({
      where: { id: req.params.id },
    });

    res.redirect("/products");
  },
};

module.exports = controller;
