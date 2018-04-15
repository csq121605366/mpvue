<style>
.row {
  width: 100%;
}
.toptap {
  color: #fff;
  background-color: #2bb5f5;
}

.toptap-tap__ul {
  display: flex;
  padding: 10px 0;
  flex-flow: row nowrap;
  justify-content: space-around;
}
.toptap-tap__li {
  text-align: center;
  flex: 1 1 auto;
  font-size: 12px;
}

.toptap-tap__li .iconfont {
  font-size: 20px;
}
</style>

<template>
  <div class="app">
    <c-header fixed title="首页"></c-header>
    <div class="container">
      <!-- 首页顶部搜索和链接 -->
      <!-- 搜索框 -->
      <c-search></c-search>
      <div class="toptap">
        <div class="toptap-tap__ul">
          <div class="toptap-tap__li">
            <i class="iconfont icon-ziliao"></i>
            <text>快速提问</text>
          </div>
          <div class="toptap-tap__li">
            <i class="iconfont icon-ziliao"></i>
            <text>找医生</text>
          </div>
          <div class="toptap-tap__li">
            <i class="iconfont icon-ziliao"></i>
            <text>医生讲堂</text>
          </div>
        </div>
      </div>
      <!-- 首页顶部搜索和链接-end -->
      <c-article></c-article>
      <scroll></scroll>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import cSearch from "@/components/cSearch";
import cArticle from "@/components/cArticle";
import Scroll from "@/components/cScrollH";
export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: {}
    };
  },

  components: {
    cHeader,
    cSearch,
    cArticle,
    Scroll
  },

  onPullDownRefresh() {
    console.log("刷新了");
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 800);
  },

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      wx.navigateTo({ url });
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo;
            }
          });
        }
      });
    },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  }
};
</script>

