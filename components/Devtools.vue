<template>
  <div
    id="staticBackdrop"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="staticBackdropLabel" class="modal-title">Json Response</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <pre v-if="this.response" id="jsonViewer">
            <json-viewer
              :value="this.response"
               :copyable="false"
              >
              </json-viewer>
          </pre>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import JsonViewer from 'vue-json-viewer/ssr'
import 'vue-json-viewer/style.css'

export default {
  components: { JsonViewer },
  methods: {
    filterObject: function (inputObject) {
      const unWantedProps = [
        'uid',
        '_version',
        'ACL',
        '_in_progress',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
        'publish_details',
      ]
      for (const key in inputObject) {
        unWantedProps.includes(key) && delete inputObject[key]
        if (typeof inputObject[key] !== 'object') {
          continue
        }
        inputObject[key] = this.filterObject(inputObject[key])
      }
      return inputObject
    },
  },
  data() {
    const { header, footer, page, blogPost } = this.$store.state
    let response = {
      headers: header ? header : null,
      footer: footer ? footer : null,
    }
    page && (response.page = page)
    blogPost && (response.blog_post = blogPost)
    response = this.filterObject(response)
    return {
      response,
    }
  },
}
</script>
