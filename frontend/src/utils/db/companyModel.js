import { authStore } from '@/stores/auth.js'
import { createPinia } from 'pinia';
import { createApp } from 'vue'
import App from '@/App.vue'
import * as Realm from "realm-web";


export async function getCompanies() {
    try {
        const auth = authStore()
        const {
            BSON: { ObjectId },
          } = Realm;
        const app = new Realm.App({ id: 'application-0-qitnr' });
        const credentials = Realm.Credentials.emailPassword(auth.user.email, auth.user.password);
        const user = await app.logIn(credentials)
        console.assert(user.id === app.currentUser.id);
        const client = app.currentUser.mongoClient("mongodb-atlas");
        const result = await client.db('companies').collection("companies").find({});
        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function getCompany(name) {
    try {
        const auth = authStore()
        const {
            BSON: { ObjectId },
          } = Realm;
        const app = new Realm.App({ id: 'application-0-qitnr' });
        const credentials = Realm.Credentials.emailPassword(auth.user.email, auth.user.password);
        const user = await app.logIn(credentials)
        console.assert(user.id === app.currentUser.id);
        const client = app.currentUser.mongoClient("mongodb-atlas");
        const result = await client.db('companies').collection("companies").find({'company.name': name}).toArray();
        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function addCompany(company) {
    try {
        const auth = authStore()
        const {
            BSON: { ObjectId },
          } = Realm;
        const app = new Realm.App({ id: 'application-0-qitnr' });
        const credentials = Realm.Credentials.emailPassword(auth.email, auth.password);
        const user = await app.logIn(credentials)
        console.assert(user.id === app.currentUser.id);
        const client = app.currentUser.mongoClient("mongodb-atlas");
        const result = await client.db("companies").collection("companies").insertOne({company});
    } catch (e) {
        console.error(e);
    }
}

export async function updateCompany(filter, updateDoc, options) {
    try {
        const auth = authStore()
        const {
            BSON: { ObjectId },
          } = Realm;
        const app = new Realm.App({ id: 'application-0-qitnr' });
        const credentials = Realm.Credentials.emailPassword(auth.user.email, auth.user.password);
        const user = await app.logIn(credentials)
        console.assert(user.id === app.currentUser.id);
        const client = app.currentUser.mongoClient("mongodb-atlas");
        const result = await client.db("companies").collection("companies").updateOne(filter, updateDoc, options);
    } catch (e) {
        console.error(e);
    }
}

export async function deleteCompany(filter) {
    try {
        const auth = authStore()
        const {
            BSON: { ObjectId },
          } = Realm;
        const app = new Realm.App({ id: 'application-0-qitnr' });
        const credentials = Realm.Credentials.emailPassword(auth.user.email, auth.user.password);
        const user = await app.logIn(credentials)
        console.assert(auth.user.id === app.currentUser.id);
        const client = app.currentUser.mongoClient("mongodb-atlas");
        const result = await client.db("companies").collection("companies").deleteOne(filter);
    } catch (e) {
        console.error(e);
    }
}
