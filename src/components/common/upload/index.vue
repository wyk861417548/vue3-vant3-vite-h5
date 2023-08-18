<template>
  <van-uploader 
    :upload-icon="icon" 
    v-model="fileList" 
    :before-read="beforeRead"
    :after-read="afterRead" 
    :before-delete="beforeDelete"
    :max-size="maxSize*1024*1024" 
    :max-count="maxCount" 
    @oversize="onOversize"
    :preview-size='size'
  >
  </van-uploader>
</template>

<script>
import { reactive, ref,getCurrentInstance,watch, onMounted, computed} from "vue";
import { Toast } from 'vant';
export default{
  props:{
    // 最大上传数
    maxCount:{type:Number,default:2},

    // 上传接口返回图片字段
    path:{type:String,default:'url'},

    // 上传图片类型
    fileType:{type:Array,default:()=>['jpg','png','jpeg']},

    // 上传大小限制 默认 10M
    maxSize:{type:Number,default:10},

    //预览图和上传区域的尺寸 默认单位px 
    size:{type:[String,Number],default:80},
   
    // 默认展示图片
    modelValue:{type:[String,Array]},

    // 上传图标icon（vant icon）图片链接
    icon:{type:String,default:'plus'}
  },

  setup(props,context){
    const {proxy} = getCurrentInstance();
    let fileList = ref([]); //默认展示 fileList需要保证url属性存在

    // 注意：beforeRead要执行返回True之后  afterRead方法才能接受到
    const beforeRead = (file) => {
      if(!handleFileType(file))return;
      return true
    }

    const afterRead = (files) => {
      handleStatus(files,'uploading','上传中')
      kCompass(files).then(() => {upload(files)}) // 图片压缩
    }

    const upload = (files)=>{
      var param = new FormData();
      param.append('file',files.file)
      proxy.$api.common.upload(param).then(res=>{
        handleStatus(files)
        files.url = res.data[props.path]
        change()
      }).catch(()=>{handleStatus(files,'failed','上传失败')})
    }
    
    // 删除
    const beforeDelete = (files,{name,index}) => {fileList.value.splice(index,1);change()}

    // 图片上传状态处理
    const handleStatus = (files,status='done',message='上传成功')=>{
      files.status = status;
      files.message = message;
    }
    
    watch(()=>props.modelValue,(newVal)=>{
      if(newVal){
        fileList.value = !Array.isArray(newVal) ? !Array.isArray(newVal) && (newVal.split(',').map(item=>({url:item}))) : newVal;
      }
    },{immediate:true})

    // 压缩处理
    const kCompass =(files)=>{
      const {file} = files;
      return new Promise(resolve=>{
        proxy.$config.kCompass({fileinput:file}).then(({result}) => {
          const _files_ = proxy.$config.dataURLtoFile(result,file.name)

          // 手机拍照图片旋转90度修复
          proxy.$config.compressorImage(_files_).then(res=>{
            files.file = res;
            resolve();
          })
        })
      })
    }

    // 上传类型判断
    const handleFileType = (file)=>{
      let msg  = `只支持${props.fileType.join(',')}格式的文件`

      const flieArr = file.name.split('.'); // 根据.分割数组
      let suffix = flieArr[flieArr.length - 1]; // 取最后一个
      suffix = suffix && suffix.toLocaleLowerCase(); // 将后缀所有字母改为小写方便操作

      if(props.fileType.indexOf(suffix) == -1){
        Toast(msg);
        return false;
      }
      return true;
    }

    const onOversize = ()=>{
      Toast(`上传文件大小不能超过${props.maxSize}MB!`)
    }

    // 组件使用v-model绑定 直接处理成字符串拼接返回
    const listToString = (list)=>{
      return list.map(item=>item.url).join(',')
    }

    // 是否删除或者新增
    const change = ()=>{
      context.emit('update:modelValue',Array.isArray(props.modelValue)?fileList:listToString(fileList.value))
    }

    return {
      fileList,
      onOversize,
      afterRead,
      beforeRead,
      beforeDelete,
    }
  }
}
</script>
<style lang='less' scoped>
</style>