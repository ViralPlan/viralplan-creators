import { defineStore } from 'pinia';

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
          incorporation_date: '',
          hired_plan: '',
          modifications: '',
          social_networks: '',
          usernames: '',
          number_of_followers: '',
          transcript: '',
          summary: '',
          objective_audience: '',
          budget: '',
          objectives: '',
          selling_products: '',
          buying_reason: '',
          preferences: '',
          email: '',
          tel: '',
          form: '',
          ideas: [],
          plans: [],
          tasks: [],
          completedTasks: [],
        },
      },
      planSelectedObject: {
        date: '',
        content: [],
      },
    };
  },
});
