
<style scoped>
.tablist {
  position: relative;
  margin-top: 4px;
}

.tablist_scroll {
  width: 100%;
  white-space: nowrap;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.tablist_scroll_item {
  height: 44px;
  min-width: 40px;
  padding: 0 10px;
  text-align: center;
  display: inline-block;
  line-height: 0;
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
</style>


<template>
  <div class="tablist">
    <scroll-view class="tablist_scroll" scroll-x :scroll-into-view="tablist.scrollActiveId">
      <view class="tablist_scroll_item" :class="tablist.current==index?'tablist_scroll-active':''" v-for="(item,index) in sublist" :key="index" :data-id="index" :id="'scroll-'+index" @click="handleScrollView_click">
        <view class="tablist_scroll_text">
          {{item.label}}
        </view>
      </view>
    </scroll-view>
    <div class="tablist_list">
      <swiper class="tablist_list_wrap" :style="'height:'+tablist.height+'px'" :current="tablist.current" @animationfinish="handleSwiperChange">
        <block v-for="(item,index) in sublist" :key="index">
          <swiper-item :id="'swiperItem-'+index" class="tablist_list_item tablist_article">
            <div v-for="(x,i) in item.data" :key="x" class="tablist_article_item zan-hairline--bottom">
              <div class="tablist_article_cnt">
                <h3 class="tablist_article_title zan-ellipsis">{{x.title}}</h3>
                <div class="tablist_article_text zan-ellipsis--l2">{{x.pre_content}}</div>
                <div class="tablist_article_author">
                  <img class="tablist_article_avatar" :src="x.user_id.avatar.imageURL" />
                  <span>{{x.user_id.name}}</span>
                  <view class="tablist_article_tag">{{x.illness_name}}</view>
                  <view class="tablist_article_tag">{{x.illness_time}}</view>
                </div>
              </div>
              <div class="tablist_article_banner">
                <img class="tablist_article_img" :src="x.images.length?x.images[0].imageURL:x.user_id.avatar.imageURL" alt="">
              </div>
            </div>
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>
</template>

<script>
import { getPaging } from "@/utils/api";
export default {
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
      tablist: {
        current: 0,
        height: 0,
        scrollActiveId: ""
      },
      sublist: [
        { label: "日志", sort: "1", data: [] },
        { label: "手术记录", sort: "2", data: [] },
        { label: "科普文章", sort: "3", data: [] }
      ]
    };
  },
  watch: {
    "tablist.current": function(newVal, oldVal) {
      this.calculateH(newVal);
    }
  },
  mounted() {
    this._initData();
  },
  methods: {
    async _initData(fn) {
      await this.sort_1_data().then(() => {
        this.$nextTick(() => {
          this.calculateH(0);
        });
      });
      await this.sort_2_data();
      await this.sort_3_data();
    },
    refresh() {
      this._initData();
    },
    sort_1_data() {
      return getPaging({
        user_id: this.user_id,
        limit: this.limit,
        sort: "1"
      }).then(res => {
        this.sublist[0].data = res.data;
      });
    },
    sort_2_data() {
      return getPaging({
        user_id: this.user_id,
        limit: this.limit,
        sort: "2"
      }).then(res => {
        this.sublist[1].data = res.data;
      });
    },
    sort_3_data() {
      return getPaging({
        user_id: this.user_id,
        limit: this.limit,
        sort: "3"
      }).then(res => {
        this.sublist[2].data = res.data;
      });
    },
    calculateH(index) {
      let num = this.sublist[index].data.length;
      this.tablist.height = num * 126 + 10;
    },
    handleScrollView_click(e) {
      this.tablist.current = e.currentTarget.dataset.id;
      this.tablist.scrollActiveId = "scroll-" + e.currentTarget.dataset.id;
    },
    handleSwiperChange(e) {
      if (e.target.source == "touch") {
        this.tablist.current = e.target.current;
        this.tablist.scrollActiveId = "scroll-" + e.target.current;
      }
    }
  }
};
</script>
