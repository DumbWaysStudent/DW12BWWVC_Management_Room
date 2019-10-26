"use strict";
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define(
    "customers",
    {
      identity: DataTypes.STRING,
      name: DataTypes.STRING,
      phone: DataTypes.STRING
    },
    {}
  );
  customers.associate = function(models) {
    customers.belongsToMany(models.rooms, {
      through: "orders",
      as: "room",
      foreignKey: "id_customer",
      otherKey: "id_room"
    });
  };
  return customers;
};
