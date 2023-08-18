<template>
  <Scroll ref="scroll" @load="getData">
    <div class="list"  v-for='(item,index) in state.list' :key='index' @click="router.push('/example/list/detail')">
      {{item.name}} -- {{item.age}}
    </div>
  </Scroll>
</template>

<script setup>
  import { ref,reactive, onActivated, getCurrentInstance } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  const scroll = ref(null)
  const route = useRoute()
  const router = useRouter()
  const {proxy} = getCurrentInstance();

  const state = reactive({
    init:false,
    list:[]
  })

  let data = {
    //列表初始页码
    page: 1,   
    //每页条数
    size:10
  }

  onActivated(() => {
    if(!route.meta.isBack || !state.init){
      state.init = true
      init()
    }
  })
  
  const init = () => {
    state.list.length = 0;
    data.page = 1;
    scroll.value.status = 3;
    getData();
  }
  
  const getData = ()=>{
    setTimeout(()=>{
      data.page++;
      for (let i = 0; i < 10; i++) {
        state.list.push({name:data.page+"---i---"+i,age:i})
      }
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