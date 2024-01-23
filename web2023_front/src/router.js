
import Vue from 'vue';
import VueRouter from 'vue-router';


import PostPage from './pages/PostPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import ProfilePage from './pages/ProfilePage.vue';
import LoginPage from './pages/LoginPage.vue';
import UsersPage from './pages/UsersPage.vue';
import PicturesPage from './pages/PicturesPage.vue';
import MessagesPage from './pages/MessagesPage.vue';
Vue.use(VueRouter);

const routes = [
 
  { path: '/login', component: LoginPage },
  { path: '/profile', component: ProfilePage },
  { path: '/posts', component: PostPage },
  { path: '/register', component: RegisterPage },
  { path: '/users', component: UsersPage },
  { path: '/pictures', component: PicturesPage },
  { path: '/messages', component: MessagesPage },
];

const router = new VueRouter({
  mode: 'history', // Enable history mode
  base: process.env.BASE_URL,
  routes,
});


export default router;