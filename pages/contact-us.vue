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
export default {
  components: { RenderComponents },
  async asyncData(req) {
    const data = await Stack.getEntryByUrl({
      contentTypeUid: 'page',
      entryUrl: `${req.route.fullPath}`,
      jsonRtePath: ['page_components.section_with_html_code.description'],
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
    this.$store.commit('setPage', this.data)
    this.$store.commit('setBlogpost', null)
  },
}
</script>
