'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    identity: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phone: DataTypes.INTEGER
  }, {});
  customers.associate = function(models) {
    // associations can be defined here
  };
  return customers;
};