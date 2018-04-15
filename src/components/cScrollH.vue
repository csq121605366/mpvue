
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


<template>
  <div class="tablist">
    <scroll-view class="tablist_scroll" scroll-x :scroll-into-view="tablist.scrollActiveId">
      <view class="tablist_scroll_item" :class="tablist.current==item?'tablist_scroll-active':''" v-for="(item,index) in 3" :key="index" :data-id="item" :id="'scroll-'+item" @click="handleScrollView_click">
        <view class="tablist_scroll_text">
          科室-{{item}}
        </view>
      </view>
    </scroll-view>
    <div class="tablist_list">
      <swiper class="tablist_list_wrap" :style="'height:'+tablist.height+'px'" :current="tablist.current" @animationfinish="handleSwiperChange">
        <block v-for="(item,index) in 3" :key="index">
          <swiper-item :id="'swiperItem-'+index" class="tablist_list_item tablist_article">
            <div v-for="(x,i) in 20" :key="x" data-num="20" class="tablist_article_item zan-hairline--bottom">
              <div class="tablist_article_cnt">
                <h3 class="tablist_article_title zan-ellipsis">想要饭菜美味又健康？试试这6个厨房好帮手房好帮手房好帮想要饭菜美味又健康？试试这6个厨房好帮手房好帮手房好帮手手</h3>
                <div class="tablist_article_text zan-ellipsis--l2">对于吃货来说，减肥路上的最大敌人就是各种美食诱对于吃货来说，减肥路上的最大敌人就是各种美食诱惑对于吃货来说，减肥路上的最大敌人就是各种美食诱惑惑</div>
                <div class="tablist_article_author">
                  <img class="tablist_article_avatar" src="http://temp.im/68x68/2bb5f5/fff" />
                  <span>健康之路</span>
                  <view class="tablist_article_tag">优质文章</view>
                  <view class="tablist_article_tag">优质文章</view>
                </div>
              </div>
              <div class="tablist_article_banner">
                <img class="tablist_article_img" src="http://temp.im/100x100/f39800/fff" alt="">
              </div>
            </div>
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      tablist: {
        current: 0,
        height: 0,
        scrollActiveId: ""
      }
    };
  },
  watch: {
    "tablist.current": function(newVal, oldVal) {
      this.calculateH(newVal);
    }
  },
  onReady() {
    this.$nextTick().then(res => {
      this.calculateH(0);
    });
  },
  methods: {
    calculateH(index) {
      //计算内容高度 然后设置swiper高度
      var query = wx.createSelectorQuery();
      let node = query
        .select("#swiperItem-" + index + "> ._div")
        .boundingClientRect();
      query.exec(res => {
        //res就是 所有标签为mjltest的元素的信息 的数组
        if (res[0]) {
          this.tablist.height = res[0].dataset.num * res[0].height + 10;
        }
      });
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
