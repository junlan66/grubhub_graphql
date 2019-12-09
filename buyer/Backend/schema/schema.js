const graphql = require("graphql");
const _ = require("lodash");
// connect to mongo db
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongo_url = "mongodb://localhost:27017/grabhub";
mongoose
  .connect(mongo_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log("DB Connection Error:" + err);
  });
//models
const OwnerModel = mongoose.model("owners", {
  name: String,
  email: String,
  password: String
});
const MenuModel = mongoose.model("menus", {
  name: String,
  description: String,
  price: String,
  type: String
});

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLDate
} = graphql;

//types
const BuyerType = new GraphQLObjectType({
  name: "Buyer",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

const MenuType = new GraphQLObjectType({
  name: "Menu",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLString },
    type: { type: GraphQLString }
  })
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    buyerLogin: {
      type: OwnerType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        console.log(args);

        const result = await OwnerModel.findOne({
          email: args.email,
          password: args.password
        });
        console.log(result.toObject());
        if (result == null) {
          return null;
        }
        return result.toObject();
      }
    },
    listMenu: {
      type: GraphQLList(MenuType),
      resolve: (root, args, context, info) => {
        return MenuModel.find().exec();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createOwners: {
      type: OwnerType,
      args: {
        name: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        restaurant_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        cuisine: { type: GraphQLString }
      },
      resolve(parent, args) {
        var owner = new OwnerModel(args);
        return owner.save();
      }
    },
    updateOwners: {
      type: OwnerType,
      args: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        zipcode: { type: GraphQLString },
        restaurant_name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        cuisine: { type: GraphQLString }
      },
      resolve(parent, args) {
        var owner = new OwnerModel(args);
        return OwnerModel.findByIdAndUpdate(
          args._id,
          {
            $set: {
              name: args.name,
              zipcode: args.zipcode,
              restaurant_name: args.restaurant_name,
              email: args.email,
              password: args.password,
              cuisine: args.cuisine
            }
          },
          { new: true }
        ).exec();
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
