<template>
  <fwb-sidebar>
    <router-link :to="{ name: 'home' }">
      <fwb-sidebar-logo style="color: black;" name="ViralPlan" logo="C:\\Users\\pmpls\\Desktop\\codebase\\ViralPlan\\viralplan-creators\\ViralPlan Creators\\src\\assets\\logo.jpg" tag="router-link" />
    </router-link>
    <fwb-sidebar-item>
      <template #default>
        <router-link :to="{ name: 'home' }">
          Inicio
        </router-link>
      </template>
    </fwb-sidebar-item>
    <fwb-sidebar-item>
      <template #default>
        <router-link :to="{ name: 'companies'}">
          Compañías
        </router-link>
      </template>
    </fwb-sidebar-item>
    <fwb-sidebar-item>
      <template #default>
        <router-link :to="{ name: 'plans' }">
          Planes
        </router-link>
      </template>
    </fwb-sidebar-item>
  </fwb-sidebar>
</template>

<script setup>
  import { FwbSidebar, FwbSidebarItem, FwbSidebarLogo } from 'flowbite-vue'
</script>

<style scoped>

</style>