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
            <div class="zan-cell__bd">角色</div>
            <div class="zan-cell__ft">{{rolelist[user_info.role]}}</div>
          </div>
          <div v-for="(item,index) in user_info.department" :key="index" class="zan-cell">
            <div v-if="user_info.role=='2'" class="zan-cell__bd">科室</div>
            <div v-else-if="user_info.role=='3'" class="zan-cell__bd">代理科室-{{index+1}}</div>
            <div v-else class="zan-cell__bd">关注科室-{{index+1}}</div>
            <div class="zan-cell__ft">{{item.label}}</div>
          </div>
          <div v-if="user_info.role=='2'" class="zan-cell">
            <div class="zan-cell__bd">就职医院</div>
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
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { userDetail } from "@/utils/api";
import { mapGetters } from "vuex";
export default {
  components: {
    cHeader
  },
  data() {
    return {
      user_id: "",
      user_info: "",
      article: ""
    };
  },
  computed: {
    ...mapGetters(["rolelist", "genderlist"])
  },
  onLoad(option) {
    if (option.user_id) {
      this.user_id = option.user_id;
      this._initData();
    }
  },
  methods: {
    _initData() {
      this.user_info = "";
      userDetail({ user_id: this.user_id }).then(res => {
        this.user_info = res.data.userinfo;
        this.article = res.data.article;
      });
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
</style>
