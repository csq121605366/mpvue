<template>
  <div class="app">
    <c-header back fixed title="文章详情"></c-header>
    <div class="container">
      <div v-if="article" class="detail">
        <div class="hd">
          <h1 class="title">{{article.title}}</h1>
          <p>作者：
            <span>{{article.author}}</span>{{article.meta.created}}</p>
        </div>
        <div class="cnt">

        </div>
        <div class="ft">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { getDetail } from "@/utils/api";
import { formatTime } from "@/utils";
export default {
  components: {
    cHeader
  },
  data() {
    return {
      article_id: "",
      article: null
    };
  },
  onLoad: function(option) {
    option.article_id = "5add8ca5ab1f0e28e8b278a2";
    if (option.article_id) {
      this.article_id = option.article_id;
    } else {
      wx.redirectTo({
        url: "/pages/index/main"
      });
    }
  },
  mounted() {
    this._initData();
  },
  methods: {
    _initData() {
      getDetail({ article_id: this.article_id }).then(res => {
        let data = res.data;
        data.meta.created = formatTime(new Date(data.meta.created));
        this.article = res.data;
      });
    }
  }
};
</script>

<style scoped>

</style>
