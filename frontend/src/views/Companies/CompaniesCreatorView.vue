<template>
  <h1>Creador de compañías</h1>
  <h2 class="mt-6"><strong>Datos básicos del cliente</strong></h2>
  <fwb-input
    v-model="name"
    label="Nombre"
    placeholder="Nombre de la compañía"
    size="md"
  />
  <fwb-input
    v-model="incorporation_date"
    label="Fecha de incorporación"
    placeholder="Fecha en la que se está dando de alta a la compañía"
    size="md"
  />
  <fwb-input
    v-model="hired_plan"
    label="Plan contratado"
    placeholder="Plan o combinación de planes contratado por la empresa"
    size="md"
  />
  <fwb-input
    v-model="modifications"
    label="Modificaciones en el servicio"
    placeholder="Diferencia con el plan estándar contratado que haya solicitado la empresa"
    size="md"
  />

  <h2 class="mt-6"><strong>Presencia en redes sociales</strong></h2>

  <fwb-textarea
    class="w-full"
    v-model="social_networks"
    rows="4"
    label="Redes sociales en las que está presente"
    placeholder="Todas las redes sociales en las que la empresa tiene presencia"
  />
  <fwb-textarea
    class="w-full"
    v-model="usernames"
    rows="4"
    label="Nicknames en cada red"
    placeholder="Nombre de usuario de la empresa en cada red social que tenga"
  />
  <fwb-textarea
    class="w-full"
    v-model="number_of_followers"
    rows="4"
    label="Número de seguidores al empezar la colaboración"
    placeholder="Nº de seguidores de la empresa en cada red social al empezar la colaboración"
  />

  <h2 class="mt-6">
    <strong>Información detallada (Formulario extenso)</strong>
  </h2>
  <fwb-textarea
    class="w-full"
    v-model="form"
    label="Formulario"
    placeholder="Formulario de información rellenado por la compañía"
    rows="4"
  />
  <fwb-textarea
    class="w-full"
    v-model="transcript"
    label="Transcripción de la reunión de formulario"
    placeholder="Transcripción de la reunión realizada con la empresa para obtener su formulario"
    rows="4"
  />
  <fwb-textarea
    class="w-full"
    v-model="summary"
    label="Resumen de la reunión de formulario"
    placeholder="Resumen de la reunión realizada con la empresa para obtener su información"
    rows="4"
  />

  <h2 class="mt-6"><strong>Objetivos y Estrategias de Marketing</strong></h2>
  <fwb-textarea
    class="w-full"
    v-model="objectives"
    label="Objetivos específicos de marketing y comunicación"
    placeholder="Objetivos específicos de marketing y comunicación de la empresa, obtenidos en la reunión de formulario"
    rows="4"
  />
  <fwb-input
    v-model="budget"
    label="Presupuesto para campañas"
    placeholder="Presupuesto disponible de la empresa para campañas publicitarias"
    size="md"
  />
  <fwb-textarea
    class="w-full"
    v-model="objective_audience"
    label="Detalles del público objetivo"
    placeholder="Descripción del público objetivo de los videos a realizar para la empresa"
    rows="4"
  />

  <h2 class="mt-6"><strong>Información del producto o servicio</strong></h2>
  <fwb-textarea
    class="w-full"
    v-model="selling_products"
    label="Productos vendidos por la empresa"
    placeholder="Descripción detallada de los productos que vende la empresa y desea promocionar"
    rows="6"
  />
  <fwb-textarea
    class="w-full"
    v-model="buying_reason"
    label="Motivos de compra"
    placeholder="Razones por las cuáles los clientes compran estos productos o servicios"
    rows="4"
  />

  <h2 class="mt-6"><strong>Sección de Anotaciones y Correcciones</strong></h2>
  <fwb-textarea
    class="w-full"
    v-model="preferences"
    label="Productos vendidos por la empresa"
    placeholder="Descripción detallada de los productos que vende la empresa y desea promocionar"
    rows="8"
  />
</template>

<script setup>
import { ref } from 'vue';
import { FwbInput, FwbTextarea } from 'flowbite-vue';
import { companySelectedStore } from '../../stores/company';

const companyStore = companySelectedStore();
const name = ref('');
const email = ref('');
const tel = ref('');
const form = ref('');
const incorporation_date = ref('');
const hired_plan = ref('');
const modifications = ref('');
const social_networks = ref('');
const usernames = ref('');
const number_of_followers = ref('');
const transcript = ref('');
const summary = ref('');
const objective_audience = ref('');
const budget = ref('');
const objectives = ref('');
const selling_products = ref('');
const buying_reason = ref('');
const preferences = ref('');
const ideas = [];
const plans = [];
const tasks = [];
const completedTasks = [];

companyStore.companySelectedObject = {
  company: {
    name: name,
    incorporation_date: incorporation_date,
    hired_plan: hired_plan,
    modifications: modifications,
    social_networks: social_networks,
    usernames: usernames,
    number_of_followers: number_of_followers,
    transcript: transcript,
    summary: summary,
    objective_audience: objective_audience,
    budget: budget,
    objectives: objectives,
    selling_products: selling_products,
    buying_reason: buying_reason,
    preferences: preferences,
    email: email,
    tel: tel,
    form: form,
    ideas: ideas,
    plans: plans,
    tasks: tasks,
    completedTasks: completedTasks,
  },
};
</script>
