// 长条banner图
export function LazyloadImg(img){
  return {
    src: img,
    error: import.meta.glob('@/assets/images/lazy/banner.png'),
    loading: import.meta.glob('@/assets/images/lazy/banner.png'),
  }
}