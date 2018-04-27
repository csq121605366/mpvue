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
.placeholder {
  color: #a5a5a5;
  font-size: 14px;
}
.search_wrap {
  background-color: #2bb5f5;
  padding: 10px 20px 10px;
}
.search {
  position: relative;
  height: 35px;
  background-color: #fff;
  border-radius: 35px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.search_icon {
  padding: 0 10px;
  color: #2bb5f5;
}
.search_box {
  flex: 1 1 auto;
  font-size: 13px;
  color: #a5a5a5;
}
</style>

<template>
  <div class="app">
    <c-header fixed title="首页"></c-header>
    <div class="container">
      <!-- 首页顶部搜索和链接 -->
      <div @click="navigateTo('/pages/search/main')">
        <!-- 搜索框 -->
        <div class="search_wrap">
          <div class="search">
            <i class="search_icon iconfont icon-sousuo" type="search"></i>
            <input disabled class="search_box" placeholder-class="placeholder" type="text" placeholder="搜索医生 / 科室 / 问题 / 资讯">
          </div>
        </div>
      </div>
      <c-tap :articleList="true"></c-tap>
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
    if (!this.role || this.role == "0") {
      this.getUserInfo();
    }
  },
  created() {
    // 调用应用实例的方法获取全局数据
  }
};
</script>

