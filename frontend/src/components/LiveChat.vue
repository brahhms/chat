<template>
  <v-card :color="backgroundColor" :max-width="width" flat>

    <v-sheet
      id="messagesList"
      class="overflow-auto px-4 minsal-border"
      :height="height"
      :width="width"
      color="#f4f7ff"
      flat
    >
      <v-row no-gutters v-for="item in model.mensajes" :key="item.index">
        <v-spacer v-if="item.isSender"></v-spacer>

        <v-sheet
          flat
          class="pa-2 rounded-lg my-3"
          :color="item.isSender ? color : 'white'"
          v-bind:class="{
            'rounded-tl-0': !item.isSender,
            'rounded-tr-0': item.isSender,
          }"
          style="word-break: break-all !important"
        >
          {{ item.mensaje }}
          <span class="float-right grey--text mt-1 ml-4 caption">
            {{ item.subtitle }}
          </span>
        </v-sheet>

        <v-spacer v-if="!item.isSender"></v-spacer>
      </v-row>
    </v-sheet>

    <v-sheet flat class="px-4 py-2 minsal-border">
      <v-text-field
        v-model.trim="message.mensaje"
        :maxlength="maxlength"
        rounded
        filled
        hide-details
        :background-color="backgroundColor"
        @keydown.enter="addItem"
      >
        <v-btn
          slot="append-outer"
          append-icon="mdi-send"
          @click="addItem"
          icon
          class="mt-n2"
        >
          <v-icon large color="blueDarken"> mdi-send </v-icon>
        </v-btn>
      </v-text-field>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  props: {
    height: {
      type: [String, Number],
      default: "60vh",
    },
    width: {
      type: [String, Number],
      default: "w-100",
    },
    backgroundColor: {
      type: String,
      default: "#e0e5f1",
    },
    color: {
      type: String,
      default: "#c4e1c5",
    },
    maxlength: {
      type: [String, Number],
      default: "512",
    },
    receiver: String,
    model: Object,
  },

  name: "LiveChat",
  data: () => ({
    message: {
      mensaje: "",
      isSender: true,
      subtitle: "00:00",
    },
  }),

  methods: {
    async addItem() {
      if (!this.message.mensaje || this.message.mensaje === "") {
        return;
      }
      await this.$emit("send", this.message);

      this.message.mensaje = "";
   
    },
  },
  updated(){
   document
        .getElementById("messagesList")
        .scrollTo(0, document.getElementById("messagesList").scrollHeight);
  }
};
</script>

<style scoped>
.minsal-border {
  border: 4px solid #e0e5f1 !important;
  border-radius: 4px;
}
</style>
