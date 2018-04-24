<template>
  <div class="app">
    <c-header fixed title="问诊"></c-header>
    <div class="container">
      <!-- 首页顶部搜索和链接 -->
      <!-- 搜索框 -->
      <div class="search" @click="navigate">
        <c-search></c-search>
      </div>
      <div class="qa">
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import cSearch from "@/components/cSearch";
import { mapGetters } from "vuex";
export default {
  components: {
    cHeader,
    cSearch
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["role", "status", "department"])
  },
  methods: {
    navigate() {
      wx.navigateTo({
        url: "/pages/search/main"
      });
    }
  },
  onShow() {
    //病人进来为提问页面 医生进来为问题列表
    if (this.role == "0") {
      wx.showToast({
        title: "请完善资料",
        icon: "none",
        mask: true,
        success: function() {
          setTimeout(() => {
            wx.switchTab({
              url: "/pages/my/main"
            });
          }, 800);
        }
      });
    }
  }
};
</script>

<style scpoed>

</style>
