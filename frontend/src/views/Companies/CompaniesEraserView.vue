<template>
  <h1>¿Estás segur@ de lo que haces?</h1>
  <p>
    Estás intentando borrar la compañía
    <strong>{{ companyStore.companySelected }}</strong
    >. Al hacerlo, se borrarán todos los planes asociados a esta. Esta operación
    solo debe hacerse en caso de que la persona competente haya solicitado el
    borrado de los datos, NO si esta ha dejado de ser cliente de ViralPlan.
    ¿Deseas proceder?
  </p>
  <button
    type="button"
    class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
    @click="
      () => {
        deleteCompany({
          'company.name': companyStore.companySelected,
        });
        cancelCompanies();
      }
    "
  >
    Eliminar compañía
  </button>
</template>

<script setup>
import { companySelectedStore } from '../../stores/company';
import { deleteCompany } from '@/utils/db/companyModel.js';
import { cancelCompanies } from '@/utils/db/misc.js';

const companyStore = companySelectedStore();
</script>
