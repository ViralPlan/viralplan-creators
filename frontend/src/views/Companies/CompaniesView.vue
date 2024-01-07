<script setup>
import { companiesArrayStore } from '@/stores/companies.js';
import { companySelectedStore } from '../../stores/company';
import {
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/vue';

const companyStore = companySelectedStore();
const companiesStore = companiesArrayStore();
</script>

<template>
  <div class="companies">
    <h1><strong>Compañías</strong></h1>
    <p>
      Este es el manejador de compañías. Desde aquí, podrás darlas de alta o de
      baja, y editar los datos de alguna si estos cambian. Ante cualquier duda o
      error, consultar al administrador.
    </p>
    <br />

    <CDropdown class="bg-pink-600 w-full">
      <CDropdownToggle
        v-if="companyStore.companySelectedObject['company']['name'] == ''"
        class="text-white"
        >Selecciona una compañía</CDropdownToggle
      >
      <CDropdownToggle v-else class="text-white">{{
        companyStore.companySelectedObject['company']['name']
      }}</CDropdownToggle>
      <CDropdownMenu class="w-full">
        <CDropdownItem
          v-for="companyObject in companiesStore.companiesArray"
          href="#"
          @click="
            () => {
              companyStore.companySelected = companyObject['company']['name'];
              console.log(companyObject);
              companyStore.companySelectedObject._id = companyObject._id;
              companyStore.companySelectedObject.company =
                companyObject.company;
            }
          "
          >{{ companyObject['company']['name'] }}</CDropdownItem
        >
      </CDropdownMenu>
    </CDropdown>
    <p v-if="companyStore.companyWarning == true" class="text-red-500">
      Por favor, selecciona una compañía
    </p>
  </div>
</template>

<style></style>
