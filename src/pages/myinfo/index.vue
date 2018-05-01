<template>
  <div class="app">
    <c-header back fixed title="我的信息"></c-header>
    <div class="container">
      <div class="myinfo">
        <div class="zan-panel">
          <div class="zan-cell">
            <div class="zan-cell__bd">头像</div>
            <div class="zan-cell__ft avatar"><img :src="avatar?avatar.imageURL:avatarUrl" alt=""></div>
          </div>
          <div class="zan-cell">
            <div class="zan-cell__bd">姓名</div>
            <div class="zan-cell__ft">{{name}}</div>
          </div>
          <div class="zan-cell">
            <div class="zan-cell__bd">性别</div>
            <div class="zan-cell__ft">{{genderlist[gender]}}</div>
          </div>
          <div class="zan-cell">
            <div class="zan-cell__bd">角色</div>
            <div class="zan-cell__ft">{{rolelist[role]}}</div>
          </div>
          <div v-for="(item,index) in department" :key="index" class="zan-cell">
            <div v-if="role=='2'" class="zan-cell__bd">科室</div>
            <div v-else-if="role=='3'" class="zan-cell__bd">代理科室-{{index+1}}</div>
            <div v-else class="zan-cell__bd">关注科室-{{index+1}}</div>
            <div class="zan-cell__ft">{{item.label}}</div>
          </div>
          <div v-if="role=='2'" class="zan-cell">
            <div class="zan-cell__bd">就职医院</div>
            <div class="zan-cell__ft">{{hospital.label}}</div>
          </div>
          <div v-if="role=='2'" class="zan-cell">
            <div class="zan-cell__bd">职称</div>
            <div class="zan-cell__ft">{{title}}</div>
          </div>
          <div v-if="role=='2'" class="zan-cell">
            <div class="zan-cell__bd">简介</div>
            <div class="zan-cell__ft">{{description}}</div>
          </div>
        </div>
        <div class="btn">
          <button v-if="(role==2||role==3)&&status==1" disabled class="zan-btn zan-btn--primary">审核中...</button>
          <navigator :url="'/pages/updateuserinfo/main?role='+role+'&type=modified'" v-else class="zan-btn zan-btn--primary">修改</navigator>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { mapGetters } from "vuex";
export default {
  components: {
    cHeader
  },
  computed: {
    ...mapGetters([
      "name",
      "avatar",
      "avatarUrl",
      "role",
      "rolelist",
      "status",
      "hospital",
      "certificate",
      "gender",
      "genderlist",
      "department",
      "agency",
      "friend",
      "title",
      "description"
    ])
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

.btn {
  margin: 30px 20px;
}
</style>
