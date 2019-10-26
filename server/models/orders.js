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
      is_done: DataTypes.BOOLEAN,
      end_time: DataTypes.DATE
    },
    {}
  );
  orders.associate = function(models) {};
  return orders;
};
