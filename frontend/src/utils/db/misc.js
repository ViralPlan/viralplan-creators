import {companySelectedStore} from '@/stores/company.js'
import {companiesArrayStore} from '@/stores/companies.js'
import {updateCompany} from '@/utils/db/companyModel.js'
import router from '@/router/index.js'



export function resetValues() {
  const companiesStore = companiesArrayStore()
  const companyStore = companySelectedStore()
  companyStore.$reset()
  companiesStore.$reset()
  companiesStore.companiesArrayPromise.then((result) => {
    result.forEach(company => {
      companiesStore.companiesArray.push(company)
    })
  }) 
}
export async function cancelPlans() {
  resetValues().then(() => {
    router.push({name: 'home'})
  })
}
export async function cancelCompanies() {
  resetValues().then(() => {
    router.push({name: 'home'})
  })
}
export function save(deleting = false) {
  const companyStore = companySelectedStore()
  const filter = { 'company.name': companyStore.companySelectedObject['company']['name']}
  const options = { upsert: true };

  if (companyStore.planSelectedObject.date != '') {
    let up = false;
    for (let i = 0; i < companyStore.companySelectedObject.company.plans.length; i++) {
      if ((companyStore.companySelectedObject.company.plans[i].date == companyStore.planSelected) && (!deleting)) {
        companyStore.companySelectedObject.company.plans[i] = companyStore.planSelectedObject
        up = true;
      }
    }
    if (!up && !deleting) {
      companyStore.companySelectedObject.company.plans.push(companyStore.planSelectedObject)
    }

    // companyStore.companySelectedObject.company.plans.push(companyStore.planSelectedObject)
  }
  // Specify the update to set a value for the plot field
  const updateDoc = {
    $set: {
      company: companyStore.companySelectedObject.company
    },
  };
  updateCompany(filter, updateDoc, options)
  .then(result => {
    resetValues().then(() => {
      router.push({name: 'home'})
    })
  })
}