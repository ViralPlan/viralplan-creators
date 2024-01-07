<script setup>
import Sidebar from './components/App/Sidebar.vue';
import { useRoute } from 'vue-router';
import { getUserTokens } from '@/utils/db/misc.js';
import router from './router/index.js';
import { companySelectedStore } from './stores/company.js';
import { companiesArrayStore } from './stores/companies.js';
import { userStore } from './stores/user.js';
import { usersStore } from './stores/users.js';
import { getUser, getUsers, updateUser } from './utils/db/userModel.js';
import { useAuth0 } from '@auth0/auth0-vue';
import { processInput } from '@/utils/plans/processInput.js';
import { save, cancelPlans, cancelCompanies } from '@/utils/db/misc.js';
import { watch } from 'vue';

const companyStore = companySelectedStore();

const { isAuthenticated, isLoading, user } = useAuth0();

watch(isLoading, async (currentValue) => {
  if (!currentValue) {
    if (isAuthenticated.value) {
      const companiesStore = companiesArrayStore();
      const users = usersStore();
      companiesStore.$reset();
      const onlineUser = user ? user.value : '';

      const localUser = userStore();
      localUser.email = onlineUser.email;

      let tempUser = await getUser(localUser.email);

      localUser.tier = tempUser.user.tier;
      localUser.date = tempUser.user.date;
      localUser.tokens = tempUser.user.tokens;
      localUser.role =
        typeof tempUser.user.role == 'undefined'
          ? 'planner'
          : tempUser.user.role;
      localUser.companies =
        typeof tempUser.user.companies == 'undefined'
          ? []
          : tempUser.user.companies;

      localUser.tokens = await getUserTokens(localUser.email);
      // updateUser(localUser)

      if (localUser.role == 'admin') {
        users.users = await getUsers();
      }

      companiesStore.companiesArrayPromise.then((result) => {
        result.forEach((company) => {
          companiesStore.companiesArray.push(company);
        });
      });
    }
  }
});
</script>

<template id="main">
  <div class="grid grid-cols-4">
    <div class="col-span-1 min-h-screen w-4/5">
      <Sidebar v-if="useRoute().name != 'login'" />
    </div>
    <div class="col-span-2 mt-8">
      <router-view />
    </div>
    <div class="col-span-1 p-8">
      <template
        v-if="useRoute().name === 'companies'"
        id="companies"
        class="text-center"
      >
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="router.push('/companies/creator')"
        >
          Crear Compañía
        </button>
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="
            () => {
              if (companyStore.companySelected == '') {
                companyStore.companyWarning = true;
              } else {
                companyStore.companyWarning = false;
                router.push('/companies/editor');
              }
            }
          "
        >
          Editar Compañía
        </button>
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="
            () => {
              if (companyStore.companySelected == '') {
                companyStore.companyWarning = true;
              } else {
                companyStore.companyWarning = false;
                router.push('/companies/eraser');
              }
            }
          "
        >
          Eliminar Compañía
        </button>
      </template>
      <template
        v-else-if="useRoute().name === 'companies-editor'"
        id="companies-editor"
      >
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="
            {
              save();
            }
          "
        >
          Guardar Edición
        </button>
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="
            () => {
              cancelCompanies();
            }
          "
        >
          Cancelar Edición
        </button>
      </template>
      <template
        v-else-if="useRoute().name === 'companies-creator'"
        id="companies-creator"
      >
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="
            () => {
              save();
            }
          "
        >
          Guardar Creación
        </button>
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="cancelCompanies()"
        >
          Cancelar Creación
        </button>
      </template>
      <template
        v-else-if="useRoute().name === 'companies-eraser'"
        id="companies-eraser"
      >
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="cancelCompanies()"
        >
          Cancelar
        </button>
      </template>
      <template
        v-else-if="useRoute().name === 'plans'"
        id="plans"
        class="text-center"
      >
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="
            () => {
              if (companyStore.companySelected == '') {
                companyStore.companyWarning = true;
              } else {
                companyStore.companyWarning = false;
                companyStore.planWarning = false;
                router.push('/plans/creator');
              }
            }
          "
        >
          Crear Plan
        </button>
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="
            () => {
              if (companyStore.companySelected == '') {
                companyStore.companyWarning = true;
              } else if (companyStore.planSelected == '') {
                companyStore.planWarning = true;
              } else {
                companyStore.companyWarning = false;
                companyStore.planWarning = false;

                router.push('/plans/editor');
              }
            }
          "
        >
          Editar Plan
        </button>
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="
            () => {
              if (companyStore.companySelected == '') {
                companyStore.companyWarning = true;
              } else if (companyStore.planSelected == '') {
                companyStore.planWarning = true;
              } else {
                companyStore.companyWarning = false;
                companyStore.planWarning = false;
                processInput(
                  companyStore.companySelected,
                  companyStore.planSelectedObject
                );
              }
            }
          "
        >
          Descargar Plan
        </button>
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="
            () => {
              if (companyStore.companySelected == '') {
                companyStore.companyWarning = true;
              } else if (companyStore.planSelected == '') {
                companyStore.planWarning = true;
              } else {
                companyStore.companyWarning = false;
                companyStore.planWarning = false;
                router.push('/plans/eraser');
              }
            }
          "
        >
          Eliminar Plan
        </button>
      </template>
      <template
        v-else-if="useRoute().name === 'plans-editor'"
        id="plans-editor"
      >
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="
            () => {
              save();
            }
          "
        >
          Guardar Edición
        </button>
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="cancelPlans()"
        >
          Cancelar Edición
        </button>
      </template>
      <template
        v-else-if="useRoute().name === 'plans-creator'"
        id="plans-creator"
      >
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="
            () => {
              save();
            }
          "
        >
          Guardar Creación
        </button>
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="cancelPlans()"
        >
          Cancelar Creación
        </button>
      </template>
      <template
        v-else-if="useRoute().name === 'plans-eraser'"
        id="plans-eraser"
      >
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="cancelPlans()"
        >
          Cancelar
        </button>
      </template>
    </div>
  </div>
</template>

<style>
@import './assets/main.css';

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
