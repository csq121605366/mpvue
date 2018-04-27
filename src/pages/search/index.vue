<template>
  <div class="app">
    <c-header back fixed title="搜索"></c-header>
    <div class="container">
      <div class="search_wrap">
        <div class="search">
          <i class="search_icon iconfont icon-sousuo" type="search"></i>
          <input @input="search($event)" v-model="searchTxt" class="search_box" placeholder-class="placeholder" type="text" :placeholder="placeholder">
          <i v-if="searchTxt" @click="searchClose" class="search_icon iconfont icon-guanbi"></i>
        </div>
      </div>
      <div class="search-list_wrap">
        <div v-if="type=='hospital'" class="zan-panel search-list">
          <div @click="cellClick(item)" v-for="(item,index) in list" :key="index" class="zan-cell search-item">
            <div class="zan-cell__bd">
              <div class="zan-cell__text">{{item.label}}</div>
              <div class="zan-cell__desc">{{item.city}}</div>
            </div>
          </div>
        </div>
        <div v-if="type=='qa'" class="user_list">
          <div v-for="(item,index) in list" @click="navigateTo('/pages/qa_detail/main?qa_id='+item._id)" class="qalist_item zan-hairline--bottom" :key="index">
            <h3 class="qalist_title zan-ellipsis">问：{{item.title}}</h3>
            <p class="qalist_precontent zan-ellipsis">
              {{item.content}}
            </p>
            <div class="qalist_info">
              <i v-if="item.answer.length" class="qalist_mark iconfont icon-biaoji"> 已回复</i>健康无忧 {{item.created}}</div>
          </div>
        </div>
        <div v-if="type=='user'" class="user_list">
          <div v-for="(item,index) in list" :key="index"  @click="navigateTo('/pages/user_detail/main?user_id='+item._id)" class="user_item zan-hairline--bottom">
            <div class="user_avatar">
              <img :src="item.avatar?item.avatar.imageURL:item.avatarUrl+'-webp'" alt="">
            </div>
            <div class="user_info">
              <div class="user_info_a">
                <span class="pr10">{{item.name}}</span>
                <span>{{item.title}}</span>
              </div>
              <div class="user_info_b">
                <span class="pr10">{{item.department[0].label}}</span>
                <span>{{item.hospital.label}}</span>
              </div>
              <div class="user_info_c zan-ellipsis">
                {{item.description}}
              </div>
            </div>
          </div>
        </div>
        <div v-if="type=='article'" class="tablist_article_list">
          <div v-for="(item,i) in list" :key="i" @click="navigateTo('/pages/article_detail/main?article_id='+item._id)" class="tablist_article_item zan-hairline--bottom">
            <div class="tablist_article_cnt">
              <h3 class="tablist_article_title zan-ellipsis">{{item.title}}</h3>
              <div class="tablist_article_text zan-ellipsis--l2">{{item.pre_content}}</div>
              <div v-if="item.user_id" class="tablist_article_author">
                <img class="tablist_article_avatar" :src="item.user_id.avatar?item.user_id.avatar.imageURL:item.user_id.avatarUrl" />
                <span>{{item.user_id.name}}</span>
                <view class="tablist_article_tag">{{item.illness_name}}</view>
                <view class="tablist_article_tag">{{item.illness_time}}</view>
              </div>
            </div>
            <div class="tablist_article_banner">
              <img v-if="item.images.length" class="tablist_article_img" :src="item.images[0].imageURL" alt="">
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { hospitalSearch, search } from "@/utils/api";
import { debounce } from "@/utils";
import { mapGetters } from "vuex";
export default {
  name: "search",
  components: {
    cHeader
  },
  onLoad(option) {
    if (option.type) {
      if (option.type == "hospital") {
        this.placeholder = "搜索医院";
      }
      this.type = option.type;
    }
  },
  data() {
    return {
      placeholder: "搜索问题 / 资讯 / 医生",
      type: "",
      list_height: 0,
      list: [],
      last_id: "",
      list_item_height: 62,
      searchTxt: ""
    };
  },
  onReachBottom() {
    this.loadMore();
  },
  methods: {
    search: debounce(function() {
      if (this.type == "hospital") {
        hospitalSearch({ key: this.searchTxt }).then(res => {
          this.list = res.data.list;
          this.last_id = res.data.last_id;
        });
      } else {
        if (this.searchTxt != "") {
          search({ key: this.searchTxt }).then(res => {
            this.list = res.data.list;
            this.last_id = res.data.last_id;
            this.type = res.data.type;
          });
        }
      }
    }, 600),
    loadMore() {
      if (this.last_id) {
        wx.showLoading({ mask: true });
        hospitalSearch({ key: this.searchTxt, last_id: this.last_id }).then(
          res => {
            if (Array.isArray(res.data.list)) {
              res.data.list.forEach(item => {
                this.list.push(item);
              });
              this.last_id = res.data.last_id;
            } else {
              wx.showToast({
                title: "我也是有底线的",
                icon: "none"
              });
            }
            wx.hideLoading();
          }
        );
      } else {
        wx.showToast({
          title: "我也是有底线的",
          icon: "none"
        });
      }
    },
    searchClose() {
      this.searchTxt = "";
      this.list = "";
    },
    navigateTo(url) {
      wx.navigateTo({ url });
    },
    cellClick(item) {
      let pages = getCurrentPages(); //当前页面
      let prevPage = pages[pages.length - 2]; //上一页面
      prevPage.setData({
        //直接给上移页面赋值
        hospital: item
      });
      wx.navigateBack();
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
}

.search_wrap {
  background-color: #2bb5f5;
  padding: 10px 20px 10px;
}
.search {
  position: relative;
  height: 35px;
  background-color: #fff;
  border-radius: 35px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.search_icon {
  padding: 0 10px;
  color: #2bb5f5;
}
.search_box {
  flex: 1 1 auto;
  font-size: 13px;
  color: #a5a5a5;
}

.qalist_item {
  padding: 4px 0 6px;
  position: relative;
}
.qalist_mark {
  position: absolute;
  left: 0;
  bottom: 6px;
  color: #2bb5f5;
  font-size: 12px;
}
.qalist_title {
  height: 20px;
}
.qalist_tip {
  text-align: center;
  padding-top: 40px;
  color: #999;
}
.qalist_tip_icon {
  display: inline-block;
  font-size: 60px;
}
.qalist_precontent {
  font-size: 12px;
  line-height: 18px;
  max-height: 18px;
  height: 18px;
  color: #999;
  padding: 4px 0 4px;
}
.qalist_info {
  text-align: right;
  font-size: 12px;
  color: #999;
}

.user_list {
  padding: 10px;
}
.user_item {
  display: flex;
  flex-flow: row nowrap;
  padding: 10px 0;
}
.user_avatar {
  flex: 0 1 60px;
}
.user_avatar ._img {
  height: 60px;
  max-width: 60px;
  display: block;
}
.user_info {
  flex: 1 1 auto;
  color: #666;
  padding-left: 20px;
  line-height: 24px;
}
.user_info_name {
  font-size: 14px;
  color: #333;
}
.pr10 {
  padding-right: 10px;
}
.user_info_b {
  color: #999;
  font-size: 12px;
  line-height: 20px;
}
.user_info_c {
  font-size: 12px;
  max-width: 260px;
  line-height: 20px;
}
.tablist_article_list {
  padding: 0 10px;
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
