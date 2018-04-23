<template>
  <div class="app">
    <c-header back fixed title="文章详情"></c-header>
    <div class="container">
      <div v-if="article" class="detail">
        <div class="hd">
          <h1 class="title">{{article.title}}</h1>
          <p class="subtitle">作者：
            <span class="author">{{article.author}}</span>{{article.meta.created}}</p>
        </div>
        <div class="cnt">
          <rich-text :nodes="article.content"></rich-text>
          <ul v-if="article.videos.length" class="meida">
            <li v-for="(item,index) in article.videos" :key="index">
              <video :src="item.videoURL" controls show-fullscreen-btn></video>
            </li>
          </ul>
        </div>
        <div class="ft">
          <div class="look">
            <ul class="look_list" v-if="article.looked&&article.looked.length">
              <li v-for="(item,index) in article.looked" :key="index"><img class="look_avatar" :src="item.avatar.imageURL+'-webp'" alt=""></li>
              <li class="look_num">{{article.lookedNum}}人查看</li>
            </ul>
          </div>
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
    option.article_id = "5add8d4bab1f0e28e8b278a3";
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
        data.lookedNum = data.looked.length;
        data.looked = data.looked.slice(0, 5);
        this.article = data;
      });
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #fff;
  padding: 0 10px;
}
.hd {
  padding: 20px 10px;
}
.cnt {
  padding-bottom: 50px;
}
.title {
  font-size: 20px;
  text-align: center;
  padding: 10px 0;
}
.subtitle {
  color: #949494;
}
.author {
  padding-right: 10px;
}
.meida {
  margin: 10px 0;
}
.ft {
  position: fixed;
  z-index: 999;
  background-color: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.5);
}
.look {
  padding: 10px;
}
.look_list {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}
.look_avatar {
  width: 30px;
  height: 30px;
  margin-right: 4px;
  border-radius: 50%;
}
</style>
