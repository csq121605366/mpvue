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
.loading {
  position: absolute;
  background-color: #fff;
  left: 0;
  padding-top: 10px;
  top: 70px;
  text-align: center;
  height: 100px;
  width: 100%;
}
.loading-img{
  height: 20px;
  width: 100px;
  display: inline-block;
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
      <c-scroll></c-scroll>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import cSearch from "@/components/cSearch";
import cArticle from "@/components/cArticle";
import cScroll from "@/components/cScrollH";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  components: {
    cHeader,
    cSearch,
    cArticle,
    cScroll
  },
  onPullDownRefresh() {
    // console.log(this.$children[3])
    this.$children[this.$children.length - 1].refresh();
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
      if (!this.$store.getters.id) {
        this.$store.dispatch("Login").then(() => {
          this.$store.dispatch("GetInfo");
        });
      }
    },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    }
  },
  mounted() {
    this.getUserInfo();
  },
  created() {
    // 调用应用实例的方法获取全局数据
  }
};
</script>

