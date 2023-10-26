import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const companySelectedStore = defineStore('company', {
  state: () => {
    return {
      companySelected: '',
      companySelectedObject: {}
    }
  }
})
