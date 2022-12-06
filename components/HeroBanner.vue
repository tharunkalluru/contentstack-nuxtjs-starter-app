<template>
  <div class="hero-banner" :style="{ background: `${data.bg_color}` }">
    <div :class="[title === 'about-content' ? title : 'home-content']">
      <h1 class="hero-title" :style="{ color: data.text_color ? data.text_color : '#000' }">
        {{ data.banner_title }}
      </h1>
      <p
        :class="[
          'hero-description',
          title === 'about-content' ? 'about-desc' : ''
        ]"
        :style="{ color: data.text_color ? data.text_color : '#737b7d' }"
      >
        {{ data.banner_description }}
      </p>
      <template>
        <router-link
          v-if="data.call_to_action.title && data.call_to_action.href"
          aria-current="page"
          class="btn tertiary-btn"
          to="/"
        >
          {{ data.call_to_action.title }}
        </router-link>
      </template>
    </div>
    <img
      v-if="data.banner_image"
      :src="data.banner_image.url"
      :alt="data.banner_image.title"
    />
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
    },
    title: {
      required: true,
      type: String
    }
  }
}
</script>
