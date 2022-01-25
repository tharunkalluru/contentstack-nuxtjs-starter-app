<template>
  <RenderComponents
    v-if="data.page_components"
    :components="data.page_components"
    :page="data.title"
    :entry-uid="data.uid"
    :locale="data.locale"
  />
</template>

<script>
import Stack from '../plugins/contentstack'
import RenderComponents from '../components/RenderComponents'
import { onEntryChange } from '../plugins/contentstack'

export default {
  components: {
    RenderComponents,
  },
  async asyncData(req) {
    const data = await Stack.getEntryByUrl({
      contentTypeUid: 'page',
      entryUrl: `${req.route.fullPath}`,
      jsonRtePath: ['page_components.section_with_buckets.buckets.description'],
    })
    return {
      data: data[0],
    }
  },
  head(req) {
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
        this.data = response[0]
      }
    })
    this.$store.commit('setPage', this.data)
    this.$store.commit('setBlogpost', null)
  },
  methods: {
    async fetchData() {
      const response = await Stack.getEntryByUrl({
        contentTypeUid: 'page',
        entryUrl: `${this.$route.fullPath}`,
        referenceFieldPath: ['page_components.from_blog.featured_blogs'],
        jsonRtePath: [
          'page_components.from_blog.featured_blogs.body',
          'page_components.section_with_buckets.buckets.description',
        ],
      })
      return response
    },
  },
}
</script>
