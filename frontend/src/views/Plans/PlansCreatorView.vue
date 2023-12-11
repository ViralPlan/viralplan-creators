<template>
    <div v-if="videoQ == 0 && loading == false">
        <h1 class="mb-8">Elige el número de videos que tendrá el plan</h1>
        <div class="w-full grid grid-cols-2">
            <button class="col-span-1 mr-8 text-white bg-pink-600 w-5/6 rounded-lg" style="height: 5vh;" @:click="async () => {
                videoQArray = [0, 1, 2, 3, 4];
                loading = true;
                console.log('hi1')
                let ideas = await generateIdeas(companyStore.companySelectedObject.company.form, 5);
                let realIdeas = [];
                ideas.forEach(idea => {
                  realIdeas.push(idea['description']);
                });
                loading = false;
                companyStore.planSelected = formatDate()
                companyStore.planSelectedObject = {
                    date: formatDate(),
                    content: realIdeas
                }
                videoQ = 5;
            }"><strong>Cinco vídeos</strong></button>
            <button class="col-span-1 mr-8 text-white bg-pink-600 w-5/6 rounded-lg" style="height: 5vh;" @:click="async () => {
                videoQArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
                loading = true;
                let ideas = ['','','','','','','','','','','','','','','','','','','',''];//await generateIdeas(20, companyStore.companySelectedObject.company.form);
                let realIdeas = ideas;//[];
/*                 ideas.forEach(idea => {
                    realIdeas.push(idea['description']);
                }); */
                loading = false;
                companyStore.planSelected = formatDate()
                companyStore.planSelectedObject = {
                    date: formatDate(),
                    content: realIdeas
                }
                videoQ = 20;
            }"><strong>Veinte vídeos</strong></button>
        </div>
    </div>
    <div v-else-if="loading == true && videoQ == 0">
        <h3 class="text-xl"><strong>Puede tardar varios minutos</strong></h3>
        <div class="orbit-spinner mx-auto mt-8">
            <div class="orbit"></div>
            <div class="orbit"></div>
            <div class="orbit"></div>
        </div>
    </div>
    <div v-else >
      <div v-if="!ideasAccepted">
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
      <div v-else >
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
    </div>
</template>

<script setup>
import { generateIdeas } from '../../utils/plans/promptGPT';
import { formatDate } from '@/utils/db/planModel.js'
import { ref } from 'vue';
import { ideaFile } from '../../utils/plans/processInput';
import { companySelectedStore } from '../../stores/company';
import VideoView from '../../components/VideoView.vue';

let loading = ref(false)
let ideasAccepted = ref(false)
let videoQ = ref(0) // Number of videos to create
let videoQArray = ref([])
const companyStore = companySelectedStore()

const currentPage = ref(1)
</script>


<style>
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