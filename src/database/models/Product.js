module.exports = (sequelize, dataTypes) => {
  let alias = "Product";
  let columns = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    img: {
      type: dataTypes.STRING(100),
      allowNull: true,
    },
    price: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    marked: {
      type: dataTypes.BOOLEAN,
      defaultValue: false,
    },
  };

  let configurations = {};

  const Product = sequelize.define(alias, columns, configurations);

  return Product;
};
