<template>
    <div class="app">
        <!-- <web-view @message="getMessage" src="http://192.168.51.3:7001/app/article"></web-view> -->
        <web-view @message="getMessage" :src="'http://192.168.51.3:7001/article?id='+id"></web-view>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["id"])
  },
  methods: {
    getMessage(e) {
      if (e.type == "message") {
        let pages = getCurrentPages(); //当前页面
        let prevPage = pages[pages.length - 2]; //上一页面
        prevPage.setData({
          articleContent: e.target.data[0]
        });
      }
    }
  }
};
</script>

<style scoped>

</style>
