<template>
  <template>
    <label
      :class="{
        label_mobile: isMobile,
        label_desktop: !isMobile
      }"
      for="duracion"
      class="block mt-4 mb-1 font-bold text-white dark:text-white"
      >Duración</label
    >
    <input
      readonly
      id="duracion"
      v-model="props.videoObject.duracion"
      type="text"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
    <label
      for="personas"
      :class="{
        label_mobile: isMobile,
        label_desktop: !isMobile
      }"
      class="block mt-4 mb-1 font-bold text-white dark:text-white"
      >Personas</label
    >
    <input
      readonly
      id="personas"
      v-model="props.videoObject.personas"
      type="text"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
    <label
      :class="{
        label_mobile: isMobile,
        label_desktop: !isMobile
      }"
      for="horario"
      class="block mt-4 mb-1 font-bold text-white dark:text-white"
      >Horario</label
    >
    <input
      readonly
      id="horario"
      v-model="props.videoObject.horario"
      type="text"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
    <label
      :class="{
        label_mobile: isMobile,
        label_desktop: !isMobile
      }"
      for="lugares"
      class="block mt-4 mb-1 font-bold text-white dark:text-white"
      >Lugares</label
    >
    <textarea
      ref="textarea"
      id="lugares"
      readonly
      v-model="props.videoObject.lugares"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Oficinas, La Rambla..."
    >
<pre></pre></textarea
    >
    <label
      :class="{
        label_mobile: isMobile,
        label_desktop: !isMobile
      }"
      for="guion"
      class="block mt-4 mb-1 font-bold text-white dark:text-white"
      >Guión</label
    >
    <textarea
      ref="textarea"
      id="guion"
      readonly
      v-model="props.videoObject.guion"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Primer plano: ..."
    >
<pre></pre></textarea
    >
    <label
      :class="{
        label_mobile: isMobile,
        label_desktop: !isMobile
      }"
      for="texto"
      class="block mt-4 mb-1 font-bold text-white dark:text-white"
      >Texto en pantalla</label
    >
    <!-- <QuillEditor theme="snow" class="bg-white text-black" toolbar="minimal" content-type="html" v-model:content="props.videoObject.texto"/> -->
    <textarea
      id="texto"
      readonly
      ref="textarea"
      v-model="props.videoObject.texto"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="En el primer plano se escribe en pantalla..."
    >
<pre></pre></textarea
    >
    <label
      :class="{
        label_mobile: isMobile,
        label_desktop: !isMobile
      }"
      for="descripcion"
      class="block mt-4 mb-1 font-bold text-white dark:text-white"
      >Descripción</label
    >
    <input
      readonly
      id="descripcion"
      v-model="
        props.videoObject.descripcion
      "
      type="text"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
    <label
      :class="{
        label_mobile: isMobile,
        label_desktop: !isMobile
      }"
      for="audio"
      class="block mt-4 mb-1 font-bold text-white dark:text-white"
      >Audio del video</label
    >
    <input
      readonly
      id="audio"
      v-model="props.videoObject.audio"
      type="text"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
    <label
      :class="{
        label_mobile: isMobile,
        label_desktop: !isMobile
      }"
      for="extra"
      class="block mt-4 mb-1 font-bold text-white dark:text-white"
      >Añadido extra</label
    >
    <input
      readonly
      id="extra"
      v-model="props.videoObject.extra"
      type="text"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
    
    <div v-if="props.videoObject.explanation != '' && typeof props.videoObject.explanation != 'undefined'">
      <label
        :class="{
        label_mobile: isMobile,
        label_desktop: !isMobile
      }"
        for="explanation"
        class="block mt-4 mb-1 font-bold text-white dark:text-white"
        >Explicación del contenido</label
      >
      <AudioPlayer id="explanation" class="mt-2 ml-0 p-0" :audio-data="props.videoObject.explanation" />
    </div>

  </template>
</template>

<script setup>
import AudioPlayer from '@/components/App/AudioPlayer.vue';
import { useBreakpoints, useTextareaAutosize } from '@vueuse/core';


const { textarea } = useTextareaAutosize()
const breakpoints = useBreakpoints({
  mobile: 450,
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

const isMobile = breakpoints.smaller('laptop')

const props = defineProps({
  videoIndex: Number,
  videoObject: Object
});
</script>

<style>
span,
label {
  color: white;
}
textarea {
  color: black !important;
}

.label_mobile {
  font-size: large;
}
.label_desktop {
  font-size:x-large;
}
</style>
