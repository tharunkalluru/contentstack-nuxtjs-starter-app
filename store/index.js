// global store

export const state = () => ({
  header: null,
  footer: null,
  page: null,
  blogPost: null,
})
export const mutations = {
  setHeader(stateObj, data) {
    stateObj.header = data
  },
  setFooter(stateObj, data) {
    stateObj.footer = data
  },
  setPage(stateObj, data) {
    stateObj.page = data
  },
  setBlogpost(stateObj, data) {
    stateObj.blogPost = data
  },
}
