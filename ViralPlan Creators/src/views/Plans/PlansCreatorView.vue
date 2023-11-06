<template>
    <div v-if="videoQ == 0">
        <h1 class="mb-8">Elige el número de videos que tendrá el plan</h1>
        <div class="w-full grid grid-cols-2">
            <button class="col-span-1 mr-8 text-white bg-pink-600 w-full rounded-lg" style="height: 10vh;" @:click="() => {
                videoQArray = [0, 1, 2, 3, 4];
                companyStore.planSelectedObject = {
                    date: formatDate(),
                    content: ['', '', '', '', '']
                }
                videoQ = 5;
            }"><strong>Cinco vídeos</strong></button>
            <button class="col-span-1 mr-8 text-white bg-pink-600 w-full rounded-lg" style="height: 10vh;" @:click="() => {
                videoQArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
                companyStore.planSelectedObject = {
                    date: formatDate(),
                    content: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
                }
                videoQ = 20;
            }"><strong>Veinte vídeos</strong></button>
        </div>
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
</template>

<script setup>
import { formatDate } from '@/utils/db/planModel.js'
import { ref, watch } from 'vue';
import { FwbPagination } from 'flowbite-vue';
import { companySelectedStore } from '../../stores/company';
import VideoView from '../../components/VideoView.vue';

let videoQ = ref(0) // Number of videos to create
let videoQArray = ref([])
const companyStore = companySelectedStore()

const currentPage = ref(1)
</script>