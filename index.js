'use strict';
const server = require('./src/server')
require('dotenv').config()
const PORT = process.env.PORT;

// const {dataBase} = require('./src/auth/models/index');
const {sequelize} = require('./src/auth/models/index')


sequelize.sync().then(()=>{

    server.start(PORT );

})  