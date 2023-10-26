<script setup>
  import { companiesArrayStore } from '@/stores/companies.js'
  import { companySelectedStore } from '../../stores/company';
  import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/vue';


  const companyStore = companySelectedStore()
  const companiesStore = companiesArrayStore()
  
  let companyNames = []
  companiesStore.companiesArray.forEach(company => {
    companyNames.push(company['company']['name'])
  })
  console.log(companyNames)
</script>

<template>
  <div class="companies">
    <h1><strong>Compañías {{ companySelected }}</strong></h1>
    <p>Este es el manejador de compañías. Desde aquí, podrás darlas de alta o de baja,
      y editar los datos de alguna si estos cambian. Ante cualquier duda o error, consultar
      al administrador.
    </p>

    <CDropdown class="bg-pink-600">
      <CDropdownToggle>Selecciona una compañía</CDropdownToggle>
      <CDropdownMenu>
        <CDropdownItem href="#" v-for="name in companyNames">{{ name }}</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>

    
    

  </div>
</template>

<style>

</style>
