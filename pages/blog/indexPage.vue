<template>
  <main v-show="banner">
    <RenderComponents
      v-if="banner"
      :components="banner.page_components"
      :page="banner.title"
      :entryUid="banner.uid"
      :locale="banner.locale"
    />
    <div
      class="blog-container"
      :data-pageref="banner.uid"
      data-contenttype="page"
      :data-locale="banner.locale"
    >
      <div class="blog-column-left">
        <template v-for="(list, index) in recentBlogs">
          <div v-if="list" :key="index" class="blog-list">
            <NuxtLink v-if="list.url" :to="list.url">
              <img
                v-if="list.featured_image.url"
                alt="blog img"
                class="blog-list-img"
                :src="list.featured_image.url"
              />
            </NuxtLink>
            <div class="blog-content">
              <NuxtLink v-if="list.url" :to="list.url">
                <h3>{{ list.title }}</h3>
              </NuxtLink>
              <p>
                {{ moment(list.date) }},
                <strong v-if="list.author">{{ list.author[0].title }}</strong>
              </p>
              <p v-if="list.body" v-html="list.body.slice(0, 250)" />
              <NuxtLink v-if="list.url" :to="list.url">
                <span>Read more --&gt;</span>
              </NuxtLink>
            </div>
          </div>
        </template>
      </div>
      <div class="blog-column-right">
        <h2>{{ banner.page_components[1].widget.title_h2 }}</h2>
        <template v-for="(component, index) in archivedBlogs">
          <NuxtLink :key="index" :to="component.url">
            <div :key="index">
              <h4>{{ component.title }}</h4>
              <p v-html="component.body.slice(0, 80)" />
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import moment from 'moment'
import { Context } from '@nuxt/types'
import RenderComponents from '../../components/RenderComponents.vue'
import { onEntryChange } from '../../plugins/contentstack'
import { Seo } from '~/typescript/components'
import { getBlogList, getPage } from '~/helper'

export default {
  components: {
    RenderComponents,
  },
  async asyncData(req: Context) {
    const data = await getPage(req.route.fullPath)
    const { recentBlogs, archivedBlogs } = await getBlogList()
    return {
      banner: data,
      archivedBlogs,
      recentBlogs,
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
    this.$store.commit('setBlogPost', null)
    const blogLists = this.archivedBlogs.concat(this.recentBlogs)
    this.$store.commit('setBlogList', blogLists)
  },
  mounted() {
    onEntryChange(async () => {
      if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
        const response = await this.fetchData()
        this.banner = response.data
        this.recentBlogs = response.recentBlogs
        this.archivedBlogs = response.archivedBlogs
        this.$store.commit('setPage', response.banner)
        this.$store.commit('setBlogPost', null)
        const blogLists = response.archivedBlogs.concat(response.recentBlogs)
        this.$store.commit('setBlogList', blogLists)
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
        const data = await getPage(`${this.$route.path}`)
        const { recentBlogs, archivedBlogs } = await getBlogList()
        return {
          data,
          recentBlogs,
          archivedBlogs,
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
