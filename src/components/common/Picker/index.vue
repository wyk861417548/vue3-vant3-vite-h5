<template>
  <van-popup v-model:show="show" round position="bottom">
    <van-picker
      :title="title"
      show-toolbar
      :columns-field-names="custom"
      :columns="vdata"
      @confirm="confirm"
      @cancel="show=false"
    />
  </van-popup>

</template>

<script>
import {ref} from 'vue'
export default{
  props:{
    vdata:{type:Array,default:()=>[]},

    title:{type:String,default:'标题'},

    // 自定义 名字 值 字段
    custom:{
      type:Object,
      default:()=>{
        return {
          text:'text',
          children:'children'
        }
      }
    }
  },

  setup(props,context){
    let show = ref(false)

    const confirm = (value)=>{
      show.value = false;
      context.emit('change',value)
    }

    return {
      show,
      confirm
    }
  }
}
</script>
<style lang='less' scoped>
</style>