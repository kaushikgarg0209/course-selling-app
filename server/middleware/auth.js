const jwt = require('jsonwebtoken');
const SECRET = 'SECr3t';
const mongoose = require("mongoose");
const { User, Course, Admin } = require("../db");

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    var token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      // console.log(user)
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
    authenticateJwt,
    SECRET
}