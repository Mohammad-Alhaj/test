'use strict';
require('dotenv').config();
const { Sequelize,DataTypes } = require('sequelize');
//  const user =require('./users-model')
 const food = require("../../api-server/models/food")
 const clothes = require("../../api-server/models/clothes")
 const todos = require('../../api-server/models/todo')
 const Collection = require('../../api-server/models/data-collection');

 const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);


const Food = food(sequelize, DataTypes);
const Clothes = clothes(sequelize, DataTypes);
const Todos = todos(sequelize, DataTypes);

// module.exports={
//     dataBase:sequelize,
//    User:user(sequelize,DataTypes),
   
// }

module.exports = { sequelize, DataTypes ,
  food: new Collection(Food),
  clothes: new Collection(Clothes),
  todos: new Collection(Todos)

}
// ,{
  

// }