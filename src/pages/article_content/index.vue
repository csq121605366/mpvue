<template>
  <div class="app">
    <!-- <web-view @message="getMessage" src="http://192.168.51.3:7001/app/article"></web-view> -->
    <web-view v-if="src" @message="getMessage" :src="src"></web-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Authorization: "",
      article_id: "",
      src: ""
    };
  },
  onLoad: function(option) {
    if (option.article_id) {
      this.src =
        "http://192.168.166.3:7001/article?article_id=" +
        option.article_id +
        "&Authorization=Bearer " +
        wx.getStorageSync("token");
    }
  },
  methods: {
    getMessage(e) {
      if (e.type == "message") {
        let pages = getCurrentPages(); //当前页面
        let prevPage = pages[pages.length - 2]; //上一页面
        console.log(e);
        prevPage.setData({
          article_id: e.target.data[0].article_id
        });
      }
    }
  }
};
</script>

<style scoped>

</style>
