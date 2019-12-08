const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
// connect string for mongodb server running locally, connecting to a database called test
var url = "mongodb://127.0.0.1:27017";
const dbName = "grabhub";
var mongodb;
const options1 = {
  useUnifiedTopology: true
};
exports.register = function(req, res) {
  // console.log("req",req.body);
  var today = new Date();
  var buyer = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    created: today,
    modified: today
  };
  MongoClient.connect(url, options1, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to MongoDB server.");
    const db = client.db(dbName);
    mongodb = db;
    db.collection("buyer").insertOne(buyer, function(err, results) {
      assert.equal(err, null);
      console.log("Inserted doc for ");
      if (error) {
        console.log("error ocurred", error);
        res.send({
          code: 401,
          failed: "error ocurred"
        });
      } else {
        console.log("The solution is: ", results);
        res.send({
          code: 200,
          success: "user registered sucessfully"
        });
      }
    });
  });
};

exports.login = function(req, res) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log(err);
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login failed",
        user: user
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      //const token = jwt.sign(user, "your_jwt_secret");
      const token = jwt.sign(JSON.stringify(user), "your_jwt_secret");

      return res.json({ user, token });
    });
  })(req, res);
};

exports.userInfo = function(req, res) {
  var userId = req.query.userId;
  var newName = req.query.firstName;
  var newPhoneNumber = req.query.phoneNumber;
  var newEmail = req.query.email;

  console.log("Name to " + newName + newPhoneNumber + newEmail + userId);
  // update database to newName
  var sql = "UPDATE buyer SET name = ?, email = ?, phone = ? WHERE id = ?";
  connection.query(sql, [newName, newEmail, newPhoneNumber, userId], function(
    err,
    result
  ) {
    if (err) throw err;

    res.send(result);
  });
};
//exports.getUserInfo = function(req, res) {
//   connection.query("SELECT * from buyer", function(err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     res.send(result);
//   });
// };
exports.getmenu = function(req, res) {
  MongoClient.connect(url, options1, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    mongodb = db;
    db.collection("breakfast")
      .find({})
      .toArray(function(error, results) {
        if (error) throw error;
        console.log(results);
        res.send(results);
      });
  });
};

exports.getLunchMenu = function(req, res) {
  MongoClient.connect(url, options1, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    mongodb = db;
    db.collection("lunch")
      .find({})
      .toArray(function(error, results) {
        if (error) throw error;
        console.log(results);
        res.send(results);
      });
  });
};

exports.cart = function(req, res) {
  var cart = {
    name: req.body.name,
    id: req.body.id, //req.body.id,
    quantity: req.body.quantity
  };
  console.log(cart);
  connection.query("INSERT INTO cart SET ?", cart, function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        code: 401,
        failed: "error ocurred"
      });
    } else {
      console.log("The solution is: ", results);
      res.send({
        code: 200,
        success: "cart add successful"
      });
    }
  });
};
