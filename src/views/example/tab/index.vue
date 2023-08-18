<template>
  <div class='j-full-curbox j-flex-col'>
    <main>
      <section class="j-full-curbox">
        <keep-alive>
          <component :is="tabs[curIdx].com"></component>
        </keep-alive>
      </section>
    </main>

    <footer>
      <section class="j-v-c" v-for='(item, index) in tabs' :key='index' @click="curIdx=index">
        <img :src="tabImg(item,index)" alt="">
        <p>{{ item.name }}</p>
      </section>
    </footer>
  </div>

</template>

<script setup>
import {ref} from 'vue';
import home from "./components/home.vue"
import my from "./components/my.vue"

let curIdx = ref(0)
const tabs =[
  { name: "首页",icon:'home',com:home},
  { name: "我的",icon:'my',com:my},
]

const tabImg = (item,index)=>{
  // 
  return new URL(`../../../assets/images/tab/${item.icon}${curIdx.value == index ? '_active.gif' : '.png'}`, import.meta.url).href
}

</script>
<style lang='less' scoped>
main {
  position: relative;
  flex: 1;
}

footer {
  position: relative;
  z-index: 10;
  display: flex;
  height: 60px;
  background: #fff;
  box-shadow: 0 0 5px #ddd;

  section {
    flex: 1;
    text-align: center;
    color: #999;

    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>