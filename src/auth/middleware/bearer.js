'use strict';
const User = require('../models/users-model')

async function bearer(req,res,next){
    try{  
     
if(req.headers.authorization){
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",req.headers.authorization,'$$$$$$$$$$$$$$$$$$$$$$')
const token = req.headers.authorization.split(" ")[1]
console.log("from bearer............",token)
const user =await User.authenticateBearer(token)


//  console.log("ddddd",tToken);
    req.user = user;
    req.token= token;
    next(); 
}else{
   next('Token undefined')
}
}
catch(e){
    next("Please Login!!");
}


}
module.exports =bearer;