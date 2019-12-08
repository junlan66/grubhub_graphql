const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
// connect string for mongodb server running locally, connecting to a database called test
var url = "mongodb://127.0.0.1:27017";
const dbName = "grabhub";
var mongodb;
const options1 = {
  useUnifiedTopology: true
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, cb) {
      console.log("in login");
      MongoClient.connect(url, options1, function(err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to MongoDB server login.");
        console.log("backedn received email is", email);
        console.log("backedn received passport is", password);
        const db = client.db(dbName);
        mongodb = db;
        var query = { email: email };
        db.collection("buyer")
          .find(query)
          .toArray(function(error, results) {
            if (error) {
              console.log("error ocurred", error);
              return cb(err);
            } else {
              if (results.length > 0) {
                console.log(results[0].password);
                if (results[0].password == password) {
                  var user = results[0];
                  console.log("USER IN BACK");
                  console.log(user);
                  return cb(null, user, {
                    message: "Logged In Successfully"
                  });
                } else {
                  console.log("real pass found");
                  console.log(results[0].password);
                  console.log("Email and password does not match");
                  console.log("error ocurred", error);
                  return cb(err);
                }
              } else {
                console.log("Email does not exits");
                console.log("error ocurred", error);
                return cb(null, false, {
                  message: "Incorrect email or password."
                });
              }
            }
          });
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    function(jwtPayload, cb) {
      //find the user in db if needed
      return UserModel.findOneById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);
