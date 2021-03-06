//入口文件
import Vue from "vue";
import App from "./app.vue";

import "./assets/styles/global.styl"; //引入全局样式

const root = document.createElement("div");
document.body.append(root);

new Vue({
  render: (h) => h(App), //声明这个vue实例渲染的是App
}).$mount(root); //将这个实例挂载到dom
