import './assets/main.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createAuth0 } from '@auth0/auth0-vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
    },
    legacySameSiteCookie: false,
    useRefreshTokens: true,
    cacheLocation: 'localstorage',
  })
);
app.use(pinia);
app.use(router);

app.mount('#app');
