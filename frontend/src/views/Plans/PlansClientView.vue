<template>
  <div>
    <!-- Buttons and controls for tablet and up -->
    <div class="grid grid-cols-2">
      <div class="col-span-1 w-full float-left" style="margin: auto;">
        <h1 :class="{
          h1_mobile: isMobile,
          h1_desktop: !isMobile
        }">
          <strong
            >Video
            {{ currentPage }}</strong
          >
        </h1>
      </div>
      <div class="col-span-1 flex justify-end">
        <a
          href="#"
          :class="{
            button_mobile: isMobile,
            button_desktop: !isMobile
          }"
          class="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @:click="
            () => {
              if (currentPage > 1) {
                currentPage = currentPage - 1;
                reRenderer();
              }
            }
          "
        >
          Anterior
        </a>
        <a
          href="#"
          :class="{
            button_mobile: isMobile,
            button_desktop: !isMobile
          }"
          class="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @:click="
            () => {
              if (currentPage < videoQ) {
                currentPage = currentPage + 1;
                reRenderer();
              }
            }
          "
        >
          Siguiente
        </a>
      </div>
    </div>
    <div v-for="el in videoQArray">
      <VideoViewForClients style="display: block;" v-if="currentPage == videoQArray.indexOf(el) + 1 && rerenderer" :video-index="el" :video-object="planObject.content[el]"/>
    </div>
    <button
      type="button"
      style="width: 100%;"
      class="text-white mt-6 bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-bold rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 w-4/5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800"
      @click="
        () => {
          processInput('' ,planObject);
        }
      "
    >
      Descargar Plan
    </button>
  </div>
</template>

<style>
.h1_mobile {
  font-size: larger;
  align-items: center;
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPlan } from '@/utils/db/planModel.js';
import { nextTick } from 'vue';
import { processInput } from '@/utils/plans/processInput.js';
import VideoViewForClients from '@/components/VideoViewForClients.vue';
import { useBreakpoints } from '@vueuse/core';

let videoQArray = ref([]);
let planObject = ref({});
let currentPage = ref(1);
let videoQ = ref(0);

let rerenderer = ref(true);

const breakpoints = useBreakpoints({
  mobile: 450,
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

const isMobile = breakpoints.smaller('laptop')

function reRenderer() {
  rerenderer.value = !rerenderer.value;
  nextTick()
  rerenderer.value = !rerenderer.value;
}

onMounted(async () => {
  let plan = await getPlan(useRoute().params.id, useRoute().params.date);
  planObject.value = plan;
  videoQ.value = plan.content.length; // Number of videos to create
  let arr = [];
  let val = 0;
  
  for (
    let index = 0;
    index < videoQ.value;
    index++
  ) {
    if (plan.content[index] != '') {
      arr.push(index);
    }
  }
  
  videoQArray.value = arr;
  videoQ.value = arr.length;
  val = 0;
  
});
</script>
