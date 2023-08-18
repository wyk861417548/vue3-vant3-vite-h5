## About

此项目是基于vue-cli3.x构建的,基于vant框架的h5模板。
## 技术栈
vue3 + pinia + vue-router +  + ES6/7 + less + vant

## 环境
```
npm 6.14.8
node 14.15.1
yarn 1.22.10
```

## 
```
接口请求设置后端返回设置 cache-control: no-cache, no-store, max-age=0, must-revalidate
// ios从公众号页面返回不请求接口处理
ios(){
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isiOS){
    window.onpageshow =(event)=>{
      if (event.persisted || window.performance && window.performance.navigation.type == 2) {
        //接口请求
      }
    };
  }
}
```

## 目录结构
```
├── public                     # 静态资源
│   └── index.html             # html模板
├── src                        # 源代码
│   ├──static                  # 图片、字体等第三方静态资源 (存放不会变动的文件，不会被webpack处理)
        ├──css                 # css
        ├──images              # 图片
        ├──js                  # js
    ├──assets                  # 图片、字体等资源  （存放会变动的文件，会被webpack处理）
        ├──images              # 图片
        ├──less                # 自定义全局less
        ├──css                 # 自全局css
│   ├── components             # 全局公用组件
        ├──common              # 全局公共组件（“自动注册” 遵循一个文件夹里面定义index.vue格式，文件夹名称作为全局组件使用名称）
│   ├── router                 # 路由
│   ├── store                  # 全局store管理
│   ├── utils                  # 全局公用方法
        ├──config（文件夹）     # 公共方法拆分的js文件
          ├──compressorjs      # 图片压缩以及处理拍照上传旋转90度问题（搭配kCompass压缩使用）
          ├──kCompass          # 图片压缩（自定义通过canvas进行压缩，压缩效率比compressorjs好，所以不使用compressorjs的压缩）
          ├──LazyloadImg       # 图片懒加载（配置）
          ├──loading           # 全局动画加载
          ├──url               # 地址栏处理相关
        ├──config              # 公共方法
        ├──request             # 公共请求封装
        ├──validator           # 提交校验
        ├──api                 # 请求接口配置
        ├──login               # 各种登录支付配置
        ├──automatic           # 全局主动注册公共组件
        ├──plugins             # 插件引入(或者各种挂载vue原型配置等等)
│   ├── views                  # views所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
├── .borwserslistrc            # 浏览器兼容相关
├── .env.xxx                   # 环境变量配置（dev:本地环境，prod：生产环境，test：测试环境）;
├── .eslintrc.js               # eslint 配置项
├── .gitignore.js              # git忽略文件设置
├── .babelrc.config.js         # babel-loader 配置
├── package.json               # package.json
├── postcss.config.cjs         # postcss 配置（注意这里后缀是.cjs）
└── vite.config.js             # vite 配置
```
## 1.懒加载图片组件使用（$config.LazyloadImg(图片地址)）
```
<section v-for="(item,index) in imgList" :key="index">
  <img v-lazy="item.img" alt="" class="img">
</section>

imgList:[
  {name:"1",menuId:'1',img:require('@/assets/images/error/nodata.png')},
  {name:"2",menuId:'10013',img:require('@/assets/images/error/nodata.png')},
]
```

## 2.原生scroll（单页面无切换），如果有切换请看示例/example/list（新建中间页来处理缓存问题）
```
<Scroll ref="scroll" @load="getData">
  <div class="list"  v-for='(item,index) in state.list' :key='index' @click="router.push('/example/list/detail')">
    {{item.name}} -- {{item.age}}
  </div>
</Scroll>

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
```

## 3.基于vant的上传组件
```
<upload v-model='state.pic'></upload>

const state = reactive({
  pic:'https://img01.yzcdn.cn/vant/leaf.jpg',

  // pic:[{url:'https://img01.yzcdn.cn/vant/leaf.jpg'}]
})
```

### Props

| 参数 | 说明                                         | 类型   | 默认值 |
| :--- | -------------------------------------------- | :----- | :----- |
| maxCount  | *最大上传数*                                 | Number | 1      |
| path | *上传接口返回图片字段* | String | url   |
| fileType | *上传图片类型*             | Array | ['jpg','png','jpeg'] |
| maxSize | *上传大小*             | Number | 10 |
| size | *预览图和上传区域的尺寸 默认单位px*             | Number或String | 80 |
| value | *默认展示图片，string类型逗号拼接，Array需要保证url属性存在*             | String或Array | / |
| icon | *中间展示图标,vant图标或者图片路径*             | String | plus |
