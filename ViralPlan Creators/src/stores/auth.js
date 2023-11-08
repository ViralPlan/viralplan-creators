import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { companiesArrayStore } from '@/stores/companies.js'
import * as Realm from "realm-web";
import router from '@/router'

export const authStore = defineStore({
  id: 'auth',
  state: () => ({
      // initialize state from local storage to enable user to stay logged in
      user: JSON.parse(localStorage.getItem('user')),
      returnUrl: null
  }),
  actions: {
      async login(username, password) {
        const {
            BSON: { ObjectId },
          } = Realm;
        const app = new Realm.App({ id: 'application-0-qitnr' });
        const credentials = Realm.Credentials.emailPassword(username, password);
        try {
          let user = await app.logIn(credentials)
          if (user.id === app.currentUser.id) {
            user = {'email': username, 'password': password}
            this.user = user

            const companiesStore = companiesArrayStore()
            companiesStore.$reset()
          
            companiesStore.companiesArrayPromise.then((result) => {
              result.forEach(company => {
                companiesStore.companiesArray.push(company)
              })
            })
          }
        } catch (error) {
          console.error("Failed to log in", error);
          this.user = null
        }
        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(this.user));

        // redirect to previous url or default to home page
        router.push('/');
      }
  }
});