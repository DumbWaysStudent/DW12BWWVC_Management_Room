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
    // associations can be defined here
  };
  return customers;
};
