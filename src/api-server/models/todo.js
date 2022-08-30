"use strict";

const todoModel = (sequelize, DataTypes) =>
  sequelize.define("Todos", {
    todo: { type: DataTypes.STRING, 
        required: true 
    },

    AssignedTo: { type: DataTypes.STRING,
         required: true 
        },

    complete: { type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
  });

module.exports = todoModel;
