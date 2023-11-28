<template>
    <div v-if="ideasAccepted">
        <div class="grid grid-cols-2">
            <div class="col-span-1 w-full float-left">
                <h1><strong>{{ companyStore.companySelected }} - Video {{ currentPage }}</strong></h1>
            </div>
            <div class="col-span-1 flex justify-end">
                <a @:click="() => {
                    if (currentPage > 1) {
                        currentPage = currentPage - 1;
                    }
                }" href="#" class="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Anterior
                </a>
                <a @:click="() => {
                    if (currentPage < videoQ) {
                        currentPage = currentPage + 1;
                    }
                }" href="#" class="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Siguiente
                </a>
            </div>
        </div>
        <div v-for="el in videoQArray">
            <KeepAlive>
                <VideoView v-if="currentPage == el + 1" :video-index="el"/>
            </KeepAlive>
        </div>
    </div>
    <div v-else>
        <h1 class="text-2xl"><strong>Ideas Generadas</strong></h1>
        <div v-for="el in videoQArray">
          <h2 class="text-xl mt-4 mb-1"><strong>Idea {{ el + 1 }}</strong></h2>
          <textarea v-model="companyStore.planSelectedObject.content[el]" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="En el video aparecen..."></textarea>
        </div>
        <button class="bg-pink-600 text-white rounded-lg w-full mt-8" v-on:click="async () => {
          let content = [];
          let i = 1;
          companyStore.planSelectedObject.content.forEach(idea => {
            content.push('Idea ' + i + ': \n' + idea + '\n\n');
          });
          ideaFile(content.join('\n'));
        }" style="height: 5vh;"><strong>Descargar Ideas</strong></button>
        <button class="bg-pink-600 text-white rounded-lg w-full mb-8 mt-1" v-on:click="async () => {
            ideasAccepted = true;
        }" style="height: 5vh;"><strong>Confirmar ideas</strong></button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ideaFile } from '../../utils/plans/processInput';
import { companySelectedStore } from '../../stores/company';
import VideoView from '../../components/VideoView.vue';

const companyStore = companySelectedStore()
let ideasAccepted = ref(false)
companyStore.planSelectedObject.content.forEach(element => {
    if (typeof element != 'string') {
        ideasAccepted.value = true
    }
});
let videoQ = ref(companyStore.planSelectedObject.content.length) // Number of videos to create
let arr = []
for (let index = 0; index < companyStore.planSelectedObject.content.length; index++) {
    arr.push(index)
}


let videoQArray = ref(arr)

const currentPage = ref(1)
</script>