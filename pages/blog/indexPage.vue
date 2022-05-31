<template>
  <main v-show="banner">
    <BlogBanner :data="banner.page_components[0].hero_banner" />
    <ClientOnly>
      <Devtools />
    </ClientOnly>
    <div
      class="blog-container"
      :data-pageref="banner.uid"
      data-contenttype="page"
      :data-locale="banner.locale"
    >
      <div class="blog-column-left">
        <template v-for="(list, index) in recentBlog">
          <div :key="index" class="blog-list">
            <NuxtLink :to="list.url">
              <img
                alt="blog img"
                class="blog-list-img"
                :src="list.featured_image.url"
              />
            </NuxtLink>
            <div class="blog-content">
              <NuxtLink :to="list.url">
                <h3>{{ list.title }}</h3>
              </NuxtLink>
              <p>
                {{ moment(list.date) }},
                <strong>{{ list.author[0].title }}</strong>
              </p>
              <p v-html="list.body.slice(0, 250)" />
              <NuxtLink :to="list.url">
                <span>Read more --&gt;</span>
              </NuxtLink>
            </div>
          </div>
        </template>
      </div>
      <div class="blog-column-right">
        <h2>{{ banner.page_components[1].widget.title_h2 }}</h2>
        <template v-for="(component, index) in archivedList">
          <NuxtLink :key="index" :to="component.url">
            <div>
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
import BlogBanner from '../../components/BlogBanner.vue'
import Devtools from '../../components/DevTools.vue'
import Stack,{ onEntryChange } from '../../plugins/contentstack'
import Data from '@/typescript/pages'
import Req from '@/typescript/pages'
import PageData from '@/typescript/pages'

interface List {
    author: [];
    body: string;
    date: string;
    featured_image:object;
    is_archived: boolean;
    related_post:[];
    locale: string;
    seo: object;
    title: string;
    url: string;
}


export default {
  components: {
    BlogBanner,
    Devtools,
  },
  async asyncData(req: PageData) {
    const archivedList = [] as any
    const recentBlog = [] as any
    const data = await Stack.getEntryByUrl({
      contentTypeUid: 'page',
      entryUrl: `${req.route.path}`,
    })
    const list: [List] = await Stack.getEntries({
      contentTypeUid: 'blog_post',
      referenceFieldPath: [`author`, `related_post`],
      jsonRtePath: ['body'],
    })
    list.forEach((item) => {
      if (item.is_archived) {
        archivedList.push(item)
      } else {
        recentBlog.push(item)
      }
    })
    return {
      banner: data[0],
      archivedList,
      recentBlog,
    }
  },
  head(req: Req) {
    return {
      title: req.banner.title,
      meta: [
        {
          title: req.banner.seo.meta_title,
          name: req.banner.seo.meta_description,
          description: req.banner.seo.meta_description,
          keywords: req.banner.seo.keywords,
        },
      ],
    }
  },
  mounted() {
    onEntryChange(async () => {
      if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
        const response = await this.fetchData()
        this.banner = response.data
      }
    })
    this.$store.commit('setPage', this.banner)
    const concat = this.archivedList.concat(this.recentBlog)
    this.$store.commit('setBlogpost', concat)
  },
  methods: {
    async fetchData() {
      try {
        const data: [Data] = await Stack.getEntryByUrl({
          contentTypeUid: 'page',
          entryUrl: `${this.$route.path}`,
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