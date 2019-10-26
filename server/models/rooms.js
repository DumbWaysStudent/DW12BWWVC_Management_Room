"use strict";
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define(
    "rooms",
    {
      room: DataTypes.STRING
    },
    {}
  );
  rooms.associate = function(models) {
    rooms.belongsToMany(models.customers, {
      through: "orders",
      as: "customer",
      foreignKey: "id_room",
      otherKey: "id_customer"
    });
  };
  return rooms;
};
