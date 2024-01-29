<template>
  <div
    class="w-full h-10 mt-6 text-black flex flex-col justify-center bg-white"
    style="border-radius: 8px; vertical-align: middle"
    @click="showModal"
    v-if="rerenderer"
  >
    <h3
      class="ml-2 text-lg align-middle"
      style="align-items: center !important; vertical-align: middle"
    >
    {{ props.company }} - Feedback diario - {{ props.fecha }}
    </h3>
  </div>

  <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg text-black">
        Feedback diario - {{ props.company }}
      </div>
    </template>
    <template #body>
      <pre class="text-black break-normal w-full whitespace-pre-line">
        {{ descripcion }}
      </pre>
    </template>
  </fwb-modal>
</template>

<script setup>
const props = defineProps({
  company: String,
  fecha: String,
  formVariables: Object,
});

import { ref, nextTick } from 'vue';
import { companiesArrayStore } from '@/stores/companies';
import { FwbButton, FwbModal } from 'flowbite-vue';
import { updateCompanyTasks } from '../../utils/db/companyModel';
import { getSecondTaskList } from '../../assets/taskList';
import { formatDate, getNextBusinessDay, getXDaysAgo } from '../../utils/dates';
import { userStore } from '../../stores/user';


const companiesArray = companiesArrayStore()
const isShowModal = ref(false);
const user = userStore();
let rerenderer = ref(true);

const descripcion = ref('');

for (const [key, value] of Object.entries(props.formVariables)) {
  if (value != '') {
    descripcion.value += '•' + key + value + '\n\n';
  }
}

function reRenderer() {
  rerenderer = !rerenderer;
  nextTick()
  rerenderer = !rerenderer;
}

function completeTask() {
  companiesArray.companiesArray.forEach(company => {
    if (company.company.name == props.company) {
      if (typeof company.company.completedTasks == 'undefined') {
        company.company.completedTasks = []
      }
      for (let i = 0; i < company.company.tasks.length; i++) {
        if (company.company.tasks[i].title == props.titulo) {
          for (let j = 0; j<company.company.completedTasks.length; j++) {
            if (company.company.completedTasks[j].date < getXDaysAgo(7)) {
              company.company.completedTasks.splice(j, 1);
              break;
            }
          }
          company.company.completedTasks.push(company.company.tasks[i])
          company.company.tasks.splice(i, 1);
          if (props.titulo == 'Reunión de formulario' || props.titulo == 'El cliente ha pagado el próximo mes') {
            company.company.tasks = company.company.tasks.concat(getSecondTaskList(company.company.name, formatDate()))
          } 
          break;
        }
      }
      updateCompanyTasks(company.company);
    }
  });
  reRenderer();
  closeModal();
}

function postponeTask() {
  companiesArray.companiesArray.forEach(company => {
    if (company.company.name == props.company) {
      for (let i = 0; i < company.company.tasks.length; i++) {
        if (company.company.tasks[i].title == props.titulo) {
          company.company.tasks[i].date = getNextBusinessDay(props.fecha);
          company.company.tasks[i].status = 'postponed';
          break;
        }
      }
      updateCompanyTasks(company.company);
    }
  });
  reRenderer();
  closeModal();
}

function negateTask() {
  companiesArray.companiesArray.forEach(company => {
    if (company.company.name == props.company) {
      for (let i = 0; i < company.company.tasks.length; i++) {
        if (company.company.tasks[i].title == props.titulo) {
          company.company.tasks.splice(i, 1);
          break;
        }
      }
      updateCompanyTasks(company.company);
    }
  });
  reRenderer();
  closeModal();
}

function closeModal() {
  isShowModal.value = false;
}
function showModal() {
  isShowModal.value = true;
}
</script>

<style scoped>
.retrasado {
  background-color: #ff004d !important;
  color: white !important;
}
.hoy {
  background-color: #ff004d !important;
  color: white !important;
}
.pospuestas {
  background-color: #ff004d !important;
  color: white !important;
}
</style>
