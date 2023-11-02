<script setup>
  import Sidebar from './components/App/Sidebar.vue'
  import { useRoute } from 'vue-router'
  import router from './router/index.js';
  import { companySelectedStore } from './stores/company.js';
  import { companiesArrayStore } from './stores/companies.js'
  import { authStore } from './stores/auth';
  import { watch } from 'vue';
  import { updateCompany } from '@/utils/db/companyModel.js';
  import { processInput } from '@/utils/plans/processInput.js';
  import { save, resetValues, cancelPlans, cancelCompanies } from '@/utils/db/misc.js';


  const auth = authStore()
  const companyStore = companySelectedStore()

  watch(() => auth.auth, () => {
    if (auth.auth) {
      const companiesStore = companiesArrayStore()
    
      companiesStore.companiesArrayPromise.then((result) => {
        result.forEach(company => {
          companiesStore.companiesArray.push(company)
        })
      })
    }
  })

  if (auth.auth) {
    const companiesStore = companiesArrayStore()
  
    companiesStore.companiesArrayPromise.then((result) => {
      result.forEach(company => {
        companiesStore.companiesArray.push(company)
      })
    })
  }

/*   function resetValues() {
    const companiesStore = companiesArrayStore()
    companyStore.$reset()
    companiesStore.$reset()
    companiesStore.companiesArrayPromise.then((result) => {
      result.forEach(company => {
        companiesStore.companiesArray.push(company)
      })
    }) 
  }
  function cancelPlans() {
    resetValues()
    router.push({name: 'home'})
  }
  function cancelCompanies() {
    resetValues()
    router.push({name: 'home'})
  }
  function save() {
    const filter = { 'company.name': companyStore.companySelectedObject['company']['name']}
    const options = { upsert: true };
    if (companyStore.planSelectedObject.date != '') {
      let up = false;
      for (let i = 0; i < companyStore.companySelectedObject.company.plans.length; i++) {
        if (companyStore.companySelectedObject.company.plans[i].date == companyStore.planSelected) {
          companyStore.companySelectedObject.company.plans[i] = companyStore.planSelectedObject
          up = true;
        }
      }
      if (!up) {
        companyStore.companySelectedObject.company.plans.push(companyStore.planSelectedObject)
      }

      // companyStore.companySelectedObject.company.plans.push(companyStore.planSelectedObject)
    }
    // Specify the update to set a value for the plot field
    const updateDoc = {
      $set: {
        company: companyStore.companySelectedObject.company
      },
    };
    updateCompany(filter, updateDoc, options)
  } */
</script>

<template id="main">
  <div class="grid grid-cols-4">
    <div class="col-span-1 min-h-screen w-4/5">
      <Sidebar v-if="useRoute().name != 'login'"/>
    </div>
    <div class="col-span-2">
      <router-view />
    </div>
    <div class="col-span-1 p-8">
      <template id="companies" v-if="useRoute().name === 'companies'" class="text-center">
        <button v-on:click="router.push('/companies/creator')" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Crear Compañía</button>
        <button v-on:click="() => {
          if (companyStore.companySelected == '') {
            companyStore.companyWarning = true;
          } else {
            companyStore.companyWarning = false;
            router.push('/companies/editor')
          }
        }" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Editar Compañía</button>
        <button v-on:click="() => {
          if (companyStore.companySelected == '') {
            companyStore.companyWarning = true;
          } else {
            companyStore.companyWarning = false;
            router.push('/companies/eraser')
          }
        }" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Eliminar Compañía</button>
      </template>
      <template id="companies-editor" v-else-if="useRoute().name === 'companies-editor'">
        <button v-on:click="{
          save();
          cancelCompanies();
        }" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Guardar Edición</button>
        <button v-on:click="() => {
          cancelCompanies();
        }" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Cancelar Edición</button>
      </template>
      <template id="companies-creator" v-else-if="useRoute().name === 'companies-creator'">
        <button v-on:click="() => {
          save();
          cancelCompanies();
        }" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Guardar Creación</button>
        <button v-on:click="cancelCompanies()" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Cancelar Creación</button>
      </template>
      <template id="companies-eraser" v-else-if="useRoute().name === 'companies-eraser'">
        <button v-on:click="cancelCompanies()" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Cancelar</button>
      </template>
      <template id="plans" v-else-if="useRoute().name === 'plans'" class="text-center">
        <button v-on:click="() => {
          if (companyStore.companySelected == '') {
            companyStore.companyWarning = true;
          } else {
            companyStore.companyWarning = false;
            companyStore.planWarning = false;
            router.push('/plans/creator')
          }
        }" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Crear Plan</button>
        <button v-on:click="() => {
          if (companyStore.companySelected == '') {
            companyStore.companyWarning = true;
          } else if (companyStore.planSelected == '') {
            companyStore.planWarning = true;
          } else {
            companyStore.companyWarning = false;
            companyStore.planWarning = false;

            router.push('/plans/editor')
          }
        }" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Editar Plan</button>
        <button v-on:click="() => {
          if (companyStore.companySelected == '') {
            companyStore.companyWarning = true;
          } else if (companyStore.planSelected == '') {
            companyStore.planWarning = true;
          } else {
            companyStore.companyWarning = false;
            companyStore.planWarning = false;
            processInput(companyStore.companySelected, companyStore.planSelectedObject)
          }
        }" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Descargar Plan</button>
        <button v-on:click="() => {
          if (companyStore.companySelected == '') {
            companyStore.companyWarning = true;
          } else if (companyStore.planSelected == '') {
            companyStore.planWarning = true;
          } else {
            companyStore.companyWarning = false;
            companyStore.planWarning = false;
            router.push('/plans/eraser')
          }
        }" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Eliminar Plan</button>
      </template>
      <template id="plans-editor" v-else-if="useRoute().name === 'plans-editor'">
        <button v-on:click="() => {
          save()
          cancelPlans()
        }" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Guardar Edición</button>
        <button v-on:click="cancelPlans()" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Cancelar Edición</button>
      </template>
      <template id="plans-creator" v-else-if="useRoute().name === 'plans-creator'">
        <button v-on:click="() => {
          save()
          cancelPlans()
        }" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Guardar Creación</button>
        <button v-on:click="cancelPlans()" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Cancelar Creación</button>
      </template>
      <template id="plans-eraser" v-else-if="useRoute().name === 'plans-eraser'">
        <button v-on:click="cancelPlans()" type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Cancelar</button>
      </template>
    </div>
  </div>
</template>

<style>
@import "./assets/main.css";

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
