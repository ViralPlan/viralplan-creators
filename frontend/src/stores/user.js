import { defineStore } from 'pinia';

export const userStore = defineStore('user', {
  state: () => {
    return {
      email: '',
      tokens: 0,
      tier: 0,
      date: '',
      role: '',
      companies: [],
    };
  },
});
