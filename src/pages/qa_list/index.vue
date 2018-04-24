<template>
  <div class="app">
    <c-header back fixed title="问题解答"></c-header>
    <div class="container">
      <div class="hd">
        <div class="search_wrap">
          <div class="search">
            <i class="search_icon iconfont icon-sousuo" type="search"></i>
            <input @input="search($event)" v-model="searchTxt" class="search_box" placeholder-class="placeholder" type="text" :placeholder="placeholder">
            <i v-if="searchTxt" @click="searchTxt=''" class="search_icon iconfont icon-guanbi"></i>
          </div>
        </div>
      </div>
      <div class="bd">
        <ul v-if="qalist.length" class="qalist">
          <li v-for="(item,index) in qalist" @click="navigate(item._id)" class="qalist_item zan-hairline--bottom" :key="index">
            <h3 class="qalist_title zan-ellipsis">问：{{item.title}}</h3>
            <p class="qalist_precontent zan-ellipsis">
              {{item.content}}
            </p>
            <div class="qalist_info">
              <i v-if="item.qa_id.length" class="qalist_mark iconfont icon-biaoji"> 已回复</i>健康无忧 {{item.created}}</div>
          </li>
        </ul>
        <div class="qalist_tip" v-else>
          <i class="qalist_tip_icon iconfont icon-pinglun"></i>
          <p>还没有提问</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { mapGetters } from "vuex";
import { qaList } from "@/utils/api";
import { formatTime, debounce } from "@/utils";
export default {
  components: {
    cHeader
  },
  data() {
    return {
      searchTxt: "",
      qalist: [],
      last_id: "",
      key: ""
    };
  },
  computed: {
    ...mapGetters(["id"])
  },
  methods: {
    _initData() {
      qaList({ user_id: this.id }).then(res => {
        if (res.data) {
          res.data.forEach((element, index) => {
            res.data[index].created = formatTime(
              new Date(element.meta.created)
            );
          });
          this.last_id = res.data[res.data.length - 1]._id;
          this.qalist = res.data;
        }
      });
    },
    navigate(_id) {
      wx.navigateTo({
        url:''
      })
    },
    search: debounce(function(e) {
      if (e.type == "input") {
        this.key = e.target.value;
        wx.showLoading({ mask: true });
        qaList({ user_id: this.id, key: this.key }).then(res => {
          res.data.forEach((element, index) => {
            res.data[index].created = formatTime(
              new Date(element.meta.created)
            );
          });
          this.last_id = res.data[res.data.length - 1]._id;
          this.qalist = res.data;
          wx.hideLoading();
        });
      }
    }, 600)
  },
  onReachBottom(e) {
    if (this.last_id) {
      qaList({ user_id: this.id, key: this.key, last_id: this.last_id }).then(
        res => {
          if (res.data.length) {
            res.data.forEach((element, index) => {
              element.created = formatTime(new Date(element.meta.created));
              this.qalist.push(element);
            });
            this.last_id = res.data[res.data.length - 1]._id;
          } else {
            this.last_id = "";
            wx.showToast({
              title: "我也是有底线的",
              icon: "none"
            });
          }
        }
      );
    } else {
      wx.showToast({
        title: "我也是有底线的",
        icon: "none"
      });
    }
  },
  onShow() {
    this._initData();
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
  padding: 10px;
  color: #2bb5f5;
}
.search_box {
  flex: 1 1 auto;
  padding-left: 10px;
  font-size: 16px;
  color: #2b2b2b;
}
.bd {
  position: relative;
  padding: 60px 10px 0;
  background-color: #fff;
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

