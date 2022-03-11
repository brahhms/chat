import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clientes: [],
    selected: null,
  },

  mutations: {
    setClientes(state, clientes) {
      state.clientes = clientes;
    },
    setSelected(state, cliente) {
      state.selected = cliente;
      console.log("setSelected");
    },
  },
  actions: {
    async getClientes({ commit }) {
      const response = await axios.get("http://localhost:5000/clientes");
      let clientes = response.data.map((c) => {
        return {
          id: c.id,
          noTicket: "AA30010",
          telephone: "+503 7988-8888",
          messagesNumber: 2,
        };
      });
      commit("setClientes", clientes);
    },
    async getCliente({ commit }, cliente) {
      if (!cliente) return;
      const response = await axios.get(
        "http://localhost:5000/cliente/" + cliente.id
      );
      commit("setSelected", response.data);
    },
    async sendMessage({ state, dispatch }, data) {
      const body = {
        idCliente: state.selected.id,
        mensaje: data.mensaje,
      };
      await axios.post("http://localhost:5000/mensajes", body);
      await dispatch("refreshCliente");
    },

    async refreshCliente({ state, commit }) {
      if (!state.selected) return;
      const response = await axios.get(
        "http://localhost:5000/cliente/" + state.selected.id
      );
      commit("setSelected", response.data);
    },

    "SOCKET_MESSAGE"({dispatch}) {
      dispatch("refreshCliente");
    },
  },
  modules: {},
});
