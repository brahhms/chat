import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";

import VueSocketIO from "vue-socket.io";
import SocketIO from 'socket.io-client'
const socketConnection = SocketIO('http://localhost:5000');


Vue.use(
  new VueSocketIO({
    debug: false,
    connection: socketConnection,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
    },
  })
);

Vue.config.productionTip = false;
new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
