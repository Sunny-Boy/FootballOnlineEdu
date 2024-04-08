<template>
    <div class="footer">
      <ul >
        <li v-for="nav in nav.footer_nav_list">
          <a :href="nav.link" v-if="nav.is_http" class="color-a" >{{nav.name}}</a>
          <router-link :to="nav.link" v-else class="color-a">{{nav.name}}</router-link>
        </li>
      </ul>
      <p>Copyright © footballOnline.com版权所有 | 京ICP备1231312 </p>
    </div>
</template>

<script setup>
import nav from "../api/nav";

// 获取脚部导航列表
nav.get_footer_nav().then(response=>{
  nav.footer_nav_list = response.data
})

</script>

<style scoped>
.color-a{
  color: #f0f0f0;
}
.footer {
  width: 100%;
  height: 100px;
  color: #f0f0f0;
  background-color: black;
}
.footer ul{
  margin: 0 auto 16px;
  padding-top: 30px;
  width: 930px;

}
.footer ul li{
  float: left;
  width: 128px;
  margin: 0 10px;
  text-align: center;
  font-size: 14px;

}
.footer ul::after{
  content:"";
  display:block;
  clear:both;
}
.footer p{
  text-align: center;
  font-size: 12px;
}
</style>