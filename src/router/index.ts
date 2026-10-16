import { createRouter, createWebHistory } from 'vue-router'
import BookShelf from '@/views/BookShelf.vue'
import BookPage from '@/views/BookPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'shelf', component: BookShelf },
    { path: '/book/:slug', name: 'book', component: BookPage, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
