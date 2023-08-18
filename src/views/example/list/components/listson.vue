<template>
  <Scroll ref="scroll" @load="getData">
    <router-link to="/example/list/detail">
      <div class="list"  v-for='(item,index) in state.list' :key='index'>
        {{item.name}} -- {{item.age}}
      </div>
    </router-link>
  </Scroll>

</template>

<script setup>
import { ref,reactive, onMounted, getCurrentInstance } from 'vue';

const {proxy} = getCurrentInstance()
const props = defineProps({type:String})
const scroll = ref(null)
const state = reactive({
  list:[]
})

let data = {
  //列表初始页码
  page: 1,   
  //每页条数
  size:10
}

onMounted(()=>{
  getData()
})

const getData = ()=>{
  setTimeout(()=>{
    for (let i = 0; i < 10; i++) {
      state.list.push({name:props.type,age:(data.page-1)*10+i})
    }
    data.page++;
    proxy.$isScroll(scroll,state.list,30)
  },1000)
}
</script>
<style lang='less' scoped>
  .list {
    margin-top: 20px;
    height: 100px;
    color: #fff;
    background: linear-gradient(to right,#ff6700,#f33);
    line-height: 100px;
    text-align: center;
  }
</style>