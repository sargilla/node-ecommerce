module.exports = (sequelize, dataTypes) => {
  let alias = "Order";
  let columns = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
    total: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentMethod: {
      type: dataTypes.STRING(25),
      allowNull: false,
    },
  };
  let configurations = {};

  const Order = sequelize.define(alias, columns, configurations);

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      as: "user",
    });
  };

  return Order;
};
