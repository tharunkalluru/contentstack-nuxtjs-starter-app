<template>
  <div v-if="data" class="demo-section">
    <template v-for="index in data.cards">
      <div :key="index.title_h3" class="cards">
        <h3>{{ index.title_h3 }}</h3>
        <p>{{ index.description }}</p>
        <div class="card-cta">
          <NuxtLink class="btn primary-btn" :to="index.call_to_action.href">
            {{ index.call_to_action.title }}
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">

import { PropType } from 'vue'
import Data from '../typescript/data'

export default {
  props: {
    data: {
      required: true,
      type: Object as PropType<Data>
    }
  }
}
</script>
