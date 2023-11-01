import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const authStore = defineStore('auth', {
  state: () => {
    return {
      email: '',
      password: '',
      auth: false,
      returnUrl: '',
      client: ''
    }
  },
  persist: {
    storage: sessionStorage,
  }
})