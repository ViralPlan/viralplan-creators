<template>
  <main v-if="rerenderer">
    <h1 class="text-4xl mb-4"><strong>ViralPlan Creators</strong></h1>
    <div v-if="user.role != 'admin'">
      <h2 class="text-white text-2xl"><strong>Tus tareas</strong></h2>
      <div class="w-full h-4 mt-2 text-white flex flex-row">
        <span
          :class="{ selected: selectedTab == company, always: true }"
          v-for="company in user.companies"
          v-on:click="selectedTab = company"
          >{{ company }}</span
        >
      </div>
      <div
        class="w-full pb-6 px-6 mt-3 mb-0"
        style="
          height: 70vh;
          border-radius: 8px;
          background-color: #808080;
          justify-content: space-between;
          overflow-x: hidden !important;
        "
      >
        <div v-for="company in companiesStore.companiesArray">
          <PopupModal
            v-for="companyTask in company.company.tasks"
            v-if="
              inArray(company.company.name, user.companies) &&
              selectedTab == company.company.name &&
              rerenderer
            "
            :titulo="companyTask.title"
            :descripcion="companyTask.description"
            :fecha="companyTask.date"
            :company="company.company.name"
            :status="companyTask.status"
          />
        </div>
      </div>
    </div>
    <div v-if="user.role != 'admin'">
      <h2 class="text-white text-2xl mt-2"><strong>Tus tareas completadas</strong></h2>
      <div
        class="w-full pb-6 px-6 mt-3 mb-0"
        style="
          height: 70vh;
          border-radius: 8px;
          background-color: #808080;
          justify-content: space-between;
          overflow-x: hidden !important;
        "
      >
        <div v-for="company in companiesStore.companiesArray">
          <PopupModalCompletedTask
            v-for="companyTask in company.company.completedTasks"
            v-if="
              inArray(company.company.name, user.companies) &&
              selectedTab == company.company.name &&
              rerenderer
            "
            :titulo="companyTask.title"
            :descripcion="companyTask.description"
            :fecha="companyTask.date"
            :company="company.company.name"
            :status="companyTask.status"
          />
        </div>
      </div>
    </div>
    <div v-else class="w-full pb-6 px-6 mt-3 mb-0">
      <h3 class="text-white text-lg">Gestor de usuarios</h3>
      <Suspense>
        <CDropdown class="bg-pink-600 w-full mb-4">
          <CDropdownToggle v-if="userSelected == ''" class="text-white"
            >Selecciona un usuario</CDropdownToggle
          >
          <CDropdownToggle v-else class="text-white">{{
            userSelected.email
          }}</CDropdownToggle>
          <CDropdownMenu class="w-full">
            <CDropdownItem
              v-for="user in users.users"
              href="#"
              @click="
                () => {
                  userSelected = user.user;
                  reRenderer()
                }
              "
              >{{ user.user.email }}</CDropdownItem
            >
          </CDropdownMenu>
        </CDropdown>
      </Suspense>
      <p v-if="(userSelected !== '' && userSelected.companies.length > 0)">
        Las compañías asignadas a este usuario para trabajar en ellas son:
        {{ userSelected.companies.join(', ') }}
      </p>
      <p v-else-if="userSelected != ''">
        Hasta el momento, no hay compañías asignadas a este usuario
      </p>
      <CDropdown class="bg-pink-600 w-full mb-4 mt-4">
        <CDropdownToggle v-if="companySelected == ''" class="text-white"
          >Selecciona una compañía</CDropdownToggle
        >
        <CDropdownToggle v-else class="text-white">{{
          companySelected
        }}</CDropdownToggle>
        <CDropdownMenu class="w-full">
          <CDropdownItem
            v-for="company in companiesStore.companiesArray"
            href="#"
            @click="
              () => {
                companySelected = company.company.name;
              }
            "
            >{{ company.company.name }}</CDropdownItem
          >
        </CDropdownMenu>
      </CDropdown>
      <div class="w-full justify-center align-middle center">
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 align-middle justify-center mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="assignCompany(companySelected, userSelected.email)"
        >
          Asignar compañía
        </button>
        <button
          type="button"
          class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 ml-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
          @click="deAssignCompany(companySelected, userSelected.email)"
        >
          Desasignar compañía
        </button>
      </div>
      <div
        class="w-full pb-6 px-6 mt-3 mb-0"
        style="
          height: 70vh;
          border-radius: 8px;
          background-color: #808080;
          justify-content: space-between;
          overflow-x: hidden !important;
        "
      >
        <PopupModal
          v-for="companyTask in lateTasks"
          v-if="rerenderer"
          :titulo="companyTask.title + ' - ' + companyTask.company"
          :descripcion="companyTask.description"
          :fecha="companyTask.date"
          :company="companyTask.company"
          :status="companyTask.status"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { formatDate } from '../utils/dates';
import { updateCompanyTasks } from '@/utils/db/companyModel.js';
import { getFirstTaskList } from '@/assets/taskList.js';
import { updateUser } from '../utils/db/userModel.js';
import PopupModal from '../components/App/PopupModal.vue';
import PopupModalCompletedTask from '../components/App/PopupModalCompletedTask.vue';
import { userStore } from '@/stores/user.js';
import { usersStore } from '../stores/users';
import { companiesArrayStore } from '../stores/companies';
import { inArray } from '@/utils/db/misc.js';
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/vue';

const companiesStore = companiesArrayStore();
const user = userStore();
const users = usersStore();
let userSelected = ref('');
let rerenderer = ref(true);
let companySelected = ref('');
let selectedTab = ref('');
let lateTasks = ref([]);

watch(companiesStore.companiesArray, () => {
  lateTasks = [];
  for (let i = 0; i < companiesStore.companiesArray.length; i++) {
    try {
      for (let j = 0; j < companiesStore.companiesArray[i].company.tasks.length; j++) {
        if (companiesStore.companiesArray[i].company.tasks[j].date < formatDate()) {
          lateTasks.push(companiesStore.companiesArray[i].company.tasks[j]);
          lateTasks[lateTasks.length - 1].company = companiesStore.companiesArray[i].company.name;
        }
      }
    } catch (error) {
      console.log(error);
    }
    console.log(lateTasks);
  }
  reRenderer();
})


function reRenderer() {
  rerenderer = !rerenderer;
  nextTick()
  rerenderer = !rerenderer;
}


function assignCompany(companyName, username) {
  for (let i = 0; i < users.users.length; i++) {
    if (users.users[i].user.email == username) {
      users.users[i].user.companies = users.users[i].user.companies.filter(
        (company) => company != companyName
      );
      users.users[i].user.companies.push(companyName);
      updateUser(users.users[i].user);

      for (let j = 0; j < companiesStore.companiesArray.length; j++) {
        if (companiesStore.companiesArray[j].company.name == companyName) {
          if (typeof companiesStore.companiesArray[j].company.tasks == 'undefined') {
            companiesStore.companiesArray[j].company.tasks = []
          }
          if (companiesStore.companiesArray[j].company.tasks.length == 0) {
            companiesStore.companiesArray[j].company.tasks = getFirstTaskList(companyName, formatDate());
            updateCompanyTasks(companiesStore.companiesArray[j].company);
          }
          break;
        }
      }
      reRenderer();
      break;
    }
  }
}

function deAssignCompany(companyName, username) {
  for (let i = 0; i < users.users.length; i++) {
    if (users.users[i].user.email == username) {
      users.users[i].user.companies = users.users[i].user.companies.filter(
        (company) => company != companyName
      );
      updateUser(users.users[i].user);
      reRenderer();
      break;
    }
  }
}
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected {
  color: #ff004d;
}

.always {
  font-size: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>
