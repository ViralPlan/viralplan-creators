<template>
  <router-link :to="{ name: 'home' }" class="flex">
    <h3>ViralPlan</h3>
    <img src="@/assets/logo.jpg" style="height: 8em" />
  </router-link>
  <div>
    <router-link :to="{ name: 'home' }">
      <h6>Inicio</h6>
    </router-link>
  </div>
  <div>
    <router-link :to="{ name: 'companies' }">
      <h6>Compañías</h6>
    </router-link>
  </div>
  <div>
    <router-link :to="{ name: 'plans' }">
      <h6>Planes</h6>
    </router-link>
  </div>
  <div>
    <button class="button__logout" @click="handleLogout">
      <h6>Cerrar Sesión</h6>
    </button>
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';

const { logout } = useAuth0();

const handleLogout = () =>
  logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });
</script>

<style scoped>
h3 {
  color: white;
  font-size: xx-large;
  margin: auto 0;
}
h6 {
  color: white;
  font-size: x-large;
}
h6:hover {
  color: #ff004d;
  font-size: x-larges;
}
</style>
