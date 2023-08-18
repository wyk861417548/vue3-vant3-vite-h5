<template>
  <div class='j-vh j-flex-col'>
    <van-tabs class="custom-van-tabs pb-10" v-model:active="curIdx"  background='transparent' style="width:60vw" line-width='20' color='#3A4675'>
      <van-tab v-for="(item,index) in tabs" :title="item.title" :name="item.name" :key="item.name" ></van-tab>
    </van-tabs>

    <p class="b-b"></p>
    
    <footer>
      <keep-alive>
        <component :is='tabs[curIdx].com' :type='tabs[curIdx].title' :key="tabs[curIdx].title"></component>
      </keep-alive>
    </footer>
  </div>
</template>

<script setup>
import { ref,reactive, getCurrentInstance } from 'vue';
import listson1 from './components/listson.vue'
import listson2 from './components/listson.vue'

const curIdx = ref(0)

const tabs =[
  {name:0,title:"listson1",com:listson1},
  {name:1,title:"listson2",com:listson2},
]
</script>
<style lang='less' scoped>
.j-vh{
  padding:0 15px;
  background-color: #fff;
}
footer{
  position: relative;
  flex: 1;
}
</style>