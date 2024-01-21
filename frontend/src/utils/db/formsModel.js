import * as Realm from 'realm-web';

export async function getForms() {
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
      .collection('answeredForms')
      .find({});
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function saveForm(form) {
  try {
    const {
      BSON: { ObjectId },
    } = Realm;
    const options = {
      upsert: true,
    };
    const updateDoc = {
      form: form,
    }
    const app = new Realm.App({ id: 'application-0-qitnr' });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser.id);
    const client = app.currentUser.mongoClient('mongodb-atlas');
    const result = await client
      .db('companies')
      .collection('answeredForms')
      .insertOne(updateDoc, options);
  } catch (e) {
    console.error(e);
  }
}

export async function deleteForm(form) {
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
      .collection('answeredForms')
      .deleteOne({'_id': form['_id']});
  } catch (e) {
    console.error(e);
  }
}