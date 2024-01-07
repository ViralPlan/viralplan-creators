import { companySelectedStore } from '@/stores/company.js';
import { companiesArrayStore } from '@/stores/companies.js';
import { updateCompany } from '@/utils/db/companyModel.js';
import { userStore } from '../../stores/user';
import { getPreviousMonday } from '@/utils/dates.js';
import router from '@/router/index.js';
import * as Realm from 'realm-web';
import { formatDate } from '@/utils/dates.js';

export async function updateUser() {
  try {
    const {
      BSON: { ObjectId },
    } = Realm;
    const userField = userStore();
    const app = new Realm.App({ id: 'application-0-qitnr' });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    const filter = {
      'user.email': userField.email,
    };
    console.assert(user.id === app.currentUser.id);
    const client = app.currentUser.mongoClient('mongodb-atlas');
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        user: {
          email: userField.email,
          tier: userField.tier,
          date: userField.date,
          tokens: userField.tokens,
        },
      },
    };
    await client
      .db('companies')
      .collection('users')
      .updateOne(filter, updateDoc, options);
  } catch (err) {
    console.log(err);
  }
}

export async function saveGoodIdea(idea) {
  if (idea == '') {
    return;
  }
  try {
    const companyStore = companySelectedStore();
    const {
      BSON: { ObjectId },
    } = Realm;
    const app = new Realm.App({ id: 'application-0-qitnr' });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser.id);
    const client = app.currentUser.mongoClient('mongodb-atlas');

    const document = {
      idea: {
        date: formatDate(),
        company: companyStore.companySelected,
        idea: idea,
      },
    };
    const result = await client
      .db('companies')
      .collection('good-ideas')
      .insertOne(document);
  } catch (err) {
    console.log(err);
  }
}

export async function saveInitialIdeas(ideas) {
  try {
    const companyStore = companySelectedStore();
    let document = {};
    const {
      BSON: { ObjectId },
    } = Realm;
    const app = new Realm.App({ id: 'application-0-qitnr' });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser.id);
    const client = app.currentUser.mongoClient('mongodb-atlas');
    let result = [];

    for (let i = 0; i < ideas.length; i++) {
      if (ideas[i] == '') {
        continue;
      }
      document = {
        idea: {
          date: formatDate(),
          company: companyStore.companySelected,
          idea: ideas[i],
        },
      };
      result = await client
        .db('companies')
        .collection('bad-ideas')
        .insertOne(document);
    }
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
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser.id);
    const client = app.currentUser.mongoClient('mongodb-atlas');
    const result = await client
      .db('companies')
      .collection('users')
      .find({ 'user.email': email });

    let last_monday = getPreviousMonday();

    const userField = userStore();

    if (result.length > 0) {
      userField.date = result[0].user.date;
      userField.tokens = parseInt(result[0].user.tokens);
      userField.tier = parseInt(result[0].user.tier);
      userField.role =
        typeof result[0].user.role == 'undefined'
          ? 'planner'
          : result[0].user.role;
      userField.companies =
        typeof result[0].user.companies == 'undefined'
          ? []
          : result[0].user.companies;

      if (last_monday != result[0].user.date) {
        const filter = {
          'user.email': result[0].user.email,
        };
        result[0].user.date = last_monday;

        result[0].user.tokens = 30 + 30 * userField.tier;
        const options = { upsert: true };
        const updateDoc = {
          $set: result[0],
        };
        await client
          .db('companies')
          .collection('users')
          .updateOne(filter, updateDoc, options);
      }
      return result[0].user.tokens;
    } else {
      try {
        const document = {
          user: {
            email: email,
            tokens: 30,
            tier: 0,
            date: last_monday,
            role: 'planner',
            companies: [],
          },
        };
        const result = await client
          .db('companies')
          .collection('users')
          .insertOne(document);
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
  const companiesStore = companiesArrayStore();
  const companyStore = companySelectedStore();
  await companyStore.$reset();
  await companiesStore.$reset();
  companiesStore.companiesArrayPromise.then((result) => {
    result.forEach((company) => {
      companiesStore.companiesArray.push(company);
    });
  });
}

export async function cancelPlans() {
  resetValues().then(() => {
    router.push({ name: 'home' });
  });
}
export async function cancelCompanies() {
  resetValues().then(() => {
    router.push({ name: 'home' });
  });
}
export function save(deleting = false) {
  const companyStore = companySelectedStore();
  const filter = {
    'company.name': companyStore.companySelectedObject['company']['name'],
  };
  const options = { upsert: true };

  let up = false;
  for (
    let i = 0;
    i < companyStore.companySelectedObject.company.plans.length;
    i++
  ) {
    if (
      companyStore.companySelectedObject.company.plans[i].date ==
        companyStore.planSelected &&
      !deleting
    ) {
      companyStore.companySelectedObject.company.plans[i] =
        companyStore.planSelectedObject;
      up = true;
    }
  }
  if (!up && !deleting) {
    companyStore.companySelectedObject.company.plans.push(
      companyStore.planSelectedObject
    );
  }
  // Specify the update to set a value for the plot field
  const updateDoc = {
    $set: {
      company: companyStore.companySelectedObject.company,
    },
  };

  updateCompany(filter, updateDoc, options).then((result) => {
    resetValues().then(() => {
      router.push({ name: 'home' });
    });
  });
}

export function inArray(needle, haystack) {
  for (var i = 0; i < haystack.length; i++) {
    if (haystack[i] == needle) return true;
  }
}


