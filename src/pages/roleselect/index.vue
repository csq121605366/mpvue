<template>
  <div class="app">
    <c-header back fixed title="完善信息"></c-header>
    <div class="container">
      <div class="role">
        <div class="zan-panel">
          <div class="zan-panel-title zan-hairline--bottom">角色选定后不可更改</div>
          <zan-select v-bind="{ items:roles.items, checkedValue: roles.checked, componentId: 'roles'}" @handleZanSelectChange="roleSelect" />
          <button class="zan-btn zan-btn--primary" @click="roleChanged">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import ZanSelect from "@/components/zan/select";
import { canUpdate } from "@/utils/api";
export default {
  components: {
    cHeader,
    ZanSelect
  },
  data() {
    return {
      roles: {
        items: [
          {
            padding: 0,
            value: "1",
            name: "普通用户"
          },
          {
            padding: 0,
            value: "2",
            name: "医生"
          },
          {
            padding: 0,
            value: "3",
            name: "经理人"
          }
        ],
        checked: "1"
      }
    };
  },
  methods: {
    roleSelect({ componentId, value }) {
      this[componentId].checked = value;
    },
    roleChanged() {
      //角色选择完毕 跳转
      canUpdate().then(() => {
        wx.navigateTo({
          url: "/pages/updateuserinfo/main?role=" + this.roles.checked
        });
      });
    }
  }
};
</script>

<style scpoed>
.role {
  position: absolute;
  background-color: #fff;
  left: 0;
  right: 0;
  margin: 60px auto 0;
  padding: 40px 10px;
  box-sizing: border-box;
  width: 280px;
  border-radius: 6px;
  box-shadow: 0 0 6px #999;
}
.zan-panel-title {
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.role .zan-cell {
  padding: 20px 0;
}
.zan-btn {
  margin-top: 40px;
}
</style>
