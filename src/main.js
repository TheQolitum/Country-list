import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';

import VueGoogleMaps from '@fawmi/vue-google-maps';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const app = createApp(App);
app.use(VueGoogleMaps, {
  load: {
    key: '',
  },
});
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);

const vuetify = new createVuetify({
  components,
  directives,
});
app.use(vuetify);

app.use(createPinia());

app.use(router);

app.mount('#app');
