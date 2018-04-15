<template>
  <div>
    <div class="zan-panel">
      <div class="zan-panel-title zan-hairline--bottom">
        医师讲堂
        <div class="zan-pull-right more">更多<i class="zan-arrow"></i></div>
      </div>
      <ul class="list">
        <li v-for="item in 2" :key="item" class="list__li zan-hairline--bottom">
          <div class="list__cnt">
            <h3 class="list__title zan-ellipsis">
              黑眼圈怎么办？您的眼霜真的用对了吗？黑眼圈怎么办？您的眼霜真的用对了吗？
            </h3>
            <div class="list__doc">
              <div>李倩</div>
              <div>北京大学第一医院</div>
              <div>医师</div>
            </div>
            <div class="list__subinfo">
              <div class="list__time"><span class="iconfont icon-rili"></span> 2018.4.14</div>
              <div class="list__look"><span class="iconfont icon-zan"></span> 98342人阅读</div>
            </div>
          </div>
          <div class="list__avatar">
            <img class="list__img" src="http://temp.im/100x100/2bb5f5/fff" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "cArticlePanel"
};
</script>

<style scoped>
.zan-panel {
  margin-top: 4px;
}
.zan-panel-title {
  position: relative;
  padding: 10px;
  font-size: 16px;
  color: #2b2b2b;
  line-height: 16px;
}
.more {
  padding-right: 25px;
  position: relative;
  color: #c8c8c8;
  font-size: 12px;
}
.list__li {
  padding: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.list__cnt {
  padding-right: 10px;
  flex: 1 1 auto;
}
.list__avatar {
  flex: 0 1 auto;
}
.list__img {
  width: 60px;
  height: 60px;
  border-radius: 6px;
}
.list__title {
  width: 280px;
}
.list__doc,
.list__subinfo {
  padding: 4px 0 0 0;
  display: flex;
  flex-wrap: row nowrap;
}
.list__doc ._div {
  margin-right: 10px;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list__subinfo {
  justify-content: space-between;
}
.list__subinfo ._div {
  color: #c8c8c8;
  font-size: 12px;
}
</style>
