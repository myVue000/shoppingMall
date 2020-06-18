export function debounce(func, delay=50) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
export function refreshLoad($this,eventName,delay) {
  if($this.$refs.scroll) {
    const refresh = debounce($this.$refs.scroll.refresh, delay);// 调用防抖函数
    $this.$bus.$on(eventName, () => {
      // this.$refs.scroll.refresh();
      refresh();
      console.log('---------');
    })
  }
  else {
    console.log('scroll上需要ref绑定scroll属性');
  }

}

export function formatDate(date, fmt)
{
  var o = {
    "M+" : date.getMonth()+1,                 //月份
    "d+" : date.getDate(),                    //日
    "h+" : date.getHours(),                   //小时
    "m+" : date.getMinutes(),                 //分
    "s+" : date.getSeconds(),                 //秒
    "q+" : Math.floor((date.getMonth()+3)/3), //季度
    "S"  : date.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
