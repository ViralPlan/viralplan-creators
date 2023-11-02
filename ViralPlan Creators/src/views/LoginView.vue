<template class="h-screen py-auto">
    <h1 class="mb-8 mt-12 text-6xl"><strong>ViralPlan Login</strong></h1>
    <fwb-input v-model="email" v-on:change="emailPasswordWarning=false" label="Correo Electrónico" placeholder="Tu correo electrónico" size="md" />
    <fwb-input v-model="password" v-on:change="emailPasswordWarning=false" label="Contraseña" placeholder="Tu contraseña" size="md" />
    <p class="text-red-500" v-if="warning">Correo electrónico o contraseña incorrectos</p>
    <p class="text-red-500" v-if="emailPasswordWarning">Debe introducir un correo electrónico y contraseña</p>
    <button v-on:click="authenticate()" type="button" class="text-white mt-8 bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-full dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800">Iniciar Sesión</button>
</template>

<script setup>
    import { ref } from 'vue'
    import router from '@/router/index.js';
    import { authStore } from '@/stores/auth.js'
    import { FwbInput } from 'flowbite-vue'
    import * as Realm from "realm-web";
    const auth = authStore()
    const email = ref('')
    const password = ref('')
    let warning = ref(false)
    let emailPasswordWarning = ref(false)
    let passwordWarning = ref(false)

    async function authenticate() {
        if (email == '' || password == '') {
            emailPasswordWarning = true;
            auth.auth = false;
        } else {
            auth.auth = await log(email.value, password.value);
            if (auth.auth) {
                warning = false;
                emailPasswordWarning = false;
                router.push('/');
            } else {
                warning = true;
            }
        }
    }

    async function log(email, password) {
        try {
            const {
                BSON: { ObjectId },
            } = Realm;
            const app = new Realm.App({ id: 'application-0-qitnr' });
            // Create an anonymous credential
            const credentials = Realm.Credentials.emailPassword(email, password);
            // Authenticate the user
            const user = await app.logIn(credentials)

            if (user.id === app.currentUser.id) {
                auth.email = email;
                auth.password = password;
                auth.client = app;
                return true;

            } else {
                warning = true;
                return false;
            }
        } catch (error) {
            warning = true;
            return false;
        }
    }
</script>

<style>
label {
    color: white !important;
}
</style>