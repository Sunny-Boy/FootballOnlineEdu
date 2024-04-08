import {createRouter, createWebHistory} from 'vue-router'
import store from "../store";

// 路由列表
const routes = [
{
    meta:{
        title: "球学Online学习平台--首页",
        keepAlive: false //创建缓存：加速访问
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


  },{
    meta:{
        title: "球学Online学习平台-个人中心",
        keepAlive: true,
    },
    path: '/user',
    name: "User",
    component: ()=> import("../views/User.vue"),
  },
]

// 路由对象实例化
const router = createRouter({
  history: createWebHistory(),  // history, 指定路由的模式
  // 路由列表
  routes,
});


// 导航守卫
router.beforeEach((to, from, next)=>{
  document.title=to.meta.title
  // 登录状态验证
  if (to.meta.authorization && !store.getters.getUserInfo) {
    next({"name": "Login"})
  }else{
    next()
  }
})
export default router