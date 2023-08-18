<template>
  <main>
    <section v-for="(item,index) in imgList" :key="index">
      <img v-lazy="item.img" alt="" class="img">
    </section>

    <section v-for="(item) in bgList" :key="item.menuId">
      <div v-lazy:background-image="item.img" class="img bg"></div>
    </section>
  </main>
</template>

<script setup>
import img from '@/assets/images/error/nodata.png'
const imgList =[
  {name:"1",menuId:'1',img},
  {name:"2",menuId:'10013',img},
  {name:"2",menuId:'10013',img},
  {name:"2",menuId:'10013',img},
  {name:"2",menuId:'10013',img},
  {name:"2",menuId:'10013',img},
  {name:"2",menuId:'10013',img},
  {name:"2",menuId:'10013',img},
  {name:"2",menuId:'10013',img},
  {name:"2",menuId:'10013',img},
  {name:"2",menuId:'10013',img},
  {name:"2",menuId:'10013',img},
  {name:"2",menuId:'10013',img},
  {name:"2",menuId:'10013',img},
]

const bgList = [
  {name:"1",menuId:'10',img}
]

</script>
<style lang='less' scoped>
  main{
    text-align: center;
    .img{
      width:200px;
      height:200px;
    }
    .bg{
      display:inline-block;
      background-repeat:no-repeat;
      background-size:100% 100%;
      background-position:0 0;
    }
  }
</style>