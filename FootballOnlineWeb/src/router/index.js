import {createRouter, createWebHistory} from 'vue-router'

// 路由列表
const routes = [
{
    meta:{
        title: "球学Online学习平台--首页",
        keepAlive: true //创建缓存：加速访问
    },
    path: '/',         // uri访问地址
    name: "Home",
    component: ()=> import("../views/Home.vue")
  },
  {
    meta:{
        title: "球学Online学习平台--用户登陆",
        keepAlive: true
    },
    path:'/login',      // uri访问地址
    name: "Login",
    component: ()=> import("../views/Login.vue")
  }
]

// 路由对象实例化
const router = createRouter({
  history: createWebHistory(),  // history, 指定路由的模式
  // 路由列表
  routes,
});


export default router