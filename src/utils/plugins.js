
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';//图片懒加载
// import Vconsole from 'vconsole'
import { ImagePreview } from 'vant'; // 图片预览


export default function install(app){
  app.use(Vant);

  app.config.globalProperties.$ImagePreview = ImagePreview;
  
  //Vconsole导致  A plugin must either be a function or an object with an "install" function.
  // if(sessionStorage.__CONSOLE__ == 'true') {
  //   let vConsole = new Vconsole()
  //   app.use(vConsole)
  // }
  
  app.use(Lazyload, {
    lazyComponent: true,
    error: new URL('@/assets/images/lazy/error.png', import.meta.url).href,
    loading: new URL('@/assets/images/lazy/default.png', import.meta.url).href,
    preLoad: 1,
    attempt: 1,
  });



  /**
   * 搭配滚动组件一起使用
   * @param {*} SCROLL 滚动组件ref
   * @param {*} list  滚动列表
   * @param {*} total 列表总长度
   * @returns 
   */
  //上拉加载默认状态 0：可加载， 1：无数据， 2已结束， 3:加载中
  app.config.globalProperties.$isScroll = (SCROLL,list,total)=>{
    //处理数据还在加载中，已经离开本页面
    if(!SCROLL) return;

    // 加载状态结束
    SCROLL.value.status = 0;

    // 无数据
    if(list.length < 1){
      SCROLL.value.status = 1;
      return;
    }
    
    // 如果已经是最后一页了 结束
    if(total <= list.length){
      SCROLL.value.status = 2;
    }
  }
}