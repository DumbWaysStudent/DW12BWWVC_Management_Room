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
    // associations can be defined here
  };
  return rooms;
};
