import Vue from "vue";
import App from "./index";

const app = new Vue(App);
app.$mount();

export default {
  config: {
    onReachBottomDistance: 60,
    enablePullDownRefresh: true,
    onReachBottomDistance: 60
  }
};
