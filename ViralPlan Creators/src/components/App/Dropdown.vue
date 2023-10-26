<template>
    <button class="bg-white text-black rounded-12" @click="toggle">Selecciona una compañía</button>
    <div v-if="active">
        <ul>
            <li v-for="name in companyNames">

            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            active: false,
        }
    },
    methods: {
        toggle () {
            this.active = !this.active
        }
    }
}
</script>