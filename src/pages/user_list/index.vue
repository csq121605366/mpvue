<template>
  <div class="app">
    <c-header back fixed title="医生"></c-header>
    <div class="container">
      <div class="menu">
        <ZanTab v-bind="doctor" :componentId="'doctor'" :handleZanTabChange="menuChange"></ZanTab>
      </div>
      <div class="list">
        <div v-for="(item,index) in doctor.list" v-if="item.id == doctor.selectedId" :key="index" class="item">
          <div class="list_role">
            <div class="list_role_title">医生</div>
            <div class="list_role_list" v-for="(x,i) in item.data['2']" :key="i" @click="navigate(x._id)">
              <div class="list_role_item zan-hairline--bottom">
                <div class="list_role_avatar">
                  <img :src="x.avatar?x.avatar.imageURL:x.avatarUrl" alt="">
                </div>
                <div class="list_role_info">
                  <span class="list_role_item_name">{{x.name}}</span>
                  <span class="list_role_item_title">{{x.title}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="list_role">
            <div class="list_role_title">经理人</div>
            <div class="list_role_list" v-for="(x,i) in item.data['3']" :key="i" @click="navigate(x._id)">
              <div class="list_role_item zan-hairline--bottom">
                <div class="list_role_avatar">
                  <img :src="x.avatar?x.avatar.imageURL:x.avatarUrl" alt="">
                </div>
                <div class="list_role_info">
                  <span class="list_role_item_name">{{x.name}}</span>
                  <span class="list_role_item_title">{{x.title}}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="role=='2'||role=='3'" class="list_role">
            <div class="list_role_title">用户</div>
            <div class="list_role_list" v-for="(x,i) in item.data['1']" :key="i" @click="navigate(x._id)">
              <div class="list_role_item zan-hairline--bottom">
                <div class="list_role_avatar">
                  <img :src="x.avatar?x.avatar.imageURL:x.avatarUrl" alt="">
                </div>
                <div class="list_role_info">
                  <span class="list_role_item_name">{{x.name}}</span>
                  <span class="list_role_item_title">{{x.title}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import cTap from "@/components/cTap";
import { mapGetters } from "vuex";
import ZanTab from "@/components/zan/tab";
import { userListByDepartment } from "@/utils/api";
export default {
  components: {
    cHeader,
    cTap,
    ZanTab
  },
  data() {
    return {
      doctor: {
        list: [],
        scroll: false,
        selectedId: ""
      }
    };
  },
  computed: {
    ...mapGetters(["id", "department", "role"])
  },
  onLoad() {
    if (!this.department || this.department.length == 0) {
      wx.showToast({
        title: "请先关注科室(修改我的信息)",
        icon: "none",
        mask: true,
        success: function() {
          setTimeout(() => {
            wx.switchTab({ url: "/pages/my/main" });
          }, 2000);
        }
      });
    } else {
      this._initData();
    }
  },
  methods: {
    ...ZanTab.methods,
    menuChange(e) {
      const { componentId, selectedId } = e;
      this[componentId].selectedId = selectedId;
    },
    _initData() {
      let department = [];
      this.department.forEach(res => {
        department.push(res.key);
      });
      this.doctor.list = [];
      userListByDepartment({ department }).then(res => {
        this.department.forEach((item, index) => {
          this.doctor.list.push({ id: item.key, title: item.label, data: {} });
        });
        res.data.forEach(element => {
          this.doctor.list.forEach((item, index) => {
            //分科室
            if (element.department.key == item.id) {
              //分角色 data为对象 键名为role值
              if (!this.doctor.list[index].data[element.role]) {
                this.doctor.list[index].data[element.role] = [];
              }
              this.doctor.list[index].data[element.role].push(element);
            }
          });
        });
        //初始化选择第一个目录
        this.doctor.selectedId = this.doctor.list[0].id;
      });
    },
    navigate(_id) {
      wx.navigateTo({
        url: "/pages/user_detail/main?user_id=" + _id
      });
    }
  }
};
</script>

<style scoped>
.none {
  width: 100%;
  padding-top: 60px;
  background-color: #fff;
  font-size: 16px;
  color: #999;
  text-align: center;
}
.none .iconfont {
  font-size: 30px;
}
.list {
  margin-top: 10px;
}
.list_role {
  padding: 10px;
  background-color: #fff;
}
.list_role_title {
  background-color: #f0f0f0;
  color: #999;
  padding: 4px 10px;
  font-size: 12px;
}
.list_role_item {
  display: flex;
  align-items: center;
  padding: 6px 0 6px 10px;
}
.list_role_item_name {
  padding: 0 10px;
}

.list_role_avatar {
  flex: 0 1 50px;
}
.list_role_avatar ._img {
  height: 40px;
  width: 40px;
}
</style>
