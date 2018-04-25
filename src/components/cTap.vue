
<style scoped>
.tablist {
  position: relative;
  margin-top: 4px;
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


<template>
  <div class="tablist">
    <ZanTab v-bind="sublist" :componentId="'sublist'" :handleZanTabChange="menuChange"></ZanTab>
    <div class="tablist_list">
      <div v-for="(item,index) in sublist.list" v-if="item.id == sublist.selectedId" :key="index" class="tablist_list_item tablist_article">
        <div v-if="item.data.length" v-for="(x,i) in item.data" :key="x" @click="navigate(x._id)" class="tablist_article_item zan-hairline--bottom">
          <div class="tablist_article_cnt">
            <h3 class="tablist_article_title zan-ellipsis">{{x.title}}</h3>
            <div class="tablist_article_text zan-ellipsis--l2">{{x.pre_content}}</div>
            <div v-if="x.user_id" class="tablist_article_author">
              <img class="tablist_article_avatar" :src="x.user_id.avatar.imageURL" />
              <span>{{x.user_id.name}}</span>
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
import { getPaging } from "@/utils/api";
import ZanTab from "@/components/zan/tab";
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
   * @param {*} status //文章状态(默认为2) 0全部 1未审核 2已审核 3已删除
   */
  props: ["user_id", "department_key", "limit", "sort", "type", "status"],
  data() {
    return {
      sublist: {
        list: [
          { title: "日志", id: "sort1", sort: "1", data: [], last_id: "" },
          { title: "手术记录", id: "sort2", sort: "2", data: [], last_id: "" },
          { title: "科普文章", id: "sort3", sort: "3", data: [], last_id: "" }
        ],
        scroll: false,
        selectedId: "sort1"
      }
    };
  },
  mounted() {
    this._initData();
  },
  methods: {
    ...ZanTab.methods,
    async _initData(fn) {
      await this.getData("1");
      await this.getData("2");
      await this.getData("3");
    },
    refresh() {
      this._initData();
    },
    loadMore() {
      let api = this.sublist.selectedId;
      let num = api.match(/\d/)[0];
      let last_id = this.sublist.list[num - 1].last_id;
      if (last_id) {
        getPaging({
          article_id: last_id,
          limit: this.limit,
          sort: num.toString()
        }).then(res => {
          if (res.data.length) {
            res.data.forEach(item => {
              this.sublist.list[num - 1].data.push(item);
            });
            this.sublist.list[num - 1].last_id = res.data[0]._id;
          } else {
            this.sublist.list[num - 1].last_id = "";
            wx.showToast({
              title: "我也是有底线的",
              icon: "none"
            });
          }
        });
      } else {
        wx.showToast({
          title: "我也是有底线的",
          icon: "none"
        });
      }
    },
    getData(sort = "1") {
      return getPaging({
        user_id: this.user_id,
        limit: this.limit,
        sort
      }).then(res => {
        if (res.data.length) {
          this.sublist.list[sort - 1].data = res.data;
          this.sublist.list[sort - 1].last_id = res.data[0]._id;
          console.log(this.sublist.list[sort - 1].data);
        }
      });
    },
    navigate(_id) {
      wx.navigateTo({
        url: "/pages/article_detail/main?article_id=" + _id
      });
    },
    menuChange(e) {
      const { componentId, selectedId } = e;
      this[componentId].selectedId = selectedId;
    }
  }
};
</script>
