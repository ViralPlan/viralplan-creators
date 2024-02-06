import * as Realm from 'realm-web';

export async function getPlan(id, date) {
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
        .find({
            "_id": Realm.BSON.ObjectId(id)
        });
        if (result.length === 0) {
            return null;
        } else {
            for (let i = 0; i < result[0].company.plans.length; i++) {
                if (result[0].company.plans[i].date === date) {
                    return result[0].company.plans[i];
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
}