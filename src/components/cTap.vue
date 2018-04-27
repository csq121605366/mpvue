
<style scoped>
.tablist {
  position: relative;
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
.toptap {
  color: #fff;
  background-color: #2bb5f5;
}

.toptap-tap__ul {
  display: flex;
  padding: 10px 0;
  flex-flow: row nowrap;
  justify-content: space-around;
}
.toptap-tap__li {
  text-align: center;
  flex: 1 1 auto;
  font-size: 12px;
}
.toptap-tap__li.active {
  color: #999;
}
.toptap-tap__li .iconfont {
  font-size: 20px;
}
</style>


<template>
  <div class="tablist">
    <div class="toptap">
      <div class="toptap-tap__ul">
        <div v-for="(item,index) in sublist.list" :class="item.id == sublist.selectedId?'active':''" @click="menuChange(item)" class="toptap-tap__li" :key="index">
          <i class="iconfont" :class="item.icon"></i>
          <text>{{item.title}}</text>
        </div>
      </div>
    </div>
    <div class="tablist_list">
      <div v-for="(item,index) in sublist.list" v-if="item.id == sublist.selectedId" :key="index" class="tablist_list_item tablist_article">
        <div v-if="item.data.length" v-for="(x,i) in item.data" :key="x" @click="navigate(x)" class="tablist_article_item zan-hairline--bottom">
          <div class="tablist_article_cnt">
            <h3 class="tablist_article_title zan-ellipsis">{{x.title}}</h3>
            <div class="tablist_article_text zan-ellipsis--l2">{{x.pre_content}}</div>
            <div v-if="x.user_id" class="tablist_article_author">
              <img class="tablist_article_avatar" :src="x.user_id.avatar?x.user_id.avatar.imageURL:x.user_id.avatarUrl" />
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
</template>

<script>
import { articlePaging, articleList } from "@/utils/api";
import ZanTab from "@/components/zan/tab";
import { mapGetters } from "vuex";

export default {
  components: {
    ZanTab
  },
  /**
   * 实现分页功能
   * @param {*} _id 文章id(如果不提供表示从头开始提供)
   * @param {*} user_id 用户id
   * @param {*} department_key 文章关联科室的key
   * @param {*} limit 文章间隔(默认为10条)
   * @param {*} sort //文章分类(默认为1)0全部 1日志 2手术记录 3科普文章
   * @param {*} type  //文章展示模式 0全部 1公开 2仅好友查看 3私有
   * @param {*} status //文章状态(数组形式) 0全部 1未审核 2已审核 3已删除
   */
  props: [
    "user_id",
    "department_key",
    "limit",
    "sort",
    "type",
    "status",
    "articleList"
  ],
  data() {
    return {
      sublist: {
        list: [
          {
            title: "日志记录",
            icon: "icon-ziliao",
            id: "sort1",
            sort: "1",
            data: [],
            last_id: ""
          },
          {
            title: "手术记录",
            icon: "icon-ziliao",
            id: "sort2",
            sort: "2",
            data: [],
            last_id: ""
          },
          {
            title: "科普文章",
            icon: "icon-ziliao",
            id: "sort3",
            sort: "3",
            data: [],
            last_id: ""
          }
        ],
        scroll: false,
        selectedId: "sort1"
      }
    };
  },
  computed: {
    ...mapGetters(["articleStatusList", "role"])
  },
  onLoad() {
    this._initData();
  },
  methods: {
    ...ZanTab.methods,
    async _initData(fn) {
      await this.getData("1");
      this.getData("2");
      this.getData("3");
    },
    refresh() {
      this._initData();
    },
    func() {
      if (this.articleList && this.role != "0") {
        return articleList;
      } else {
        return articlePaging;
      }
    },
    loadMore() {
      let api = this.sublist.selectedId;
      let num = api.match(/\d/)[0];
      let last_id = this.sublist.list[num - 1].last_id;
      if (last_id) {
        this.func()({
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
        });
      }
    },
    getData(sort = "1") {
      this.sublist.list[sort - 1].data = [];
      this.sublist.list[sort - 1].last_id = "";
      return this.func()({
        user_id: this.user_id,
        limit: this.limit,
        status: this.status,
        sort
      })
        .then(res => {
          if (res.data.length) {
            this.sublist.list[sort - 1].data = res.data;
            this.sublist.list[sort - 1].last_id = res.data[0]._id;
          }
        })
        .catch(res => {
          //如果用户重置了系统这里进行首页页面更新
          setTimeout(() => {
            this.refresh();
          }, 800);
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
      this.sublist.selectedId = e.id;
      // const { componentId, selectedId } = e;
      // this[componentId].selectedId = selectedId;
      // let num = selectedId.match(/\d/)[0];
      // if (!this.sublist.list[num - 1].data.length) {
      //   this.getData(num + "");
      // }
    }
  }
};
</script>
