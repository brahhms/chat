<template>
  <v-row>
    <v-sheet
      :height="height"
      flat
      :width="icon_size"
      class="d-flex flex-column minsal-border"
    >
      <v-item-group
        @change="$emit('change', $event)"
        class="overflow-y-auto overflow-x-hidden"
      >
        <v-item
          v-slot="{ active, toggle }"
          :value="item"
          v-for="item in items"
          :key="item.id"
        >
          <v-sheet :width="icon_size" class="ma-3" @click="toggle">
            <v-badge bordered overlap avatar>
              <template v-slot:badge>
                <v-avatar color="red">
                  {{ item.messagesNumber }}
                </v-avatar>
              </template>
              <v-icon
                class="minsal-border"
                v-bind:class="{ blueDarken: active }"
                :color="!active ? 'blueDarken' : 'bgMinsal'"
                :size="icon_size - 42"
                v-text="'mdi-account'"
              ></v-icon>
            </v-badge>
          </v-sheet>
        </v-item>
      </v-item-group>
    </v-sheet>

    <v-col>
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["items", "icon_size", "height"],
  name: "VerticalSliderGroup",
  data: () => ({}),
  computed:{
    
  }
};
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.overflow-y-auto::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.overflow-y-auto {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.minsal-border {
  border: 4px solid #e0e5f1 !important;
  border-radius: 4px;
}
</style>
