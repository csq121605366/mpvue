<template>
  <div class="app">
    <c-header fixed title="问诊"></c-header>
    <div class="container">
      <!-- 首页顶部搜索和链接 -->
      <div class="qa">
        <div class="link">
          <div v-if="role=='1'||role=='0'" class="link_item zan-hairline--bottom">
            <div class="link_item_logo iconfont icon-liuyan"></div>
            <nav @click="navigateTo('/pages/qa_create/main')" class="link_item_txt">
              <h3 class="link_item_title">快速提问</h3>
              <p class="link_item_subtitle">描述症状邀请科室所有医生解答</p>
              <div class="zan-arrow"></div>
            </nav>
          </div>
          <div v-if="role=='1'||role=='0'" class="link_item zan-hairline--bottom">
            <div class="link_item_logo iconfont icon-tuandui"></div>
            <nav @click="navigateTo('/pages/user_list/main')" class="link_item_txt">
              <h3 class="link_item_title">查医生</h3>
              <p class="link_item_subtitle">快速了解科室医生</p>
              <div class="zan-arrow"></div>
            </nav>
          </div>
          <div v-if="role=='2'||role=='3'" class="link_item zan-hairline--bottom">
            <div class="link_item_logo iconfont icon-tuandui"></div>
            <nav @click="navigateTo('/pages/qa_list/main')" class="link_item_txt">
              <h3 class="link_item_title">问诊列表</h3>
              <p class="link_item_subtitle">科室相关问题列表</p>
              <div class="zan-arrow"></div>
            </nav>
          </div>
          <div v-if="role=='2'||role=='3'" class="link_item zan-hairline--bottom">
            <div class="link_item_logo iconfont icon-tuandui"></div>
            <nav @click="navigateTo('/pages/user_list/main')" class="link_item_txt">
              <h3 class="link_item_title">科室成员</h3>
              <p class="link_item_subtitle">科室相关成员</p>
              <div class="zan-arrow"></div>
            </nav>
          </div>
        </div>
        <div class="qa_dynamic">
          <div class="qa_menu">
            <span>健康问答动态</span>
            <div @click="qaRefresh" class="qa_refresh">换一批
              <i class="iconfont icon-shuaxin"></i>
            </div>
          </div>
          <ul v-if="list&&list.length" class="qalist">
            <li v-for="(item,index) in list" @click="navigateTo('/pages/qa_detail/main?qa_id='+item._id)" class="qalist_item zan-hairline--bottom" :key="index">
              <h3 class="qalist_title zan-ellipsis">问：{{item.title}}</h3>
              <p class="qalist_precontent zan-ellipsis">
                {{item.content}}
              </p>
              <div class="qalist_info">
                <i v-if="item.answer_count" class="qalist_mark iconfont icon-biaoji"> 已回复</i>健康无忧 {{item.created}}</div>
            </li>
          </ul>
          <div class="qalist_tip" v-else>
            <i class="qalist_tip_icon iconfont icon-pinglun"></i>
            <p>还没有提问</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { mapGetters } from "vuex";
import { qaSearch } from "@/utils/api";
export default {
  components: {
    cHeader
  },
  data() {
    return {
      list: [],
      last_id: ""
    };
  },
  computed: {
    ...mapGetters(["role", "status", "department"])
  },
  methods: {
    getData() {
      let param = { limit: 4 };
      if (this.last_id) {
        param = Object.assign({}, param, { last_id: this.last_id });
      }
      qaSearch(param).then(res => {
        this.list = res.data;
        let last = this.list[this.list.length - 1];
        this.last_id = last ? last._id : "";
      });
    },
    qaRefresh() {
      if (this.last_id) {
        this.getData();
      } else {
        wx.showToast({
          title: "没有更多了,下拉可刷新",
          icon: "none"
        });
      }
    },
    navigateTo(url) {
      wx.navigateTo({
        url: url
      });
    }
  },
  onPullDownRefresh() {
    this.last_id = "";
    this.getData();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 800);
  },
  onLoad() {
    this.last_id = "";
    this.getData();
  },
  onShow() {
    //病人进来为提问页面 医生进来为问题列表
    if (this.role == "0") {
      wx.showToast({
        title: "请完善资料",
        icon: "none",
        mask: true,
        success: function() {
          setTimeout(() => {
            wx.switchTab({
              url: "/pages/my/main"
            });
          }, 800);
        }
      });
    } else if (this.role != "1" && this.status == "1") {
      wx.showToast({
        title: "请等待审核完成",
        icon: "none",
        mask: true,
        success: function() {
          setTimeout(() => {
            wx.switchTab({ url: "/pages/my/main" });
          }, 800);
        }
      });
    }
  }
};
</script>

<style scpoed>
.link {
  padding: 10px;
  background-color: #fff;
}
.link_item {
  padding: 20px 10px;
  display: flex;
  align-items: center;
}
.link_item_logo {
  flex: 0 1 60px;
  font-size: 30px;
  color: #2bb5f5;
}

.link_item_txt {
  flex: 1;
  position: relative;
}
.link_item_title {
  font-size: 16px;
  line-height: 22px;
}
.link_item_subtitle {
  font-size: 12px;
  line-height: 18px;
  color: #999;
}

.qa_dynamic {
  padding: 0 20px;
  border-top: 10px solid #eaeaea;
}
.qa_menu {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  padding: 10px 0;
  font-size: 16px;
}
.qa_refresh {
  font-size: 14px;
  color: #2bb5f5;
  cursor: pointer;
}
.qa_refresh .iconfont {
  display: inline-block;
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
</style>
