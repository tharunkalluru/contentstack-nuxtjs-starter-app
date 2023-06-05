<template>
  <main>
    <RenderComponents
      v-if="banner"
      :components="banner.page_components"
      :page="banner.title"
      :entry-uid="banner.uid"
      :locale="banner.locale"
    />
    <ClientOnly>
      <Devtools />
    </ClientOnly>
    <div
      class="blog-container"
      :data-pageref="data.uid"
      data-contenttype="blog_post"
      :data-locale="data.locale"
    >
      <div class="blog-detail">
        <h2>{{ data.title }}</h2>
        <span>
          {{ moment(data.date) }}, <strong>{{ data.author[0].title }}</strong>
        </span>
        <div v-html="data.body" />
      </div>
      <div v-if="data" class="blog-column-right">
        <div class="related-post">
          <h2>{{ banner.page_components[2].widget.title_h2 }}</h2>
          <template v-for="(blog, index) in data.related_post">
            <div :key="index">
              <NuxtLink :key="index" :to="blog.url">
                <h4>{{ blog.title }}</h4>
              </NuxtLink>
              <p v-html="blog.body.slice(0, 80)" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import moment from 'moment'

import { Context } from '@nuxt/types'
import RenderComponents from '../../components/RenderComponents.vue'
import Devtools from '../../components/DevTools.vue'
import { onEntryChange } from '../../plugins/contentstack'
import { Seo } from '~/typescript/components'
import { getBlogPost, getPage } from '~/helper'
export default {
  components: {
    RenderComponents,
    Devtools,
  },
  async asyncData(req: Context) {
    try {
      const banner = await getPage('/blog')
      const data = await getBlogPost(req.route.fullPath)
      return {
        data,
        banner,
        url: req.route.fullPath,
      }
    } catch (e) {
      return false
    }
  },
  head() {
    const metaData = {
      property: this.data ? this.data.seo.meta_title : '',
      content: this.data ? this.data.seo.meta_description : '',
      keywords: this.data ? this.data.seo.keywords : '',
    }
    const pageHeader: { title: string; meta?: Seo[] } = {
      title: this.data ? this.data.title : 'Nuxt Starter App',
      meta: [metaData],
    }
    return pageHeader
  },
  created() {
    this.$store.commit('setPage', this.banner)
    this.$store.commit('setBlogPost', this.data)
    this.$store.commit('setBlogList', null)
  },
  mounted() {
    onEntryChange(async () => {
      if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
        const response = await this.fetchData()
        this.data = response.data
        this.$store.commit('setPage', this.banner)
        this.$store.commit('setBlogPost', response.data)
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
    async fetchData() {
      try {
        const data = await getBlogPost(`${this.$route.path}`)
        return {
          data,
        }
      } catch (e) {
        return false
      }
    },
    moment(param: string) {
      return moment(param).format('ddd, MMM D YYYY')
    },
  },
}
</script>
