import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'vuetify/styles';
// import { createVuetify } from 'vuetify';
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// const vuetify = createVuetify({

//   theme: {
//     components,
//     directives,
//     defaultTheme: 'dark'
//   }
// })

import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'

// Initialize Application and add firebase and router and database
const app = createApp(App)
app.use(router)
app.mount('#app')
