<template>
  <div class="app">
    <c-header back fixed title="医生"></c-header>
    <div class="container">
      <ZanTab v-bind="doctor" :componentId="'doctor'" :handleZanTabChange="menuChange"></ZanTab>
      <div class="list">
        <div v-for="(item,index) in doctor.list" v-if="item.id == doctor.selectedId" :key="index" class="item">
          <div v-if="item.data.length" v-for="(x,i) in item.data" :key="x" @click="navigate(x._id)" class="ceil">
          </div>
          <div class="none" v-if="!item.data.length">没有内容</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import cTap from "@/components/cTap";
import { mapGetters } from "vuex";
import ZanTab from "@/components/zan/tab";
export default {
  components: {
    cHeader,
    cTap
  },
  data() {
    return {
      doctor: {
        list: [],
        scroll: false,
        selectedId: ""
      }
    };
  },
  computed: {
    ...mapGetters(["id", "department"])
  },
  mounted() {
    if (!this.department || this.department.length == 0) {
      wx.showToast({
        title: "请先关注科室(修改我的信息)",
        icon: "none",
        mask: true,
        success: function() {
          setTimeout(() => {
            wx.switchTab({ url: "/pages/my/main" });
          }, 2000);
        }
      });
    } else {
      console.log(this.department);
    }
  },
  methods: {
    ...ZanTab.methods,
    menuChange(e) {
      console.log(e);
    },
    _initData() {}
  }
};
</script>

<style scoped>

</style>
