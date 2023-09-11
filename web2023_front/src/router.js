
import Vue from 'vue';
import VueRouter from 'vue-router';


import PostPage from './pages/PostPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import ProfilePage from './pages/ProfilePage.vue';
import LoginPage from './pages/LoginPage.vue';

Vue.use(VueRouter);

const routes = [
 
  { path: '/login', component: LoginPage },
  { path: '/profile', component: ProfilePage },
  { path: '/posts', component: PostPage },
  { path: '/register', component: RegisterPage },
];

const router = new VueRouter({
  routes,
});

export default router;