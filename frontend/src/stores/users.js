import { defineStore } from 'pinia';

export const usersStore = defineStore('user', {
  state: () => {
    return {
      users: [],
    };
  },
});
