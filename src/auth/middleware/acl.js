'use strict';

module.exports = (capability) => {

  return (req, res, next) => {

    try {
        console.log("user*/*/*/*/*/*/*",req.user);
      if (req.user.actions.includes(capability)) {
        next();
      }
      else {
        next('Access Denied');
      }
    } catch (e) {
        console.log("/*/*/*/*/*/*/*/*/*/*/*/*/",e);
      next('Invalid Login');
    }

  }

}