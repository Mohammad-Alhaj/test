"use strict";

const myStore = (sequelize, DataTypes) =>
  sequelize.define("myStore", {
    name: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },

    amount: { type: DataTypes.INTEGER },
  });

module.exports = myStore;
