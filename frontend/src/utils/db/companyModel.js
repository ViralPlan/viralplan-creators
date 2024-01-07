import * as Realm from 'realm-web';

export async function getCompanies() {
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
      .collection('companies')
      .find({});
    const end = Date.now();
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function getCompany(name) {
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
      .collection('companies')
      .find({ 'company.name': name })
      .toArray();
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function updateCompany(filter, updateDoc, options) {
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
      .collection('companies')
      .updateOne(filter, updateDoc, options);
  } catch (e) {
    console.error(e);
  }
}

export async function deleteCompany(filter) {
  try {
    const {
      BSON: { ObjectId },
    } = Realm;
    const app = new Realm.App({ id: 'application-0-qitnr' });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    console.assert(auth.user.id === app.currentUser.id);
    const client = app.currentUser.mongoClient('mongodb-atlas');
    const result = await client
      .db('companies')
      .collection('companies')
      .deleteOne(filter);
  } catch (e) {
    console.error(e);
  }
}


export async function updateCompanyTasks(companyObject) {
  try {
    const filter = {
      'company.name': companyObject.name,
    };
    const options = {
      upsert: false,
    };
    const updateDoc = {
      $set: {
        company: companyObject,
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
      .collection('companies')
      .updateOne(filter, updateDoc, options);
  } catch (e) {
    console.error(e);
  }
}
