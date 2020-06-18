import Toast from "./Toast";
const obj = {};

obj.install = function (Vue)  {
  //1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  //2. 通过new的方式可以根据组件构造器创建组件对象
  const toast = new toastConstructor();
  //3. 将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));
  //4. 在HTML上加载toast组件对象 toast.$el 对应的就是上面的div
  document.body.appendChild(toast.$el);
  //5.将组件对象加入原型
  Vue.prototype.$toast = toast;
};
export default obj

