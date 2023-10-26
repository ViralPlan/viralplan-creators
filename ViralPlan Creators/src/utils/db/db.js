import * as Realm from "realm-web";
const {
  BSON: { ObjectId },
} = Realm;
const app = new Realm.App({ id: 'application-0-qitnr' });
// Create an anonymous credential
const credentials = Realm.Credentials.anonymous();
// Authenticate the user
const user = app.logIn(credentials);
// `App.currentUser` updates to match the logged in user
console.assert(user.id === app.currentUser.id);
export const client = app.currentUser.mongoClient("mongodb-atlas");

/* const MongoClient = mongodb.MongoClient;
const ServerApiVersion = mongodb.ServerApiVersion; */
const uri = "mongodb+srv://pablo:Plopez11@viralplan.hdgdxji.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
/* export const client = new mongodb.MongoClient(uri, {
  serverApi: {
    version: mongodb.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}); */


