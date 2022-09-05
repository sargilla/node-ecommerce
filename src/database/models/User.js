module.exports = (sequelize, dataTypes) => {
  let alias = "User";
  let columns = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },

    email: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    img: {
      type: dataTypes.STRING(100),
      allowNull: true,
    },
  };
  let configurations = {};

  const User = sequelize.define(alias, columns, configurations);

  User.associate = (models) => {
    User.hasMany(models.Order, {
      as: "orders",
      foreignKey: "userId",
    });
  };

  return User;
};
