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
.loading-img {
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
      <div @click="navigateTo('/pages/search/main')">
        <!-- 搜索框 -->
        <c-search></c-search>
      </div>
      <div class="toptap">
        <div class="toptap-tap__ul">
          <div @click="navigateTo('/pages/qa_create/main')" v-if="role=='0'||role=='1'" class="toptap-tap__li">
            <i class="iconfont icon-ziliao"></i>
            <text>快速提问</text>
          </div>
          <div @click="navigateTo('/pages/qa_list/main')" v-else class="toptap-tap__li">
            <i class="iconfont icon-ziliao"></i>
            <text>问题列表</text>
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
      <c-tap></c-tap>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import cSearch from "@/components/cSearch";
import cArticle from "@/components/cArticle";
import cTap from "@/components/cTap";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  computed: {
    ...mapGetters(["role"])
  },
  components: {
    cHeader,
    cSearch,
    cArticle,
    cTap
  },
  onPullDownRefresh() {
    // console.log(this.$children[3])
    this.$children[this.$children.length - 1].refresh();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 800);
  },
  onReachBottom() {
    this.$children[this.$children.length - 1].loadMore();
  },
  methods: {
    bindViewTap() {
      const url = "../logs/main";
      wx.navigateTo({ url });
    },
    getUserInfo() {
      this.$store.dispatch("Login").then(() => {
        this.$store.dispatch("GetInfo");
      });
    },
    navigateTo(url) {
      if (this.role == "0") {
        wx.showToast({
          title: "请完善信息后提问",
          icon: "none",
          success: function() {
            wx.navigateTo({
              url: "/pages/roleselect/main"
            });
          }
        });
      } else {
        wx.navigateTo({
          url: url
        });
      }
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

