import { defineStore } from 'pinia'
import { getCompanies } from '@/utils/db/companyModel.js'

export const companiesArrayStore = defineStore('companies', {
  state: () => ({
    companiesArrayPromise: getCompanies(),
    companiesArray: []
  })
})
