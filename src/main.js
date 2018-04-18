import Vue from "vue";
import App from "./App";
import "./utils/common";
import store from "./store";

Vue.config.productionTip = false;
App.mpType = "app";

Vue.prototype.$store = store;

const app = new Vue(App);

app.$mount();

// 尝试获取用户信息;
// app.$store.dispatch("GetInfo").catch(res => {
//   if (res.statusCode != 200) {
//     app.$store.dispatch("Login", { code: res.code }).then(() => {
//       //第二次拉取用户信息
//       app.$store.dispatch("GetInfo");
//     });
//   }
// });

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      "pages/index/main",
      "pages/qa/main",
      "pages/my/main",
      "pages/roleselect/main",
      "pages/userinfo/main",
      "pages/addfriend/main",
      "^pages/search/main"
    ],
    window: {
      // backgroundTextStyle: "light",
      // navigationBarBackgroundColor: "#2bb5f5",
      // navigationBarTextStyle: "#fff",
      navigationStyle: "custom"
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/index/main",
          text: "首页"
        },
        {
          pagePath: "pages/qa/main",
          text: "问答"
        },
        {
          pagePath: "pages/my/main",
          text: "我的"
        }
      ]
    }
  }
};
