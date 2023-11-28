<template>
    <h1>¿Estás segur@ de lo que haces?</h1>
    <p>Estás intentando borrar la compañía <strong>{{ companyStore.companySelected }}</strong>. Por seguridad de los datos,
    escribe el nombre de la compañía para poder borrarla, ya que al hacerlo, se borrarán todos los planes asociados a esta.
    Esta operación solo debe hacerse en caso de que la personas competente haya solicitado el borrado de los datos, NO si
    esta ha dejado de ser cliente de ViralPlan.
    </p>
    <button v-on:click="() => {
        deletePlan()
        save(true)
        cancelPlans()
    }" type="button" class="text-white w-full mt-8 bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Eliminar plan</button>
</template>

<script setup>
import { companySelectedStore } from '../../stores/company';
import { FwbInput } from 'flowbite-vue';
import { save, cancelPlans } from '@/utils/db/misc.js'

const companyStore = companySelectedStore()
function deletePlan() {
    for (let i = 0; i < companyStore.companySelectedObject.company['plans'].length; i++) {
        console.log(companyStore.companySelectedObject.company['plans'][i]['date'])
        if (companyStore.companySelectedObject.company['plans'][i]['date'] == companyStore.planSelected) {
            companyStore.companySelectedObject.company['plans'].splice(i, 1)
        }
    }
}
</script>