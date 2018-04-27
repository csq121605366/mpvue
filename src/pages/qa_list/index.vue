<template>
  <div class="app">
    <c-header back fixed title="问题解答"></c-header>
    <div class="container">
      <div class="hd">
        <div class="search_wrap">
          <div class="search">
            <i class="search_icon iconfont icon-sousuo" type="search"></i>
            <input @input="search($event)" v-model="searchTxt" class="search_box" placeholder-class="placeholder" type="text" placeholder="搜索问题标题 / 疾病名称 / 相关内容">
            <i v-if="searchTxt" @click="searchClose" class="search_icon iconfont icon-guanbi"></i>
          </div>
        </div>
      </div>
      <div class="bd">
        <ul v-if="qalist&&qalist.length" class="qalist">
          <li v-for="(item,index) in qalist" @click="navigateTo(item._id)" class="qalist_item zan-hairline--bottom" :key="index">
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
          <p v-if="role=='1'">还没有提问</p>
          <p v-else>还没有回答</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { mapGetters } from "vuex";
import { qaSearch } from "@/utils/api";
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
    ...mapGetters(["id", "role"])
  },
  methods: {
    navigateTo(_id) {
      wx.navigateTo({
        url: "/pages/qa_detail/main?qa_id=" + _id
      });
    },
    getData(param, flag = false) {
      let data;
      if (this.type) {
        data = Object.assign({ user_id: this.id }, param);
      } else {
        data = Object.assign({}, param);
      }
      qaSearch(data).then(res => {
        if (res.data && res.data.length) {
          res.data.forEach((element, index) => {
            res.data[index].created = formatTime(
              new Date(element.meta.created)
            );
            if (flag) {
              this.qalist.push(element);
            }
          });
          if (!flag) {
            this.qalist = res.data;
          }
          this.last_id = res.data[res.data.length - 1]._id;
        } else {
          this.last_id = "";
          if (!flag) {
            this.qalist = [];
          }
        }
      });
    },
    search: debounce(function(e) {
      if (e.type == "input") {
        if (this.searchTxt) {
          this.getData({ key: this.searchTxt });
        } else {
          this.getData();
        }
      }
    }, 600),
    searchClose() {
      this.searchTxt = "";
      this.getData();
    }
  },
  onReachBottom(e) {
    if (this.last_id) {
      this.getData({ last_id: this.last_id }, true);
    }
  },
  onLoad(options) {
    //type=='my'表示我的问题和回答 type=='all'表示相关科室的问答 如果传user_id则只查本人问
    if (options && options.type == "my") {
      this.type = options.type;
    }
    this.getData();
  }
};
</script>

<style scoped>
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
  font-size: 13px;
  color: #a5a5a5;
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

