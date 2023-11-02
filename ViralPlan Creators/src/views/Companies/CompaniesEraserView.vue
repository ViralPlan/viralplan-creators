<template>
    <h1>¿Estás segur@ de lo que haces?</h1>
    <p>Estás intentando borrar la compañía <strong>{{ companyStore.companySelected }}</strong>. Por seguridad de los datos,
    escribe el nombre de la compañía para poder borrarla, ya que al hacerlo, se borrarán todos los planes asociados a esta.
    Esta operación solo debe hacerse en caso de que la personas competente haya solicitado el borrado de los datos, NO si
    esta ha dejado de ser cliente de ViralPlan.
    </p>
    <fwb-input v-model="value" label="Nombre" placeholder="Nombre de la compañía" size="md" />
    <button v-on:click="() => {

    }" :disabled=disabled type="button" class="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Eliminar compañía</button>
</template>

<script setup>
import { companySelectedStore } from '../../stores/company';
import { FwbInput } from 'flowbite-vue';
import { ref, watch } from 'vue';
import { cancelCompanies } from '@/utils/db/misc.js'
import { deleteCompany } from '@/utils/db/companyModel.js'

const companyStore = companySelectedStore()
let value = ref('')
let disabled = ref(false)

watch(() => {return value}, (value) => {
    if (value == companyStore.companySelected) {
        value = false
    } else {
        value = true
    }
})
</script>