<template>
  <div class="app">
    <c-header fixed title="完善信息">
      <div slot="left">
        <navigator open-type="navigateBack">返回</navigator>
      </div>
    </c-header>
    <div class="container">
      <div class="userinfo">
        <form @submit="formSubmit" @reset="formReset">
          <div class="zan-panel">
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">姓名</div>
              <input type="text" name="name" v-model="form.name" placeholder="请输入姓名" class="zan-field__input zan-cell__bd" />
            </div>
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">性别</div>
              <picker range-key="value" :range="pickerViewConfig.genderList" @change="genderChange" :value="pickerViewConfig.gender">
                <input type="text" :value="pickerViewConfig.genderList[pickerViewConfig.gender].value" disabled class="zan-field__input zan-cell__bd" />
              </picker>
              <input type="text" name="gender" hidden v-model="form.gender" disabled class="zan-field__input zan-cell__bd" />
            </div>
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">手机号</div>
              <input type="text" name="phone" v-model="form.phone" placeholder="请输入手机号" class="zan-field__input zan-cell__bd" />
            </div>
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">验证码</div>
              <input type="text" name="code" v-model="form.code" placeholder="请输入短信验证码" class="zan-field__input zan-cell__bd" />
              <div class="zan-cell__ft">
                <button @click="sendCode" :disabled="sendCodeing" class="zan-btn zan-btn--mini zan-btn--primary">获取验证码</button>
              </div>
            </div>
            
            

            <div class="zan-btns">
              <button class="zan-btn zan-btn--primary" formType="submit">提交数据</button>
              <button class="zan-btn" formType="reset">重置数据</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import ZanField from "@/components/zan/field";
import ZanSelect from "@/components/zan/select";
import { sendCode } from "@/utils/api.js";
import { authType } from "@/utils";
export default {
  components: {
    cHeader,
    ZanField,
    ZanSelect
  },
  data() {
    return {
      role: "1",
      pickerViewConfig: {
        gender: 0,
        genderList: [
          {
            key: "1",
            value: "男"
          },
          {
            key: "2",
            value: "女"
          }
        ]
      },
      sendCodeing: false,
      form: {
        name: "",
        gender: "1",
        phone: "",
        code: ""
      }
    };
  },
  onLoad: function(option) {
    // if (!option.role) {
    //   // 没有选择角色进来
    //   setTimeout(() => {
    //     wx.navigateTo({
    //       url: "/pages/roleselect/main",
    //       success() {
    //         wx.showToast({
    //           title: "请选择角色",
    //           icon: "none"
    //         });
    //       }
    //     });
    //   }, 1000);
    // } else {
    //   this.role = option.role;
    // }
  },
  methods: {
    genderChange(e) {
      this.pickerViewConfig.gender = e.target.value;
      this.form.gender = this.pickerViewConfig.genderList[e.target.value].key;
    },
    setsendCodeBtn() {
      setTimeout(() => {
        this.sendCodeing = false;
      }, 6 * 1000);
      this.sendCodeing = true;
    },
    sendCode(e) {
      if (authType.phone.reg.test(this.form.phone)) {
        this.setsendCodeBtn();
        sendCode({ phone: this.form.phone, type: "bind" }).then(res => {
          if (res.success) {
            wx.showToast({
              title: "验证码发送成功",
              icon: "none"
            });
          } else {
            wx.showToast({
              title: "发送失败,请重新发送",
              icon: "none"
            });
            this.sendCodeing = false;
          }
        });
      } else {
        wx.showToast({
          title: "手机号格式不正确",
          icon: "none"
        });
      }
    },
    formSubmit(e) {
      console.log(e);
    },
    formReset(e) {
      console.log(e);
    }
  }
};
</script>

<style scpoed>

</style>
