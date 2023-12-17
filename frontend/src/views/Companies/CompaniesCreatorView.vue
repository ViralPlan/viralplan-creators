<template>
    <h1>Creador de compañías</h1>
    <fwb-input v-model="name" label="Nombre" placeholder="Nombre de la compañía" size="md" />
    <fwb-input v-model="tel" label="Teléfono" placeholder="Número con Whatsapp" size="md" />
    <fwb-input v-model="email" label="Correo Electrónico" placeholder="Dirección de email de la compañía" size="md" />
    <fwb-input v-model="form" label="Formulario" placeholder="Formulario de información rellenado por la compañía" size="md" />
</template>

<script setup>
    import { ref } from 'vue'
    import { FwbInput } from 'flowbite-vue'
    import { companySelectedStore } from '../../stores/company';

    const companyStore = companySelectedStore()
    const name = ref('')
    const email = ref('')
    const tel = ref('')
    const form = ref('')
    const ideas = []
    const plans = []

    companyStore.companySelectedObject = {
        company: {
            name: name,
            email: email,
            tel: tel,
            form: form,
            ideas: ideas,
            plans: plans
        }
    }
</script>