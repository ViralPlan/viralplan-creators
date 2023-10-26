<template>
  <router-link :to="{ name: 'home' }" class="flex ">
    <h3>ViralPlan</h3>
    <img src="@/assets/logo.jpg" style="height: 15vh;"> 
  </router-link>
  <div>
    <router-link :to="{ name: 'home' }">
      <h6>Inicio</h6>
    </router-link>
  </div>
  <div>
    <router-link :to="{ name: 'companies'}">
      <h6>Compañías</h6>
    </router-link>
  </div>
  <div>
    <router-link :to="{ name: 'plans' }">
      <h6>Planes</h6>
    </router-link>
  </div>
</template>

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