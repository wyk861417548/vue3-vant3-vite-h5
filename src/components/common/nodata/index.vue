<template>
	<div class="j-full-curbox" style="position:fixed;background-color: #fff;"  v-if="show" >
		<div class="j-full-center" style="text-align: center;top: 40%;">
      <slot>
        <img src="@/assets/images/error/nodata.png" alt="图片">
        <div style="color:#5A5B5C;">暂无数据</div>
      </slot>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
export default{
  setup(){
    let show = ref(false)
    return {show}
  }
}
</script>

<style lang="less">

</style>
