<template>
  <RenderComponents
    v-if="data.uid"
    :components="data.page_components"
    :page="data.title"
    :entryUid="data.uid || ''"
    :locale="data.locale"
  />
  <NotFound v-else-if="!data" />
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import RenderComponents from '../components/RenderComponents.vue'
import NotFound from '../layouts/ErrorLayout.vue'
import { onEntryChange } from '../plugins/contentstack'
import { Page } from '~/typescript/pages'
import { Seo } from '~/typescript/components'
import { getPage } from '~/helper'

export default {
  components: {
    RenderComponents,
    NotFound,
  },
  async asyncData(req: Context) {
    const data = await getPage(req.route.fullPath)
    return {
      data,
      url: req.route.fullPath,
    }
  },
  head() {
    const metaData = {
      property: this.data?.seo ? this.data.seo.meta_title : '',
      content: this.data?.sep ? this.data.seo.meta_description : '',
      keywords: this.data?.seo ? this.data.seo.keywords : '',
    }
    const pageHeader: { title: string; meta?: Seo[] } = {
      title: this.data?.title ? this.data?.title : 'Nuxt Starter App',
      meta: [metaData],
    }
    return pageHeader
  },
  created() {
    this.$store.commit('setPage', this.data)
    this.$store.commit('setBlogPost', null)
    this.$store.commit('setBlogList', null)
  },
  mounted() {
    onEntryChange(async () => {
      if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
        const response = (await this.fetchData()) as Page
        this.data = response
        this.$store.commit('setPage', response)
        this.$store.commit('setBlogPost', null)
        this.$store.commit('setBlogList', null)
      }
    })
    const element: HTMLCollection =
      document.getElementsByClassName('cslp-tooltip')
    if (element.length > 0) {
      element[0].outerHTML = ''
    }
  },
  methods: {
    async fetchData(): Promise<Page> {
      return await getPage(`${this.$route.path}`)
    },
  },
}
</script>
