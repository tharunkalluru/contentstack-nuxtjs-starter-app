<template>
  <main>
    <BlogBanner :data="banner.page_components[0].hero_banner" />
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
        <p v-html="data.body" />
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

import BlogBanner from '../../components/BlogBanner.vue'
import Devtools from '../../components/DevTools.vue'
import Stack, { onEntryChange } from '../../plugins/contentstack'
import Data from '@/typescript/pages'
import Req from '@/typescript/pages'
import PageData from '@/typescript/pages'

export default {
  components: {
    BlogBanner,
    Devtools,
  },
  async asyncData(req: PageData) {
    try {
      const banner = await Stack.getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl: `/blog`,
      })
      const data = await Stack.getEntryByUrl({
        contentTypeUid: 'blog_post',
        entryUrl: `${req.route.fullPath}`,
        referenceFieldPath: [`related_post`, `author`],
        jsonRtePath: ['body', 'related_post.body'],
      })
      return {
        data: data[0],
        banner: banner[0],
      }
    } catch (e) {
      return false
    }
  },
  head(req: Req) {
    return {
      title: req.data.title,
      meta: [
        {
          title: req.data.seo.meta_title,
          name: req.data.seo.meta_title,
          description: req.data.seo.meta_description,
          keywords: req.data.seo.keywords,
        },
      ],
    }
  },
  mounted() {
    onEntryChange(async () => {
      if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
        const response = await this.fetchData()
        this.data = response.data
      }
    })
    this.$store.commit('setPage', this.banner)
    this.$store.commit('setBlogpost', this.data)
  },
  methods: {
    async fetchData() {
      try {
        const data: [Data] = await Stack.getEntryByUrl({
          contentTypeUid: 'blog_post',
          entryUrl: `${this.$route.fullPath}`,
          referenceFieldPath: [`related_post`, `author`],
          jsonRtePath: ['body', 'related_post.body'],
        })
        const element: HTMLCollection = document.getElementsByClassName('cslp-tooltip')
        if (element.length > 0) {
          element[0].outerHTML = ''
        }
        return {
          data: data[0],
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