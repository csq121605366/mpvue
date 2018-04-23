<template>
  <div class="app">
    <c-header back fixed title="搜索"></c-header>
    <div class="container">
      <div class="search_wrap">
        <div class="search">
          <i class="search_icon iconfont icon-sousuo" type="search"></i>
          <input @input="search($event)" class="search_box" placeholder-class="placeholder" type="text" :placeholder="placeholder">
        </div>
      </div>
      <div class="search-list_wrap">
        <div class="zan-panel search-list">
          <div @click="cellClick(item)" v-for="(item,index) in list" :key="index" class="zan-cell search-item">
            <div class="zan-cell__bd">
              <div class="zan-cell__text">{{item.label}}</div>
              <div class="zan-cell__desc">{{item.city}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { hospitalSearch } from "@/utils/api";
import { debounce } from "@/utils";
export default {
  name: "search",
  components: {
    cHeader
  },
  onLoad(option) {
    option.type = "hospital";
    if (option.type) {
      if (option.type == "hospital") {
        this.placeholder = "搜索医院";
      }
      this.type = option.type;
    }
  },
  data() {
    return {
      placeholder: "搜索医生 / 科室 / 医院 / 症状 / 疾病",
      type: "",
      list_height: 0,
      list: [],
      last_id: "",
      key: "",
      list_item_height: 62
    };
  },
  onReachBottom() {
    this.loadMore();
  },
  methods: {
    search: debounce(function(e) {
      if (e.type == "input") {
        this.key = e.target.value;
        wx.showLoading({ mask: true });
        hospitalSearch({ key: this.key }).then(res => {
          this.list = res.data.list;
          this.last_id = res.data.last_id;
          wx.hideLoading();
        });
      }
    }, 600),
    loadMore() {
      if (this.last_id) {
        wx.showLoading({ mask: true });
        hospitalSearch({ key: this.key, last_id: this.last_id }).then(res => {
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
        });
      } else {
        wx.showToast({
          title: "我也是有底线的",
          icon: "none"
        });
      }
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
.placeholder {
  color: #a5a5a5;
  font-size: 14px;
}
.search_wrap {
  position: fixed;
  z-index: 10;
  width: 100%;
  box-sizing: border-box;
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
  padding-left: 10px;
  font-size: 16px;
  color: #2b2b2b;
}
.search-list_wrap {
  margin-top: 50px;
  position: relative;
  background-color: #fff;
}
.search-list {
  margin: 0;
}
.search-scroll {
  padding-top: 55px;
}
</style>
