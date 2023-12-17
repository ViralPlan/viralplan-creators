<template>
    <h1>Creador de compañías</h1>
    <fwb-input v-model="companyStore.companySelectedObject.company.name" label="Nombre" placeholder="Nombre de la compañía" size="md" />
    <fwb-input v-model="companyStore.companySelectedObject.company.tel" label="Teléfono" placeholder="Número con Whatsapp" size="md" />
    <fwb-input v-model="companyStore.companySelectedObject.company.email" label="Correo Electrónico" placeholder="Dirección de email de la compañía" size="md" />
    <fwb-input v-model="companyStore.companySelectedObject.company.form" label="Formulario" placeholder="Formulario de información rellenado por la compañía" size="md" />
</template>

<script setup>
    import { FwbInput } from 'flowbite-vue'
    import { companySelectedStore } from '../../stores/company';

    const companyStore = companySelectedStore()
</script>