import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/tags',
      name: 'tags',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Tag.vue'),
    },
    {
      path: '/manage-user',
      name: 'manage-user',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Manage-user.vue'),
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('./views/Post.vue'),
    },

    {
      path: '/newtag',
      name: 'NewTag',
      component: () => import('./views/NewTag.vue'),
    },
    {
      path: '/newpost',
      name: 'NewPost',
      component: () => import('./views/NewPost.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
    },
    {
      path: '/tags/:id/update',
      name: 'update tag',
      component: () => import('./views/UpdateTag.vue'),
    },
    {
      path: '/posts/:id/update',
      name: 'update post',
      component: () => import('./views/UpdatePost.vue'),
    },
    {
      path: '/dashboard/new',
      name: 'dashboard new',
      component: () => import('./views/Admin.vue'),
    },
    {
      path: '/:nameSite',
      name: 'mysite',
      component: () => import('./views/MySite.vue'),
    },
    {
      path: '/:nameSite/tags/:nameTag/:tagId',
      name: 'listtag',
      component: () => import('./views/PostaTag.vue'),
    },
    {
      path: '/:nameSite/posts/:nameTag/:postId',
      name: 'listpost',
      component: () => import('./views/PostDetail.vue'),
    },
    {
      path: '/posts/:postId/comments',
      name: 'mySite',
      component: () => import('./views/CommentPost.vue'),
    },
    {
      path:'/:nameSite/search',
      name:"search",
      component:()=> import('./views/Search.vue')
    }
  ],
})
