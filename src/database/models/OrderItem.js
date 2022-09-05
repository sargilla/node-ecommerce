module.exports = (sequelize, dataTypes) => {
  let alias = "OrderItem";
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
    price: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
  };
  let configurations = {};

  const OrderItem = sequelize.define(alias, columns, configurations);

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
      as: "order",
    });

    OrderItem.belongsTo(models.Product, {
      as: "product",
    });
  };

  return OrderItem;
};
