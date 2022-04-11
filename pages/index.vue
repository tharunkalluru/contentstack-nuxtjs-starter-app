<template>
  <RenderComponents
    v-if="data"
    :components="data.page_components"
    :page="data.title"
    :entry-uid="data.uid"
    :locale="data.locale"
  />
  <NotFound v-else-if="!data" />
</template>

<script>
import RenderComponents from '../components/RenderComponents'
import NotFound from '../layouts/error';
import Stack, { onEntryChange } from '../plugins/contentstack'

export default {
  components: {
    RenderComponents,
    NotFound
  },
  async asyncData(req) {
    const data = await Stack.getEntryByUrl({
      contentTypeUid: 'page',
      entryUrl: `${req.route.fullPath}`,
      referenceFieldPath: ['page_components.from_blog.featured_blogs'],
      jsonRtePath: [
        'page_components.from_blog.featured_blogs.body',
        'page_components.section_with_buckets.buckets.description',
      ],
    })

    return {
      data: data[0],
    }
  },
  head(req) {
    return {
      title: this.data ? req.data.title : '',
      meta: [
        {
          title: this.data ? req.data.seo.meta_title : '',
          name: this.data ? req.data.seo.meta_title : '',
          description: this.data ? req.data.seo.meta_title : '',
          keywords: this.data ? req.data.seo.keywords : '',
        },
      ],
    }
  },

  mounted() {
    onEntryChange(async () => {
      if (process.env.CONTENTSTACK_LIVE_PREVIEW === 'true') {
        const response = await this.fetchData()
        this.data = response[0]
      }
    })
    this.$store.commit('setPage', this.data)
    this.$store.commit('setBlogpost', null)
  },
  methods: {
    async fetchData() {
      const result = await Stack.getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl: `${this.$route.fullPath}`,
        referenceFieldPath: ['page_components.from_blog.featured_blogs'],
        jsonRtePath: [
          'page_components.from_blog.featured_blogs.body',
          'page_components.section_with_buckets.buckets.description',
        ],
      })
      const element = document.getElementsByClassName('cslp-tooltip')
      if (element.length > 0) {
        element[0].outerHTML = null
      }
      return result
    },
  },
}
</script>
