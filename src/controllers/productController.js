const databaseJson = require("../database/databaseJson");

const databaseFilename = "../database/products.json";
const categoriesFilename = "../database/categories.json";

const controller = {
  index: function (req, res) {
    const prods = databaseJson.readJson(databaseFilename);
    return res.render("products/list", { products: prods });
  },
  detail: function (req, res) {
    // res.send(req.params.id);
    const products = databaseJson.readJson(databaseFilename);

    //filtrar y buscar
    let product = products.find((p) => {
      return p.id == req.params.id;
    });
    return res.render("products/detail", { product });
  },
  formNew: function (req, res) {
    const categories = databaseJson.readJson(categoriesFilename);

    return res.render("products/form", { categories });
  },
  create: function (req, res) {
    //leer el json
    const prods = databaseJson.readJson(databaseFilename);

    const idCalculated = databaseJson.lastElementId(prods) + 1;

    //si hay imagen
    let image = "";
    if (req.file) {
      //le saco la palabra public para que sea a partir
      image = req.file.filename;
    }

    //guardo el nuevo producto con la estructura
    prods.push({
      id: idCalculated,
      name: req.body.name,
      price: req.body.price,
      img: image,
    });

    //reescribo el json
    databaseJson.writeJson(prods, databaseFilename);

    //redireccione al listado de productos
    return res.redirect("/products");
  },
  formEdit: function (req, res) {
    //return res.send(req.params);
    const products = databaseJson.readJson(databaseFilename);

    //filtrar y buscar
    let product = products.filter((p) => {
      return p.id == req.params.id;
    });

    //si no existe el producto??
    //let product = { id: 99, name: 'producto a editar', price: 1200, img: 'ruta..' }

    return res.render("products/edit", { product: product[0] });
  },
  update: function (req, res) {
    //validar los datos

    //leer el archivo json
    let prods = databaseJson.readJson(databaseFilename);

    //guardarlo
    prods = prods.map((p) => {
      if (p.id == req.params.id) {
        /*let product = { 
                    id: p.id,
                    name: req.body.name,
                    price: req.body.price,
                    img: p.img
                }
                if (req.file) { //si me enviaron la imagen entonces la piso
                    product.img = req.file.filename
                }
                return product*/
        p.name = req.body.name;
        p.price = req.body.price;
        if (req.file) {
          //si me enviaron la imagen entonces la piso
          p.img = req.file.filename;
        }
      }
      return p;
    });

    //reescribo el json
    databaseJson.writeJson(prods, databaseFilename);

    //redireccionar
    return res.redirect("/products");
  },
  delete: function (req, res) {
    //hacer la eliminacion
  },
};

module.exports = controller;
