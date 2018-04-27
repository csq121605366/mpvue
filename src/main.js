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
      "^pages/index/main", //首页
      "pages/qa/main", //问诊
      "pages/my/main", //我的
      "pages/qa_create/main", //快速提问
      "pages/qa_list/main", //我的问题列表
      "pages/myinfo/main", //我的信息展示
      "pages/roleselect/main", //角色选择
      "pages/updateuserinfo/main", //更新个人信息
      "pages/addfriend/main", //添加潜在客户
      "pages/search/main", //搜索
      "pages/article/main", //添加文章
      "pages/article_content/main", //添加文章正文
      "pages/article_list/main", //文章列表
      "pages/article_detail/main", //文章详情
      "pages/user_list/main", //医生列表
      "pages/user_detail/main" //医生列表
    ],
    window: {
      // backgroundTextStyle: "light",
      // navigationBarBackgroundColor: "#2bb5f5",
      // navigationBarTextStyle: "#fff",
      navigationStyle: "custom"
    },
    tabBar: {
      color: "#2b2b2b",
      selectedColor: "#2bb5f5",
      list: [
        {
          pagePath: "pages/index/main",
          iconPath: "/static/index-b-1.png",
          selectedIconPath: "/static/index-l-1.png",
          text: "首页"
        },
        {
          pagePath: "pages/qa/main",
          iconPath: "/static/qa-b-1.png",
          selectedIconPath: "/static/qa-l-1.png",
          text: "问诊"
        },
        {
          pagePath: "pages/my/main",
          iconPath: "/static/my-b-1.png",
          selectedIconPath: "/static/my-l-1.png",
          text: "我的"
        }
      ]
    }
  }
};
