<template>
  <div class="app">
    <c-header back fixed title="文章详情"></c-header>
    <div class="container">
      <div v-if="article" class="detail">
        <div class="hd">
          <h1 class="title">{{article.title}}</h1>
          <p class="subtitle">科室：
            <span class="author">{{article.department.label}}</span>类型：
            <span class="author">{{sortList[article.sort]}}</span>
          </p>
          <p class="subtitle">作者：
            <span class="author">{{article.author}}</span>{{article.created}}</p>
        </div>
        <div class="cnt">
          <rich-text class="richText" :nodes="article.content"></rich-text>
          <ul v-if="article.videos&&article.videos.length" class="meida">
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
import { mapGetters } from "vuex";
export default {
  components: {
    cHeader
  },
  data() {
    return {
      article_id: "",
      article: ""
    };
  },
  computed: {
    ...mapGetters(["sortList"])
  },
  onLoad: function(option) {
    if (option.article_id) {
      this.article_id = option.article_id;
      this._initData();
    } else {
      wx.redirectTo({
        url: "/pages/index/main"
      });
    }
  },
  methods: {
    _initData() {
      this.article = "";
      getDetail({ article_id: this.article_id }).then(res => {
        let data = res.data;
        data.created = formatTime(new Date(data.meta.created));
        data.lookedNum = data.looked.length;
        data.looked = data.looked.slice(0, 5);
        data.content = data.content.replace(
          /\<img/gi,
          '<img style="max-width:100%;height:auto" '
        );
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
  padding-bottom: 60px;
}
.title {
  font-size: 20px;
  text-align: center;
  padding: 10px 0;
}
.subtitle {
  color: #949494;
  padding: 4px 0;
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
.richText {
  word-wrap: break-word;
}
</style>
