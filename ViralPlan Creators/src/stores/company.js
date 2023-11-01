import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const companySelectedStore = defineStore('company', {
  state: () => {
    return {
      companyWarning: false,
      planWarning: false,
      companySelected: '',
      planSelected: '',
      companySelectedObject: {
        _id: {},
        company: {
          name: '',
          email: '',
          tel: '',
          form: '',
          plans: []
        }
      },
      planSelectedObject: {
        date: '',
        content: []
      }
    }
  }
})
