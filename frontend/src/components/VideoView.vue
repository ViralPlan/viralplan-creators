<template>
    <template v-if="ideaOrVideo">
        <label for="idea" class="block my-6 text-2xl font-bold text-white dark:text-white">Idea del video {{ videoIndex + 1 }}</label>
        <textarea id="idea" v-model="companyStore.planSelectedObject.content[videoIndex]" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="En el video aparecen..."></textarea>
        <button class="bg-pink-600 text-white rounded-lg w-full my-8" v-on:click="async () => {
            companyStore.companySelectedObject.company.ideas.push(idea);
            saveGoodIdea(idea);
            if (companyStore.companySelectedObject.company.ideas.length > 60) {
              companyStore.companySelectedObject.company.ideas.shift()
            }
            ideaOrVideo = false;
            loading = true;
            companyStore.planSelectedObject.content[videoIndex] = await generateVideo(companyStore.planSelectedObject.content[props.videoIndex], companyStore.companySelectedObject.company.form);
            loading = false;
        }" style="height: 5vh;"><strong>Generar video</strong></button>
    </template>
    <template v-if="!ideaOrVideo">
        <template v-if="loading" class="mx-auto mt-8">
            <div class="orbit-spinner mx-auto mt-8">
                <div class="orbit"></div>
                <div class="orbit"></div>
                <div class="orbit"></div>
            </div>
        </template>
        <template v-else-if="(typeof companyStore.planSelectedObject.content[videoIndex] == 'object')">
          <label for="duracion" class="block my-6 text-2xl font-bold text-white dark:text-white">Duración</label>
          <input type="text" id="duracion" v-model="companyStore.planSelectedObject.content[videoIndex].duracion" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <label for="personas" class="block my-6 text-2xl font-bold text-white dark:text-white">Personas</label>
          <input type="text" id="personas" v-model="companyStore.planSelectedObject.content[videoIndex].personas" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <label for="horario" class="block my-6 text-2xl font-bold text-white dark:text-white">Horario</label>
          <input type="text" id="horario" v-model="companyStore.planSelectedObject.content[videoIndex].horario" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <label for="lugares" class="block my-6 text-2xl font-bold text-white dark:text-white">Lugares</label>
          <textarea id="lugares" rows="3" v-model="companyStore.planSelectedObject.content[videoIndex].lugares" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Oficinas, La Rambla..."><pre></pre></textarea>
          <label for="guion" class="block my-6 text-2xl font-bold text-white dark:text-white">Guión</label>
          <textarea id="guion" rows="6" v-model="companyStore.planSelectedObject.content[videoIndex].guion" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Primer plano: ..."><pre></pre></textarea>
          <label for="texto" class="block my-6 text-2xl font-bold text-white dark:text-white">Texto en pantalla</label>
          <!-- <QuillEditor theme="snow" class="bg-white text-black" toolbar="minimal" content-type="html" v-model:content="companyStore.planSelectedObject.content[videoIndex].texto"/> -->
          <textarea id="texto" rows="6" v-model="companyStore.planSelectedObject.content[videoIndex].texto" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="En el primer plano se escribe en pantalla..."><pre></pre></textarea>
          <label for="descripcion" class="block my-6 text-2xl font-bold text-white dark:text-white">Descripción</label>
          <input type="text" id="descripcion" v-model="companyStore.planSelectedObject.content[videoIndex].descripcion" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <label for="audio" class="block my-6 text-2xl font-bold text-white dark:text-white">Audio del video</label>
          <input type="text" id="audio" v-model="companyStore.planSelectedObject.content[videoIndex].audio" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <label for="extra" class="block my-6 text-2xl font-bold text-white dark:text-white">Añadido extra</label>
          <input type="text" id="extra" v-model="companyStore.planSelectedObject.content[videoIndex].extra" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </template>
    </template>
</template>

<script setup>
    const props = defineProps({
        videoIndex: Number
    })
    import { saveGoodIdea } from '../utils/db/misc';
    import { ref } from 'vue';
    import { generateVideo } from '@/utils/plans/promptGPT.js'
    import { companySelectedStore } from '../stores/company.js';

    const companyStore = companySelectedStore()
    const idea = ref(companyStore.planSelectedObject.content[props.videoIndex]);
    let loading = ref(false);
    let ideaOr = true;
    if (typeof companyStore.planSelectedObject.content[props.videoIndex] === 'string') {
        ideaOr = ref(true)
    } else {
        ideaOr = ref(false)
    }
    let ideaOrVideo = ideaOr
    companyStore.planSelectedObject.content.horario = "15:00h-16:00h"
</script>

<style>
span, label {
    color: white;
}
textarea {
    color: black !important;
}

.orbit-spinner, .orbit-spinner * {
      box-sizing: border-box;
    }

    .orbit-spinner {
      height: 55px;
      width: 55px;
      border-radius: 50%;
      perspective: 800px;
    }

    .orbit-spinner .orbit {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .orbit-spinner .orbit:nth-child(1) {
      left: 0%;
      top: 0%;
      animation: orbit-spinner-orbit-one-animation 1200ms linear infinite;
      border-bottom: 3px solid #ff1f5e;
    }

    .orbit-spinner .orbit:nth-child(2) {
      right: 0%;
      top: 0%;
      animation: orbit-spinner-orbit-two-animation 1200ms linear infinite;
      border-right: 3px solid #ff1d5e;
    }

    .orbit-spinner .orbit:nth-child(3) {
      right: 0%;
      bottom: 0%;
      animation: orbit-spinner-orbit-three-animation 1200ms linear infinite;
      border-top: 3px solid #ff1d5e;
    }

    @keyframes orbit-spinner-orbit-one-animation {
      0% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
      }
    }

    @keyframes orbit-spinner-orbit-two-animation {
      0% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
      }
    }

    @keyframes orbit-spinner-orbit-three-animation {
      0% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
      }
      100% {
        transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
      }
    }
</style>