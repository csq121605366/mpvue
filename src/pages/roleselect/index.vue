<template>
    <div class="app">
        <c-header fixed title="完善信息">
            <div slot="left">
                <navigator open-type="navigateBack">返回</navigator>
            </div>
        </c-header>
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
      wx.navigateTo({
        url: "/pages/userinfo/main?role=" + this.roles.checked
      });
    }
  }
};
</script>

<style scpoed>
.container {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
}
.role {
  background-color: #fff;
  padding: 40px 20px;
  margin: 0 20px;
  flex: 1 1 auto;
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
