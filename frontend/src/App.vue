<template>
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main class="mt-8">
      <!-- Provides the application the proper gutter -->
      <v-container class="px-14" fluid>
        <vertical-slider-group
          :items="clientes"
          icon_size="120"
          height="81vh"
          @change="getCliente"
        >
          <template v-if="selected">
            <p class="headline">Ticket: {{ selected.noTicket }}</p>
            <live-chat
              class="mx-auto"
              :model="selected"
              @send="sendMessage"
            ></live-chat>
          </template>
        </vertical-slider-group>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VerticalSliderGroup from "@/components/VerticalSliderGroup.vue";
import LiveChat from "@/components/LiveChat.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    VerticalSliderGroup,
    LiveChat,
  },
  name: "App",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getClientes", "getCliente", "sendMessage"]),
  },
  computed: {
    ...mapState(["clientes", "selected"]),
  },
  async mounted() {
    await this.getClientes();
  },
};
</script>

