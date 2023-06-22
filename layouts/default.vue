<template>
  <div>
    <HeaderComponent v-if="header.title" :header="header" />
    <Nuxt />
    <FooterComponent v-if="footer.title" :footer="footer" />
    <client-only>
    <DevTools />
    </client-only>
  </div>
</template>

<script lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import DevTools from '../components/DevTools.vue'
import { FooterRes, HeaderRes } from '../typescript/response'
import {
  filterFooterLinks,
  filterHeaderNav,
  getAllEntries,
  getFooter,
  getHeader,
} from '~/helper'
export default {
  components: {
    HeaderComponent,
    FooterComponent,
    DevTools,
  },
  data() {
    return {
      header: null as HeaderRes | null,
      footer: null as FooterRes | null,
    }
  },
  async fetch() {
    this.header = await getHeader()
    this.footer = await getFooter()
    const allEntries = await getAllEntries()
    this.header = filterHeaderNav(allEntries, this.header)
    this.footer = filterFooterLinks(allEntries, this.footer)
  },
}
</script>
