<template>
  <div class="app">
    <c-header fixed title="我的"></c-header>
    <div class="container">
      <!-- <div v-if="!name" class="mask_getinfo">
        <button open-type="getUserInfo" @getuserinfo="getUserInfo" class="mask_getinfo_btn">点击授权,获取更多内容</button>
      </div> -->
      <div class="my_avatar_wrap">
        <img class="my_avatar" :src="avatar?avatar.imageURL:avatarUrl" alt="">
        <span>{{name||'未授权用户'}}</span>
      </div>
      <div class="my_fun">
        <!--游客 -->
        <div v-if="role==0">
          <div class="zan-panel">
            <div @click="updateInfo" class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">我的信息</div>
              <div class="zan-cell__ft">完善</div>
            </div>
            <div @click="completeMsg" class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">我的问题</div>
              <div class="zan-cell__ft"></div>
            </div>
            <div @click="completeMsg" class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">我关注的医生</div>
              <div class="zan-cell__ft"></div>
            </div>
          </div>
        </div>
        <!-- 游客 -->
        <!--用户 -->
        <div v-if="role==1">
          <div class="zan-panel">
            <navigator url="/pages/myinfo/main" class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">我的信息</div>
              <div class="zan-cell__ft"></div>
            </navigator>
            <div class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">我的问题</div>
              <div class="zan-cell__ft"></div>
            </div>
            <div class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">我关注的医生</div>
              <div class="zan-cell__ft"></div>
            </div>
          </div>
        </div>
        <!-- 用户 -->
        <!-- 医生 -->
        <div v-if="role==2">
          <div class="zan-panel">
            <navigator v-if="status==2" url="/pages/myinfo/main" class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">我的信息</div>
              <div class="zan-cell__ft"></div>
            </navigator>
            <div v-else class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">我的信息</div>
              <div class="zan-cell__ft zan-c-red">审核中...</div>
            </div>
            <div class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">我的科室</div>
              <div class="zan-cell__ft"></div>
            </div>
          </div>
          <div class="zan-panel">
            <navigator url="/pages/article_list/main" class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">我的文章</div>
              <div class="zan-cell__ft"></div>
            </navigator>
            <navigator url="/pages/article/main" class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">写文章</div>
              <div class="zan-cell__ft"></div>
            </navigator>
          </div>
          <div class="zan-panel">
            <div class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">我的回答</div>
              <div class="zan-cell__ft"></div>
            </div>
          </div>
        </div>
        <!-- 医生 -->
        <!-- 经纪人 -->
        <div v-if="role==3">
          <div class="zan-panel">
            <navigator v-if="status==2" url="/pages/myinfo/main" class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">我的信息</div>
              <div class="zan-cell__ft"></div>
            </navigator>
            <div v-else class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">我的信息</div>
              <div class="zan-cell__ft zan-c-red">审核中...</div>
            </div>
          </div>
          <div class="zan-panel">
            <div class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">代理的医生</div>
              <div class="zan-cell__ft"></div>
            </div>
            <div class="zan-cell zan-cell--access">
              <div class="zan-cell__bd">代理的科室</div>
              <div class="zan-cell__ft"></div>
            </div>
          </div>
        </div>
        <!-- 经纪人 -->
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { canUpdate } from "@/utils/api";
import { mapGetters } from "vuex";
export default {
  components: {
    cHeader
  },
  computed: {
    ...mapGetters(["avatar", "avatarUrl", "name", "role", "status"])
  },
  mounted() {
    this.$store.dispatch("GetInfo");
  },
  methods: {
    completeMsg() {
      wx.showToast({
        title: "请完善个人信息",
        icon: "none",
        mask: true
      });
    },
    updateInfo() {
      canUpdate().then(res => {
        wx.navigateTo({
          url: "/pages/roleselect/main"
        });
      });
    },
    writeHandler() {
      wx.showModal({
        content: "很抱歉,为了提供更好的服务,咨询编辑只能在网页端进行",
        showCancel: false,
        confirmColor: "#2bb5f5"
      });
    }
  }
};
</script>

<style scoped>
.mask_getinfo {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.mask_getinfo_btn {
  background-color: #2bb5f5;
  border-radius: 6px;
  padding: 0 20px;
  color: #fff;
  line-height: 50px;
}
.my_avatar_wrap {
  height: 140px;
  background-color: #2bb5f5;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.my_avatar {
  height: 60px;
  width: 60px;
  margin-bottom: 10px;
  border-radius: 50%;
}
</style>
