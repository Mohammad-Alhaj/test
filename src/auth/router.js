"use strict";
const express = require("express");
const UserRouter = express.Router();
const basic = require("./middleware/basic");
 const signup = require('./middleware/signup');
const bearer = require("./middleware/bearer");
const acl = require('./middleware/acl');

UserRouter.post("/signin", basic, async (req, res) => {
 res.status(200).json(req.user);
});

UserRouter.post("/signup",signup, async (req, res) => {
  
});
UserRouter.get("/User",bearer, (req, res) => {// The error was here
    res.json({
        'message': 'You are authorized to view the user orders',
        'user': req.user
    });
});

UserRouter.get("/sitting",bearer,acl('read'),(req,res)=>{
    res.status(200).send("enter the sitting")

})
UserRouter.post("/sitting",bearer,acl('create'),(req,res)=>{
res.send("create the sitting")
    
})
UserRouter.put("/sitting",bearer,acl('update'),(req,res)=>{
res.send("update a new sitting")
    
})
UserRouter.delete("/sitting",bearer,acl('delete'),(req,res)=>{
res.send("delete sitting")
    
})

module.exports = UserRouter;