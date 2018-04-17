<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync("logs") || [];
    // logs.unshift(Date.now());
    // wx.setStorageSync("logs", logs);
    // console.log("app created and cache logs by setStorageSync");
  }
};
</script>

<style>
@import "./assets/style/iconfont.wxss";
@import "./assets/style/zanui.wxss";
page {
  height: 100%;
  width: 100%;
}
.app {
  height: 100%;
  width: 100%;
  color: #2b2b2b;
  font-size: 14px;
}
.container {
  background-color: #f0f0f0;
  padding-top: 70px;
  box-sizing: border-box;
  height: 100%;
  /* overflow: scroll; */
  width: 100%;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
image {
  vertical-align: top;
}
</style>
