var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
// connect string for mongodb server running locally, connecting to a database called test
var url = "mongodb://127.0.0.1:27017";
const dbName = "grabhub";
var mongodb;
const options1 = {
  useUnifiedTopology: true
};

exports.getTextbox = function(req, res) {
  console.log("Print id  " + req.query.orderId);
  var data = {
    buyerId: req.query.buyerId,
    orderId: req.query.orderId
  };
  MongoClient.connect(url, options1, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to MongoDB server.");
    const db = client.db(dbName);
    mongodb = db;
    db.collection("messages")
      .find({ id: data.orderId })
      .toArray(function(err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(result);
        //db.close();
      });
  });
};

exports.submitOrder = function(req, res) {
  var oneOrder = req.body;
  console.log("my mongo cartList is ");
  MongoClient.connect(url, options1, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to MongoDB server.");
    const db = client.db(dbName);
    mongodb = db;
    db.collection("orders").insert(oneOrder, function(err, res) {
      if (err) throw err;
      console.log("1 cart list inserted");
      //db.close();
    });
  });
};

exports.getPastOrder = function(req, res) {
  MongoClient.connect(url, options1, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to MongoDB server.");
    const db = client.db(dbName);
    mongodb = db;
    db.collection("pastOrders")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
        //db.close();
      });
  });
};
exports.getOrder = function(req, res) {
  MongoClient.connect(url, options1, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to MongoDB server.");
    const db = client.db(dbName);
    mongodb = db;
    db.collection("orders")
      .find({})
      .toArray(function(err, result) {
        if (err) throw err;
        res.send(result);
        //db.close();
      });
  });
};
