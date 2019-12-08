var avroSchema = {
  name: "MyAwesomeType",
  type: "record",
  fields: [
    {
      name: "id",
      type: "string"
    },
    {
      name: "timestamp",
      type: "double"
    },
    {
      name: "message",
      type: "string"
    }
  ]
};
var avro = require("avsc");
var type = avro.parse(avroSchema);
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var kafka = require("kafka-node");
//var HighLevelConsumer = kafka.HighLevelConsumer;
var Consumer = kafka.Consumer;
const client = new kafka.KafkaClient("localhost:2181");
var topics = "node-test";
// Configure Kafka Consumer for Kafka decodedMessage Topic and handle Kafka message (by calling updateSseClients)
// var topics = [
//   {
//     topic: "node-test"
//   }
// ];
var options = {
  autoCommit: true,
  fetchMaxWaitMs: 1000,
  fetchMaxBytes: 1024 * 1024,
  encoding: "buffer"
};
//var consumer = new Consumer(client, topics, options);
var consumer = new Consumer(client, [], options);

consumer.on("message", function(message) {
  // when mesage is true, execute funcion
  console.log("consume on");
  handleMessage(message);
});

consumer.addTopics([{ topic: topics, partition: 0, offset: 0 }], () =>
  console.log("topic " + topics + " added to consumer for listening")
);

function handleMessage(message) {
  var buf = new Buffer.from(message.value, "binary"); // Read string into a buffer.
  console.log("handleMessage on");
  //var decodedMessage = type.fromBuffer(buf.slice(0));
  var decodedMessage = type.fromBuffer(buf); // Skip prefix.

  console.log(decodedMessage);
  //insert the decodedMessage in the MongoDB server
  insertDocument(mongodb, decodedMessage, function() {
    console.log("decodedMessage recorded in MongoDB for " + decodedMessage.id);
  });
}

consumer.on("error", function(err) {
  console.log("error", err);
});

process.on("SIGINT", function() {
  consumer.close(true, function() {
    process.exit();
  });
});

// connect string for mongodb server running locally, connecting to a database called test
var url = "mongodb://127.0.0.1:27017";
const dbName = "grabhub";
var mongodb;
const options1 = {
  useUnifiedTopology: true
};
MongoClient.connect(url, options1, function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to MongoDB server.");
  const db = client.db(dbName);
  mongodb = db;
});

var insertDocument = function(db, doc) {
  db.collection("messages").insertOne(doc, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted doc for " + doc.id);
  });
}; //insertDocument
