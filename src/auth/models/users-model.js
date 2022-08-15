'use strict';
require('dotenv').config()
 const bcrypt = require("bcrypt");
 const jwt = require('jsonwebtoken');
 const SECRETE = process.env.SECRETE
 const { sequelize, DataTypes } = require("./index");
// const model=  (sequelize,DataTypes)=>
 const User = sequelize.define("user",{
    username:{
        type: DataTypes.STRING,
        allNull:false,
        unique:true
    },
    password:{
        type: DataTypes.STRING,
        allNull:false,
    },
    token: {
        type: DataTypes.VIRTUAL,
    },
    role:{
        type: DataTypes.ENUM('admin', 'writer', 'editor', 'user'),
        defaultValue: 'user',
    },
    actions:{
        type:DataTypes.VIRTUAL,
        get() {
            //acl >>> access control list
            const acl = {
                user: ['read'],
                writer: ['read', 'create'],
                editor: ['read', 'create', 'update'],
                admin: ['read', 'create', 'update', 'delete']
            }
            return acl[this.role];
        }
    }
    
});
//................................User.authenticateBasic................................................
User.authenticateBasic = async function (username, password) {
    // console.log('from users.model.js', User);

    const user = await User.findOne({ where: { username: username } })

    const valid = await bcrypt.compare(password, user.password)
    if (valid) {
        // console.log('************************', valid);

        let newToken = jwt.sign({ username: user.username }, SECRETE,{expiresIn:'900s'});
        //  console.log('************************', newToken);
        user.token = newToken;
        return user;
    }
    else {
        throw new Error("Invalid user");
    }
}
//................................User.authenticateBearer................................................
User.authenticateBearer = (async(token)=>{
   
    const tToken = jwt.verify(token,SECRETE)
    // console.log('*********************tToken***', tToken);

    const user = await User.findOne({where:{username:tToken.username}})// error hea
    if(user.username){
       return user 
    } 
 else {
    throw new Error("Invalid Token");
}
})


module.exports = User