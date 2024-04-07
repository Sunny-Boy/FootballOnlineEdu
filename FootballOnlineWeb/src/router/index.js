import {createRouter, createWebHistory} from 'vue-router'

// 路由列表
const routes = [

]

// 路由对象实例化
const router = createRouter({
  history: createWebHistory(),  // history, 指定路由的模式
  // 路由列表
  routes,
});


export default router