<template>
  <div class="app">
    <c-header back fixed title="详情"></c-header>
    <div class="container">
      <div class="myinfo">
        <div v-if="user_info" class="zan-panel">
          <div class="zan-cell">
            <div class="zan-cell__ft avatar"><img :src="user_info.avatar?user_info.avatar.imageURL:user_info.avatarUrl" alt=""></div>
          </div>
          <div class="zan-cell">
            <div class="zan-cell__bd">姓名</div>
            <div class="zan-cell__ft">{{user_info.name}}</div>
          </div>
          <div class="zan-cell">
            <div class="zan-cell__bd">手机号</div>
            <div class="zan-cell__ft">{{user_info.phone}}</div>
          </div>
          <div class="zan-cell">
            <div class="zan-cell__bd">角色</div>
            <div class="zan-cell__ft">{{rolelist[user_info.role]}}</div>
          </div>
          <div v-for="(item,index) in user_info.department" :key="index" class="zan-cell">
            <div v-if="user_info.role=='2'" class="zan-cell__bd">科室</div>
            <div v-else-if="user_info.role=='3'" class="zan-cell__bd">代理科室-{{index+1}}</div>
            <div v-else class="zan-cell__bd">关注科室-{{index+1}}</div>
            <div class="zan-cell__ft">{{item.label}}</div>
          </div>
          <div v-if="user_info.hospital" class="zan-cell">
            <div v-if="user_info.role=='2'" class="zan-cell__bd">就职医院</div>
            <div v-else>服务医院</div>
            <div class="zan-cell__ft">{{user_info.hospital.label}}</div>
          </div>
          <div v-if="user_info.role=='2'" class="zan-cell">
            <div class="zan-cell__bd">职称</div>
            <div class="zan-cell__ft">{{user_info.title}}</div>
          </div>
          <div v-if="user_info.role=='2'" class="zan-cell">
            <div class="zan-cell__bd">简介</div>
            <div class="zan-cell__ft">{{user_info.description}}</div>
          </div>
        </div>
      </div>
      <div v-if="user_info.role=='2'" class="tablist">
        <ZanTab v-bind="sublist" :componentId="'sublist'" :handleZanTabChange="menuChange"></ZanTab>
        <div class="tablist_list">
          <div v-for="(item,index) in sublist.list" v-if="item.id == sublist.selectedId" :key="index" class="tablist_list_item tablist_article">
            <div v-if="item.data.length" v-for="(x,i) in item.data" :key="x" @click="navigate(x)" class="tablist_article_item zan-hairline--bottom">
              <div class="tablist_article_cnt">
                <h3 class="tablist_article_title zan-ellipsis">{{x.title}}</h3>
                <div class="tablist_article_text zan-ellipsis--l2">{{x.pre_content}}</div>
                <div v-if="x.user_id" class="tablist_article_author">
                  <img class="tablist_article_avatar" :src="x.user_id.avatar.imageURL" />
                  <span>{{x.user_id.name}}</span>
                  <view class="tablist_article_tag">{{articleStatusList[x.status]}}</view>
                  <view class="tablist_article_tag">{{x.illness_name}}</view>
                  <view class="tablist_article_tag">{{x.illness_time}}</view>
                </div>
              </div>
              <div class="tablist_article_banner">
                <img v-if="x.images.length" class="tablist_article_img" :src="x.images[0].imageURL" alt="">
              </div>
            </div>
            <div class="none" v-if="!item.data.length">没有内容</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { userDetail, articleList } from "@/utils/api";
import { mapGetters } from "vuex";
import ZanTab from "@/components/zan/tab";
export default {
  components: {
    cHeader,
    ZanTab
  },
  data() {
    return {
      user_id: "",
      user_info: "",
      article: "",
      sublist: {
        list: [
          { title: "日志记录", id: "sort1", sort: "1", data: [], last_id: "" },
          { title: "手术记录", id: "sort2", sort: "2", data: [], last_id: "" },
          { title: "科普文章", id: "sort3", sort: "3", data: [], last_id: "" }
        ],
        scroll: false,
        selectedId: "sort1"
      }
    };
  },
  computed: {
    ...mapGetters(["rolelist", "genderlist", "articleStatusList"])
  },
  onLoad(option) {
    if (option.user_id) {
      this.user_id = option.user_id;
      this._initData();
    }
  },
  methods: {
    ...ZanTab.methods,
    async _initData() {
      wx.showLoading({ title: "数据加载中...", mask: true });
      this.user_info = "";
      userDetail({ user_id: this.user_id }).then(res => {
        this.user_info = res.data.userinfo;
        if (this.user_info.role == "2") {
          this.getData("1");
          this.getData("2");
          this.getData("3");
        }
        this.article = res.data.article;
        wx.hideLoading();
      });
    },
    loadMore() {
      wx.showLoading({ title: "数据加载中...", mask: true });
      let api = this.sublist.selectedId;
      let num = api.match(/\d/)[0];
      let last_id = this.sublist.list[num - 1].last_id;
      if (last_id) {
        articleList({
          user_id: this.user_id,
          article_id: last_id,
          limit: this.limit,
          status: this.status,
          sort: num.toString()
        }).then(res => {
          if (res.data.length) {
            res.data.forEach(item => {
              this.sublist.list[num - 1].data.push(item);
            });
            this.sublist.list[num - 1].last_id = res.data[0]._id;
          } else {
            this.sublist.list[num - 1].last_id = "";
          }
          wx.hideLoading();
        });
      }
    },
    getData(sort = "1") {
      let target = this.sublist.list[sort - 1];
      target.data = [];
      target.last_id = "";
      let last_id = target.last_id;
      articleList({
        user_id: this.user_id,
        article_id: last_id,
        limit: this.limit,
        status: this.status,
        sort
      }).then(res => {
        if (res.data.length) {
          target.data = res.data;
          target.last_id = res.data[0]._id;
        }
      });
    },
    navigate(item) {
      if (item.status == "2") {
        wx.navigateTo({
          url: "/pages/article_detail/main?article_id=" + item._id
        });
      } else if (item.status == "0") {
        wx.navigateTo({
          url: "/pages/article/main?article_id=" + item._id
        });
      } else {
        wx.showToast({
          title: "该文章正在审核...",
          mask: true
        });
      }
    },
    menuChange(e) {
      const { componentId, selectedId } = e;
      this[componentId].selectedId = selectedId;
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #fff;
}
.avatar ._img {
  width: 60px;
  height: 60px;
  border-radius: 6px;
}

.zan-cell__bd {
  min-width: 60px;
  flex: 1;
}
.zan-cell__ft {
  text-align: left;
  word-break: break-all;
}

.tablist {
  position: relative;
  margin-top: 4px;
  margin-bottom: 10px;
}

.tablist_list {
  margin-top: 8px;
  position: relative;
  width: auto;
}

.tablist_list_item {
  width: 100%;
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
  height: 30px;
  word-wrap: break-word;
}
.tablist_article_text {
  width: 280px;
  font-size: 12px;
  line-height: 18px;
  height: 36px;
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
.none {
  text-align: center;
  padding: 10px 0;
  font-size: 16px;
}
</style>
