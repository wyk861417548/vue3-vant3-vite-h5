<template>
  <section class="custom-box">
    <h2 class="box-title">测试上传图片压缩（基于vant组件）</h2>
    <upload v-model="state.pic" path='path'></upload>
  </section>

  <section class="custom-box">
    <h2 class="box-title">测试不是详情返回缓存页面，是否刷新</h2>
    
    <router-link to="/example/Scroll">
      <van-button type='primary'>scroll-单一</van-button>
    </router-link>
    
  </section>

  <section class="custom-box">
    <h2 class="box-title">测试不是详情返回缓存页面，是否刷新</h2>
    <router-link to="/example/list">
      <van-button type='primary'>scroll-切换</van-button>
    </router-link>
  </section>

  <section class="custom-box">
    <h2 class="box-title">图片懒加载</h2>
    <router-link to="/example/v-lazy">
      <van-button type='primary'>图片懒加载</van-button>
    </router-link>
  </section>

  <section class="custom-box">
    <van-button type='primary' @click="showPick(1)">显示日期</van-button>
    <DatetimePicker type='year-month' ref="datePicker" format="yyyy-MM" @change="changeDatetimePicker"></DatetimePicker>
  </section>

  <section class="custom-box">
    <van-button type='primary' @click="showPick">Picker</van-button>
    <Picker ref="picker"></Picker>
  </section>

</template>

<script setup>
  import { ref,reactive,getCurrentInstance, watch, onMounted} from 'vue';
  // 获取全局
  const {proxy}  = getCurrentInstance();

  const datePicker = ref(null)
  const picker = ref(null)
  const hello = ref(null)

  const state = reactive({
    pic:'https://img01.yzcdn.cn/vant/leaf.jpg',

    // pic:[{url:'https://img01.yzcdn.cn/vant/leaf.jpg'}]
  })

  // 重新加载页面
  function reload(){
    window.location.reload();
  }

  function showPick(type){
    if(type == 1)datePicker.value.show = true
    else picker.value.show = true
  }

  // 上传回调
  function changeUpload(){}
  function changeDatetimePicker(date){
    console.log('data',date);
  }
</script>
<style lang='less' scoped>
</style>