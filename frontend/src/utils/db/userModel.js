import * as Realm from 'realm-web';
import { getPreviousMonday } from '@/utils/dates.js';

export async function getUsers() {
  try {
    const {
      BSON: { ObjectId },
    } = Realm;
    const app = new Realm.App({ id: 'application-0-qitnr' });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser.id);
    const client = app.currentUser.mongoClient('mongodb-atlas');
    const result = await client.db('companies').collection('users').find({});

    result.forEach(user => {
      if (typeof user.user.companies == 'undefined') {
        user.user.companies = [];
        user.user.role = 'planner';
        updateUser(user.user);
      }
    });

    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function getUser(email) {
  try {
    const {
      BSON: { ObjectId },
    } = Realm;
    const app = new Realm.App({ id: 'application-0-qitnr' });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser.id);
    const client = app.currentUser.mongoClient('mongodb-atlas');
    const result = await client
      .db('companies')
      .collection('users')
      .find({ 'user.email': email });

    if (result.length > 0) {
      return result[0];
    } else {
      try {
        const document = {
          user: {
            email: email,
            tokens: 30,
            tier: 0,
            date: getPreviousMonday(),
            role: 'planner',
            companies: [],
          },
        };
        const result = await client
          .db('companies')
          .collection('users')
          .insertOne(document);
        return document;
      } catch (e) {
        console.error(e);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export async function updateUser(userObject) {
  try {
    const filter = {
      'user.email': userObject.email,
    };
    const options = {
      upsert: false,
    };
    const updateDoc = {
      $set: {
        user: userObject,
      },
    };
    const {
      BSON: { ObjectId },
    } = Realm;
    const app = new Realm.App({ id: 'application-0-qitnr' });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser.id);
    const client = app.currentUser.mongoClient('mongodb-atlas');
    const result = await client
      .db('companies')
      .collection('users')
      .updateOne(filter, updateDoc, options);
  } catch (e) {
    console.error(e);
  }
}
