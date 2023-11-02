<template>
    <div>
        <div class="grid grid-cols-2">
            <div class="col-span-1 w-full float-left">
                <h1><strong>Video {{ currentPage }}</strong></h1>
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
import { ref } from 'vue';
import { companySelectedStore } from '../../stores/company';
import VideoView from '../../components/VideoView.vue';

const companyStore = companySelectedStore()
let videoQ = ref(companyStore.planSelectedObject.content.length) // Number of videos to create
let arr = []
for (let index = 0; index < companyStore.planSelectedObject.content.length; index++) {
    arr.push(index)
}
let videoQArray = ref(arr)

const currentPage = ref(1)
</script>