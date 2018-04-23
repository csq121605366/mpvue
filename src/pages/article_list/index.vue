<template>
  <div class="app">
    <c-header back fixed title="文章列表"></c-header>
    <div class="container">
      <div class="list">
        <c-list :user_id="id"></c-list>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import cList from "@/components/cScrollH";
import { mapGetters } from "vuex";

export default {
  components: {
    cHeader,
    cList
  },
  data() {},
  computed: {
    ...mapGetters(["id", "department"])
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.tablist {
  position: relative;
  margin-top: 4px;
}

.tablist_scroll_text {
  border-bottom: 2px solid transparent;
  height: 42px;
  line-height: 44px;
  text-overflow: ellipsis;
  word-break: break-all;
  font-size: 14px;
  max-width: 100%;
}
.tablist_scroll-active {
  border-bottom: 2px solid #2bb5f5;
}

.tablist_list_wrap {
  height: 500px;
}
.tablist_list {
  position: relative;
  width: auto;
}

.tablist_list_item {
  width: 100%;
  height: 1000px;
  padding: 0 10px;
  box-sizing: border-box;
  display: inline-block;
  background-color: #fff;
}
.tablist_article_item {
  display: flex;
  flex-flow: row nowrap;
  padding: 10px 0;
}
.tablist_article_cnt {
  padding-right: 10px;
  flex: 1 1 auto;
}
.tablist_article_title {
  width: 280px;
  line-height: 30px;
  word-wrap: break-word;
}
.tablist_article_text {
  width: 280px;
  font-size: 12px;
  line-height: 18px;
  color: #a0a0a0;
}
.tablist_article_author {
  margin-top: 10px;
  font-size: 10px;
  line-height: 10px;
}
.tablist_article_author ._span {
  line-height: 20px;
}
.tablist_article_tag {
  float: right;
  margin-left: 10px;
  box-sizing: border-box;
  line-height: 20px;
  padding: 0 5px;
  border-radius: 2px;
  font-size: 10px;
  background: #c9c9c9;
  text-align: center;
  color: #fff;
}

.tablist_article_avatar {
  width: 20px;
  margin-right: 5px;
  height: 20px;
  border-radius: 50%;
  vertical-align: middle;
}
.tablist_article_banner {
  flex: 0 1 auto;
}
.tablist_article_img {
  width: 60px;
  height: 60px;
  border-radius: 6px;
}
</style>
