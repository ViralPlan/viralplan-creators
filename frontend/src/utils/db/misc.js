import {companySelectedStore} from '@/stores/company.js'
import {companiesArrayStore} from '@/stores/companies.js'
import {updateCompany} from '@/utils/db/companyModel.js'
import { userStore } from '../../stores/user'
import router from '@/router/index.js'
import * as Realm from "realm-web";


export async function updateUser() {
  try {
    const {
        BSON: { ObjectId },
      } = Realm;
    const userField = userStore()
    const app = new Realm.App({ id: 'application-0-qitnr' });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials)
    const filter = {
      'user.email': userField.email
    }
    console.assert(user.id === app.currentUser.id);
    const client = app.currentUser.mongoClient("mongodb-atlas");
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        "user": {
          "email": userField.email,
          "tier": userField.tier,
          "date": userField.date,
          "tokens": userField.tokens
        }
      }
    };
    await client.db("companies").collection("users").updateOne(filter, updateDoc, options);
} catch (err) {
  console.log(err);
}
}

export async function getUserTokens(email) {
  try {
      const {
          BSON: { ObjectId },
        } = Realm;
      const app = new Realm.App({ id: 'application-0-qitnr' });
      const credentials = Realm.Credentials.anonymous();
      const user = await app.logIn(credentials)
      console.assert(user.id === app.currentUser.id);
      const client = app.currentUser.mongoClient("mongodb-atlas");
      const result = await client.db('companies').collection("users").find({'user.email': email});

      let last_monday = getPreviousMonday();

      const userField = userStore()

      if (result.length > 0) {
        userField.date = result[0].user.date;
        userField.tokens = result[0].user.tokens;
        userField.tier = result[0].user.tier;

        if (last_monday != result[0].user.date) {
          const filter = {
            'user.email': result[0].user.email
          }
          result[0].user.date = last_monday
          if (result[0].user.tier > 0) {
            result[0].user.tokens = 60;
          } else {
            result[0].user.tokens = 30
          }
          result[0].user.tokens = 30
          const options = { upsert: true };
          const updateDoc = {
            $set: result[0]
          };
          await client.db("companies").collection("users").updateOne(filter, updateDoc, options);
        }
        return result[0].user.tokens;
      } else {
        try {
            const document = {"user": {
              "email": email,
              "tokens": 30,
              "tier": 0,
              "date": last_monday,
            }}
            const result = await client.db("companies").collection("users").insertOne(document);
            return document.tokens;
        } catch (e) {
            console.error(e);
        }
      }
  } catch (e) {
      console.error(e);
  }
}

export async function resetValues() {
  const companiesStore = companiesArrayStore()
  const companyStore = companySelectedStore()
  await companyStore.$reset()
  await companiesStore.$reset()
  companiesStore.companiesArrayPromise.then((result) => {
    result.forEach(company => {
      companiesStore.companiesArray.push(company)
    })
  }) 
}

export function formatDate() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export async function cancelPlans() {
  resetValues().then(() => {
    router.push({name: 'home'})
  })
}
export async function cancelCompanies() {
  resetValues().then(() => {
    router.push({name: 'home'})
  })
}
export function save(deleting = false) {
  const companyStore = companySelectedStore()
  const filter = { 'company.name': companyStore.companySelectedObject['company']['name']}
  const options = { upsert: true };

  let up = false;
  for (let i = 0; i < companyStore.companySelectedObject.company.plans.length; i++) {
    if ((companyStore.companySelectedObject.company.plans[i].date == companyStore.planSelected) && (!deleting)) {
      companyStore.companySelectedObject.company.plans[i] = companyStore.planSelectedObject
      up = true;
    }
  }
  if (!up && !deleting) {
    companyStore.companySelectedObject.company.plans.push(companyStore.planSelectedObject)
  }
  // Specify the update to set a value for the plot field
  const updateDoc = {
    $set: {
      company: companyStore.companySelectedObject.company
    },
  };
  console.log(updateDoc)
  updateCompany(filter, updateDoc, options)
  .then(result => {
    resetValues().then(() => {
      router.push({name: 'home'})
    })
  })
}


export function getPreviousMonday() {
    var date = new Date();
    var day = date.getDay();
    var prevMonday = new Date();
    if(date.getDay() == 2){
        prevMonday.setDate(date.getDate() - 7);
    }
    else{
        prevMonday.setDate(date.getDate() - (day-1));
    }

    let month = '' + (prevMonday.getMonth() + 1);
    day = '' + prevMonday.getDate();
    let year = prevMonday.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}