// 获取公共组件文件路径集合（只获取文件夹下面的index.vue）
const modules  = import.meta.glob('@/components/common/*/index.vue')

export default function install(app){
  // 遍历 modules 对象的 key 值来访问相应的模块
  for (const path in modules) {
    modules[path]().then((mod) => {
      // 以文件夹名称作为公共组件的名字
      let arr = path.split('/');
      const componentName =  arr[arr.length-2].replace(/\.\w+$/, '');

      app.component(componentName, mod["default"]);
    })
  }
}



