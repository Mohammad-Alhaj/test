'use strict';
require('dotenv').config()
const express = require('express');
const app = express();
const UserRouter =require('./auth/router');
const handle500=require('./error-handlers/500');
const handle404=require('./error-handlers/404');
const router_v1 = require('./api-server/routes/v1');
const router_v2 = require('./api-server/routes/v2');
const cors = require('cors');
const morgan = require("morgan");



app.use(cors())
app.use(morgan("dev"));
app.use(express.json());

app.use(
    express.urlencoded({
      extended: true,
    })
  );


app.get("/",(req,res)=>{
    res.status(200).send("Welcome in my app 😍")
})








app.use(UserRouter)
app.use('/api/v1',router_v1);
app.use('/api/v2',router_v2);






app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(handle500)
app.use('*',handle404)
function start(PORT){
    app.listen(PORT,()=>{
        console.log(`lesson in PORT ${PORT}`)
    })
}
module.exports ={
    app:app,
    start:start
}