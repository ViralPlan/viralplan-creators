import { defineStore } from 'pinia';
import { getForms } from '@/utils/db/formsModel.js';

export const formsArrayStore = defineStore('forms', {
  state: () => ({
    formsArrayPromise: getForms(),
    formsArray: [],
  }),
});