"use strict";
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    "orders",
    {
      id_customer: DataTypes.INTEGER,
      id_room: DataTypes.INTEGER,
      check_in: DataTypes.DATE,
      time: DataTypes.TIME,
      is_booked: DataTypes.BOOLEAN,
      is_done: DataTypes.BOOLEAN
    },
    {}
  );
  orders.associate = function(models) {
    orders.belongsTo(models.customers, {
      as: "idCustomer",
      foreignKey: "id_customer"
    });
    orders.belongsTo(models.rooms, {
      as: "idRoom",
      foreignKey: "id_room"
    });
  };
  return orders;
};
