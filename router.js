import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/indexPage.vue';
import Blog from './pages/blog/indexPage.vue';
import BlogPost from './pages/blog/_blog.vue';
import NotFound from './layouts/ErrorLayout.vue';

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    routes: [
      {
        path: '/',
        component: Home,
      },
      {
        path: '/blog',
        component: Blog,
      },
      {
        path: '/blog/:slug',
        component: BlogPost,
      },
      {
        path: '/:page',
        component: Home,
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound,
      },
    ],
    fallback: false,
  })
}
