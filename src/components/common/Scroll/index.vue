<template>
  <div class="my-scroll j-full-curbox" ref="scroll" @scroll="onScroll">
    <slot></slot>

    <div v-show="status==1" class="j-full-curbox">
      <div class="j-full-center nodata">
        <img src="@/assets/images/error/nodata.png" alt="图片">
        <p>暂无数据</p>
      </div>
    </div>

    <div class="footer" v-show="[2,3].includes(status)">
      {{status == 2?'没有更多了':'加载中...'}}
    </div>
  </div>
</template>

<script>
import { ref,reactive, onActivated,onMounted, nextTick, toRefs } from 'vue';
export default{
  setup(props,context){
    const scroll = ref(null);
    const bottom = 10; // 距离底部还有多远触发
    const status = ref(3);//上拉加载默认状态 0：可加载 1：无数据 2已结束 3:加载中
    let scrollTop = 10; // 滚动距离

    onActivated(() => {
      setScrollTop()
    })

    // 监听滚动  上拉加载默认状态 status 0：可加载 1：无数据 2已结束 3:加载中
    const onScroll = (e) => {
      // 当前滚动盒子
      var aim = e.target;

      scrollTop = aim.scrollTop;

      // 如果不是可加载的状态
      if(status.value !=0)return;

      // 如果当前盒子总滚动高度减去距离底部距离 不大于 滚动距离 + 盒子默认占据高度  可以加载数据
      var boolean = (aim.scrollHeight-bottom) <= Math.ceil(aim.scrollTop+aim.clientHeight);

      // 传递给父组件可以加载数据
      if(boolean){
        status.value = 3;
        context.emit("load")
      }
    }

    // 设置离开前的位置距离
    const setScrollTop = (top) => {
      scroll.value.scrollTop = top || scrollTop;
    }

    return {
      setScrollTop,
      onScroll,
      status,
      scroll
    }
  }
}
</script>
<style lang='less' scoped>
.my-scroll{
  -webkit-overflow-scrolling:touch;
  .nodata{
    top:40%;
    text-align:center;
    color:#5A5B5C;
  }
  .footer{
    padding:10px;
    line-height:1;
    text-align:center;
    font-size:14px;
    color:#969799;
  }
}
</style>