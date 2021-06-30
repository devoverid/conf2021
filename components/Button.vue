<template>
  <button
    class="bg-gray-100 text-gray-700 border border-gray-50 hover:bg-gray-200 transition-all duration-200  font-bold py-2 px-4 rounded flex flex-row"
  >
    <div>
      <font-awesome-icon v-if="(typeof icon != 'undefined')" :icon="icon" class="self-center" />
    </div>
    <div class="flex-1 text-center">
      {{ text }}
    </div>
  </button>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: Array,
      default: undefined
    },
  },
  setup( { text, icon }, b) {
    return {}
  }
})
</script>

