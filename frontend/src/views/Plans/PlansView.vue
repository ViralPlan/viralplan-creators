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

let plans = [];
let companyNames = [];
companiesStore.companiesArray.forEach((company) => {
  companyNames.push(company['company']['name']);
});
</script>

<template>
  <div class="companies">
    <h1 class="text-3xl"><strong>Planes</strong></h1>
    <p>
      Este es el manejador de planes. Desde aquí, podrás crear planes asociados
      a cada compañía y utilizar el poder de GPT-4 para crear los planes de
      contenido de las empresas.
    </p>
    <br />

    <CDropdown class="bg-pink-600 w-full mb-4">
      <CDropdownToggle
        v-if="companyStore.companySelected == ''"
        class="text-white"
        >Selecciona una compañía</CDropdownToggle
      >
      <CDropdownToggle v-else class="text-white">{{
        companyStore.companySelected
      }}</CDropdownToggle>
      <CDropdownMenu class="w-full">
        <CDropdownItem
          v-for="company in companiesStore.companiesArray"
          href="#"
          @click="
            () => {
              companyStore.companySelected = company['company']['name'];
              companyStore.companySelectedObject = company;
              companyStore.planSelected = '';
            }
          "
          >{{ company['company']['name'] }}</CDropdownItem
        >
      </CDropdownMenu>
    </CDropdown>
    <p v-if="companyStore.companyWarning == true" class="text-red-500">
      Por favor, selecciona una compañía
    </p>

    <CDropdown
      v-if="companyStore.companySelected != ''"
      class="bg-pink-600 w-full"
    >
      <CDropdownToggle v-if="companyStore.planSelected == ''" class="text-white"
        >Selecciona un plan</CDropdownToggle
      >
      <CDropdownToggle v-else class="text-white">{{
        companyStore.planSelected
      }}</CDropdownToggle>
      <CDropdownMenu class="w-full">
        <CDropdownItem
          v-for="plan in companyStore.companySelectedObject.company.plans"
          href="#"
          @click="
            () => {
              companyStore.planSelected = plan.date;
              companyStore.planSelectedObject = plan;
            }
          "
          >{{ plan.date }}</CDropdownItem
        >
      </CDropdownMenu>
    </CDropdown>
    <p v-if="companyStore.planWarning == true" class="text-red-500">
      Por favor, selecciona un plan
    </p>
  </div>
</template>

<style></style>
