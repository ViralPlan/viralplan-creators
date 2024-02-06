<template>
  <h1>Creador de compañías</h1>
  <h2 class="mt-6"><strong>Datos básicos del cliente</strong></h2>
  <fwb-input
    v-model="companyStore.companySelectedObject.company.name"
    label="Nombre"
    placeholder="Nombre de la compañía"
    size="md"
  />
  <fwb-input
    v-model="companyStore.companySelectedObject.company.incorporation_date"
    label="Fecha de incorporación"
    placeholder="Fecha en la que se está dando de alta a la compañía"
    size="md"
  />
  <fwb-input
    v-model="companyStore.companySelectedObject.company.hired_plan"
    label="Plan contratado"
    placeholder="Plan o combinación de planes contratado por la empresa"
    size="md"
  />
  <fwb-input
    v-model="companyStore.companySelectedObject.company.modifications"
    label="Modificaciones en el servicio"
    placeholder="Diferencia con el plan estándar contratado que haya solicitado la empresa"
    size="md"
  />

  <h2 class="mt-6"><strong>Presencia en redes sociales</strong></h2>

  <fwb-textarea
    v-model="companyStore.companySelectedObject.company.social_networks"
    class="w-full"
    rows="4"
    label="Redes sociales en las que está presente"
    placeholder="Todas las redes sociales en las que la empresa tiene presencia"
  />
  <fwb-textarea
    v-model="companyStore.companySelectedObject.company.usernames"
    class="w-full"
    rows="4"
    label="Nicknames en cada red"
    placeholder="Nombre de usuario de la empresa en cada red social que tenga"
  />
  <fwb-textarea
    v-model="companyStore.companySelectedObject.company.number_of_followers"
    class="w-full"
    rows="4"
    label="Número de seguidores al empezar la colaboración"
    placeholder="Nº de seguidores de la empresa en cada red social al empezar la colaboración"
  />

  <h2 class="mt-6">
    <strong>Información detallada (Formulario extenso)</strong>
  </h2>
  <fwb-textarea
    v-model="companyStore.companySelectedObject.company.form"
    class="w-full"
    label="Formulario"
    placeholder="Formulario de información rellenado por la compañía"
    rows="4"
  />
  <fwb-textarea
    v-model="companyStore.companySelectedObject.company.transcript"
    class="w-full"
    label="Transcripción de la reunión de formulario"
    placeholder="Transcripción de la reunión realizada con la empresa para obtener su formulario"
    rows="4"
  />
  <fwb-textarea
    v-model="companyStore.companySelectedObject.company.summary"
    class="w-full"
    label="Resumen de la reunión de formulario"
    placeholder="Resumen de la reunión realizada con la empresa para obtener su información"
    rows="4"
  />

  <h2 class="mt-6"><strong>Objetivos y Estrategias de Marketing</strong></h2>
  <fwb-textarea
    v-model="companyStore.companySelectedObject.company.objectives"
    class="w-full"
    label="Objetivos específicos de marketing y comunicación"
    placeholder="Objetivos específicos de marketing y comunicación de la empresa, obtenidos en la reunión de formulario"
    rows="4"
  />
  <fwb-input
    v-model="companyStore.companySelectedObject.company.budget"
    label="Presupuesto para campañas"
    placeholder="Presupuesto disponible de la empresa para campañas publicitarias"
    size="md"
  />
  <fwb-textarea
    v-model="companyStore.companySelectedObject.company.objective_audience"
    class="w-full"
    label="Detalles del público objetivo"
    placeholder="Descripción del público objetivo de los videos a realizar para la empresa"
    rows="4"
  />

  <h2 class="mt-6"><strong>Información del producto o servicio</strong></h2>
  <fwb-textarea
    v-model="companyStore.companySelectedObject.company.selling_products"
    class="w-full"
    label="Productos vendidos por la empresa"
    placeholder="Descripción detallada de los productos que vende la empresa y desea promocionar"
    rows="6"
  />
  <fwb-textarea
    v-model="companyStore.companySelectedObject.company.buying_reason"
    class="w-full"
    label="Motivos de compra"
    placeholder="Razones por las cuáles los clientes compran estos productos o servicios"
    rows="4"
  />

  <h2 class="mt-6"><strong>Sección de Anotaciones y Correcciones</strong></h2>
  <fwb-textarea
    v-model="companyStore.companySelectedObject.company.preferences"
    class="w-full"
    label="Productos vendidos por la empresa"
    placeholder="Descripción detallada de los productos que vende la empresa y desea promocionar"
    rows="8"
  />
</template>

<script setup>
import { FwbInput, FwbTextarea } from 'flowbite-vue';
import { companySelectedStore } from '../../stores/company';

const companyStore = companySelectedStore();
</script>
