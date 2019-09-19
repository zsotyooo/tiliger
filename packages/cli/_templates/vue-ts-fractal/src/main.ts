import Vue from "vue";
import App from "./App.vue";
import StyleguideApp from "./StyleguideApp.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(process.env.VUE_APP_IS_STYLEGUIDE === 'true' ? StyleguideApp : App)
}).$mount("#app");
