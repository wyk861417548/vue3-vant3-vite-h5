<template>
  <van-popup v-model:show="show" round position="bottom">
    <van-datetime-picker
      :type="type"
      title="选择时间"
      v-model="date"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm='confirm'
      @cancel='show=false'
    />
  </van-popup>
</template>

<script setup>
import {ref} from 'vue'
const emits = defineEmits(['change'])
const props = defineProps({
  type:{type:String,default:'date'},
  // 最小选择时间
  minDate:{type:Date,default:()=>{return new Date(2020,0,1)}},
  // 最大选择时间
  maxDate:{type:Date,default:()=>{return new Date()}},
  // 默认显示时间
  currentDate:{type:Date,default:()=>{return new Date()}},
  // 格式化
  format:{type:String,default:'yyyy-MM-dd'}
})


let date = props.currentDate || new Date();
let show = ref(false)

function confirm(value){
  show.value = false;
  emits('change',new Date(value).format(props.format))
}

// 为了父组件能够直接拿到
defineExpose({show})
</script>