<template>
  <div
    v-if="rerenderer"
    class="w-full h-10 mt-6 text-black flex flex-col justify-center bg-white"
    style="border-radius: 8px; vertical-align: middle"
    :class="{ 
      retrasado: props.fecha < formatDate() && user.role != 'admin', 
      hoy: (props.fecha == formatDate()),
      pospuestas: props.status == 'postponed'
    }"
    @click="showModal"
  >
    <h3
      class="ml-2 text-lg align-middle"
      style="align-items: center !important; vertical-align: middle"
    >
      {{ props.fecha + ' - ' + props.titulo }}
    </h3>
  </div>

  <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg text-black">
        {{ props.titulo }}
      </div>
    </template>
    <template #body>
      <pre class="text-black break-normal w-full whitespace-pre-wrap">
        {{ props.descripcion }}
      </pre>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button color="green" @click="returnTask">
          Retornar a la lista de tareas
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<script setup>
const props = defineProps({
  titulo: String,
  company: String,
  fecha: String,
  descripcion: String,
  status: String,
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

function reRenderer() {
  rerenderer.value = !rerenderer.value;
  nextTick()
  rerenderer.value = !rerenderer.value;
}

function returnTask() {
  companiesArray.companiesArray.forEach(company => {
    if (company.company.name == props.company) {
      for (let i = 0; i < company.company.completedTasks.length; i++) {
        if (company.company.completedTasks[i].title == props.titulo) {
          company.company.tasks.unshift(company.company.completedTasks[i])
          company.company.completedTasks.splice(i, 1);
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
  background-color: #00ff04 !important;
  color: black !important;
}
.hoy {
  background-color: #00ff04 !important;
  color: black !important;
}
.pospuestas {
  background-color: #00ff04 !important;
  color: black !important;
}
</style>
