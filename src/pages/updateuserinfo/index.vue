<template>
  <div class="app">
    <c-header back fixed title="完善信息"></c-header>
    <div class="container">
      <div class="userinfo">
        <div class="zan-panel">
          <div class="zan-cell zan-field avatar">
            <image class="avatar_img" model="aspectFit" :src="(form.avatar&&form.avatar.imageURL)?form.avatar.imageURL+'-webp':''"></image>
            <div class="avatar_btn" @click="chooseAvatar">
              <span>上传头像</span>
              <div class="zan-arrow"></div>
            </div>
          </div>
          <div class="zan-cell zan-field">
            <div class="zan-cell__hd zan-field__title">姓名</div>
            <input type="text" @input="form.name = $event.target.value" :placeholder="form.name||'请输入姓名'" class="zan-field__input zan-cell__bd" />
          </div>
          <div class="zan-cell zan-field">
            <div class="zan-cell__hd zan-field__title">性别</div>
            <div class="zan-cell__bd">
              <input type="text" disabled :placeholder="picker.genderList[form.gender].value||'请输入手机号'" class="zan-field__input zan-cell__bd">
            </div>
            <div class="zan-cell__ft">
              <picker range-key="value" :range="picker.genderList" @change="genderChange" :value="picker.gender">
                <button class="zan-btn zan-btn--mini zan-btn--primary">选择性别</button>
              </picker>
            </div>
          </div>
          <div class="zan-cell zan-field">
            <div class="zan-cell__hd zan-field__title">手机号</div>
            <input type="number" @input="form.phone = $event.target.value" :placeholder="form.phone||'请输入手机号'" class="zan-field__input zan-cell__bd" />
          </div>
          <div class="zan-cell zan-field">
            <div class="zan-cell__hd zan-field__title">验证码</div>
            <input type="number" @input="form.code = $event.target.value" placeholder="请输入短信验证码" class="zan-field__input zan-cell__bd" />
            <div class="zan-cell__ft">
              <button @click="sendCode" :disabled="sendCodeing" class="zan-btn zan-btn--mini zan-btn--primary">获取验证码</button>
            </div>
          </div>
          <!-- <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">身份证</div>
              <input type="text" v-model="form.idcard" placeholder="请输入身份证号码" class="zan-field__input zan-cell__bd" />
            </div> -->
        </div>
        <!-- 普通用户 -->
        <div v-if="form.role=='1'">
          <div class="zan-panel">
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">关注科室</div>
              <div class="zan-cell__bd">
                <view v-if="form.department.length==0" class="department_tip">最多选择三个</view>
                <view v-else class="department_show">
                  <span @longpress="departmentDel(index)" class="department_tag" v-for="(item,index) in form.department" :key="index">
                    {{item.label}}
                  </span>
                </view>
              </div>
              <div class="zan-cell__ft">
                <picker mode="multiSelector" @columnchange="departmentColumChange" class="department_picker" :range="picker.departmentList" @change="departmentChange" :value="picker.department">
                  <button class="zan-btn zan-btn--mini zan-btn--primary">选择科室</button>
                </picker>
              </div>
            </div>
          </div>
          <div class="zan-panel">
            <view @click="treamentShow=!treamentShow" class="zan-panel-title treatment_title">就诊信息(非必填,填写有助于医生诊断)
              <i class="zan-arrow treatment_showbtn" :class="treamentShow?'treatment_showbtn-active':''"></i>
            </view>
            <div v-if="treamentShow">
              <div class="zan-cell zan-field">
                <div class="zan-cell__hd zan-field__title">主治医生</div>
                <input type="text" v-model="form.treatment_info.doctor_name" placeholder="请填写主治医生" class="zan-field__input zan-cell__bd" />
              </div>
              <div class="zan-cell zan-field">
                <div class="zan-cell__hd zan-field__title">所患疾病</div>
                <input type="text" v-model="form.treatment_info.illness_name" placeholder="请填写所患疾病" class="zan-field__input zan-cell__bd" />
              </div>
              <div class="zan-cell zan-field">
                <div class="zan-cell__hd zan-field__title">是否手术</div>
                <picker range-key="value" :range="picker.operationList" @change="operationChange" :value="form.treatment_info.operation">
                  <input type="text" :value="picker.operationList[form.treatment_info.operation].value" disabled class="zan-field__input zan-cell__bd" />
                </picker>
              </div>
              <div class="zan-cell zan-field">
                <div class="zan-cell__hd zan-field__title">就诊信息</div>
                <div class="treatment_info">
                  <div class="treatment_tip zan-c-gray">提问前请上传病例信息，便于医生了解您的病情。上传资料以图片的方式提供，包括住院病例，入院记录、手术记录、出院记录、会诊记录、B超、心电图、CT、核磁共振、医嘱记录等 图片个数：{{form.treatment_info.treatment_images.length}} / 9 (长按删除)</div>
                  <div class="treatment_img_list">
                    <div @longpress="form.treatment_info.treatment_images.splice(index,1)" @tap="imgsPrev(item.imageURL)" v-for="(item,index) in form.treatment_info.treatment_images" :key="index" class="treatment_img_item">
                      <image class="treatment_img_image" :src="item.imageURL+'-webp'"></image>
                    </div>
                    <div @click="imgsAdd('treatment_info')" class="treatment_img_item">
                      <span class="iconfont icon-tainjia"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 普通用户-end -->

        <!-- 医生 -->
        <div v-if="form.role=='2'">
          <div class="zan-panel">
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">医院</div>
              <div class="zan-cell__bd department_show">
                <div v-if="!form.hospital.label" class="department_tip">选择医院(长按删除)</div>
                <div v-else @longpress="form.hospital={}" class="department_tag">
                  {{form.hospital.label}}
                </div>
              </div>
              <div class="zan-cell__ft">
                <navigator v-if="!form.hospital.label" open-type="navigateTo" url="/pages/search/main?type=hospital" class="zan-btn zan-btn--mini zan-btn--primary">选择医院</navigator>
              </div>
            </div>
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">科室</div>
              <div class="zan-cell__bd">
                <view v-if="form.department.length==0" class="department_tip">选择科室(长按删除)</view>
                <view v-else class="department_show">
                  <span @longpress="departmentDel(index)" class="department_tag" v-for="(item,index) in form.department" :key="index">
                    {{item.label}}
                  </span>
                </view>
              </div>
              <div class="zan-cell__ft">
                <picker mode="multiSelector" @columnchange="departmentColumChange" class="department_picker" :range="picker.departmentList" @change="departmentChange($event,1)" :value="picker.department">
                  <button class="zan-btn zan-btn--mini zan-btn--primary">选择科室</button>
                </picker>
              </div>
            </div>
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">职称</div>
              <picker v-if="picker.titleList.length" range-key="label" :range="picker.titleList" @change="titleChange" :value="picker.title">
                <input type="text" v-model="picker.titleList[picker.title].label" disabled class="zan-field__input zan-cell__bd" />
              </picker>
            </div>
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">证书</div>
              <div class="treatment_info">
                <div class="treatment_tip zan-c-gray">上传医师资格证书,执业资格证书 图片个数：{{form.certificate.length}} / 9 (长按删除)</div>
                <div class="treatment_img_list">
                  <div @longpress="form.certificate.splice(index,1)" @tap="imgsPrev(item.imageURL)" v-for="(item,index) in form.certificate" :key="index" class="treatment_img_item">
                    <image class="treatment_img_image" :src="item.imageURL+'-webp'"></image>
                  </div>
                  <div @click="imgsAdd('certificate')" class="treatment_img_item">
                    <span class="iconfont icon-tainjia"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">简介</div>
              <div class="zan-cell__bd">
                <textarea class="desc_textarea" v-model="form.description" placeholder="个人简介(擅长领域)" />
              </div>
            </div>
          </div>
        </div>
        <!-- 医生-end -->
        <!-- 经纪人 -->
        <div v-if="form.role=='3'">
          <div class="zan-panel">
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">潜在客户</div>
              <div class="zan-cell__bd department_show">
                <div v-if="form.friend.length==0" class="department_tip">添加潜在客户(点击修改,长按删除)</div>
                <div @longpress="form.friend.splice(index,1)" @click="friendAdd(index)" class="department_tag" v-for="(item,index) in form.friend" :key="index">
                  {{item.name}}
                </div>
              </div>
              <div class="zan-cell__ft">
                <navigator open-type="navigateTo" url="/pages/addfriend/main" class="zan-btn zan-btn--mini zan-btn--primary">添加客户</navigator>
              </div>
            </div>
          </div>
          <div class="zan-panel">
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">代理科室</div>
              <div class="zan-cell__bd">
                <view v-if="form.department.length==0" class="department_tip">最多选择三个(长按删除)</view>
                <view v-else class="department_show">
                  <span @longpress="departmentDel(index)" class="department_tag" v-for="(item,index) in form.department" :key="index">
                    {{item.label}}
                  </span>
                </view>
              </div>
              <div class="zan-cell__ft">
                <picker mode="multiSelector" @columnchange="departmentColumChange" class="department_picker" :range="picker.departmentList" @change="departmentChange" :value="picker.department">
                  <button class="zan-btn zan-btn--mini zan-btn--primary">选择科室</button>
                </picker>
              </div>
            </div>
            <div v-if="form.department.length" v-for="(item,index) in form.department" :key="index" class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">{{item.label}}</div>
              <div class="zan-cell__bd">
                <input type="text" @input="form.agency[index].name = $event.target.value" :placeholder="form.agency[index]?form.agency[index].name:'请输入姓名'" class="zan-field__input zan-cell__bd" />
              </div>
            </div>
          </div>
        </div>
        <!-- 经纪人-end -->
        <div class="zan-btns">
          <button class="zan-btn zan-btn--primary" @click="submit">提交审核</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import ZanField from "@/components/zan/field";
import ZanSelect from "@/components/zan/select";
import {
  sendCode,
  mainDepart,
  viceDepart,
  qiniuTicket,
  titleList,
  update,
  updateLocaltion
} from "@/utils/api.js";
import { authType, guid } from "@/utils";
import * as qiniu from "@/utils/qiniuUploader";
import WxValidate from "@/utils/validate";
export default {
  components: {
    cHeader,
    ZanField,
    ZanSelect
  },
  data() {
    return {
      picker: {
        gender: 0,
        genderList: [
          {
            key: "0",
            value: "保密"
          },
          {
            key: "1",
            value: "男"
          },
          {
            key: "2",
            value: "女"
          }
        ],
        operation: 0,
        operationList: [
          {
            key: "0",
            value: "保密"
          },
          {
            key: "1",
            value: "否"
          },
          {
            key: "2",
            value: "是"
          }
        ],
        department: [0, 0],
        departmentList: [],
        title: 0,
        titleList: []
      },
      sendCodeing: false,
      qiniuTicket: "",
      qiniuDomain: "",
      qiniuRegion: "",
      treamentShow: true,
      form_phone: "",
      form: {
        role: "",
        avatar: {},
        name: "",
        gender: "1",
        phone: "",
        code: "",
        // idcard: "",
        department: [], //所有人都可以关联科室 但是医生只能关联一个 其他关联三个

        //treatment_info里面包含的信息
        treatment_info: {
          doctor_name: "",
          illness_name: "",
          operation: "1",
          treatment_images: []
        },
        //treatment_info-end

        hospital: {}, //医院_id
        title: "", //职称string
        certificate: [], //医生证书
        description: "", //医生描述

        friend: [], //经纪人潜在客户
        agency: [] //经纪人代理客户
      }
    };
  },
  onShow() {
    let friend = this.$mp.page.data.friend;
    let friend_index = this.$mp.page.data.friend_index;
    console.log(" this.picker.titleList[index]", this.$mp.page.data);
    if (friend && this.form.role == 3) {
      console.log(friend);
      if (friend_index) {
        this.form.friend[friend_index] = friend;
        console.log("this.form.friend", this.form.friend);
      } else {
        this.form.friend.push(friend);
      }
    }
    let hospital = this.$mp.page.data.hospital;
    if (hospital && this.form.role == 2) {
      this.form.hospital = hospital;
    }
  },
  onLoad: function(option) {
    //修改
    if (option.type && option.type == "modified") {
      let userinfo = JSON.parse(JSON.stringify(this.$store.state.user));
      this.form = userinfo;
    }
    // 新建角色
    if (!option.role && this.form.role == "") {
      // 没有选择角色进来
      setTimeout(() => {
        wx.navigateTo({
          url: "/pages/roleselect/main",
          success() {
            wx.showToast({
              title: "请选择角色",
              icon: "none"
            });
          }
        });
      }, 600);
    } else if (option.role) {
      this.form.role = option.role;
    }

    if (this.form.role == 2) {
      this.getTitleList();
    }
    this.getmainDepart();
    // 获取七牛ticket
    qiniuTicket().then(res => {
      this.qiniuRegion = res.data.qiniuRegion;
      this.qiniuTicket = res.data.qiniuTicket;
      this.qiniuDomain = res.data.qiniuDomain;
    });
    let self = this;
    //获取用户坐标
    wx.getLocation({
      type: "wgs84",
      success: function(res) {
        updateLocaltion({ localtion: res });
      }
    });
  },
  methods: {
    getTitleList() {
      titleList().then(res => {
        this.picker.titleList = res.data;
        // 设置默认值
        this.form.title = res.data[0]["label"];
      });
    },
    titleChange(e) {
      this.picker.title = e.target.value;
      this.form.title = this.picker.titleList[this.picker.title].label;
    },
    getmainDepart() {
      //获取主列表并设置默认值
      mainDepart().then(res => {
        let m = res.data;
        let mArr = [];
        m.forEach(item => {
          mArr.push(item.label);
        });
        this.picker.departmentList = [mArr, []];
        this.mainDepartList = m;
        this.mainDepartArr = mArr;
        let default_id = m[0]["_id"];
        if (default_id) {
          this.getviceDepart(default_id);
        }
      });
    },
    getviceDepart(_id) {
      // 动态获取副列表
      viceDepart(_id).then(res => {
        let m = res.data;
        let mArr = [];
        m.forEach(item => {
          mArr.push(item.label);
        });
        this.picker.departmentList = [this.mainDepartArr, mArr];
        this.viceDepartList = m;
        this.viceDepartArr = mArr;
      });
    },
    async departmentColumChange(e) {
      //科室主列表选择后变更副列表
      // 符合条件才进行查询副列表 1是列表变化事件 2列表变化的是第一列 3新选择的主列值跟老值不一样
      this.picker.department[e.target.column] = e.target.value;
      if (e.type == "columnchange" && e.target.column == 0) {
        let index = e.target.value;
        await this.getviceDepart(this.mainDepartList[index]["_id"]);
        this.picker.department[1] = 0;
      }
    },
    chooseAvatar() {
      let self = this;
      wx
        .chooseImageAsync({
          count: 1, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"] // 可以指定来源是相册还是相机，默认二者都有
        })
        .then(res => {
          var tempFilePaths = res.tempFilePaths[0];
          self.uploadImg(tempFilePaths, res => {
            // 返回bucket文件夹名 fsize文件大小 hash值 imageURL图片地址 key文件名
            self.form.avatar = res;
          });
        });
    },
    genderChange(e) {
      //性别选择成功
      this.picker.gender = e.target.value;
      this.form.gender = this.picker.genderList[e.target.value].key;
    },
    departmentDel(i) {
      //科室删除时要同时删除代理
      this.form.department.splice(i, 1);
      if (this.form.agency) {
        this.form.agency.splice(i, 1);
      }
    },
    departmentChange(e, num = 3) {
      //科室选择成功
      let cIndex = e.target.value[1];
      let oSelectArr = this.form.department;
      if (oSelectArr.length < num) {
        let obj = {
          label: this.viceDepartList[cIndex].label,
          key: this.viceDepartList[cIndex].key
        };
        this.form.department.push(obj);
        if (this.form.agency) {
          this.form.agency.push({ department: obj, name: "" });
        }
      } else {
        wx.showToast({
          title: `最多选择${num}个科室`,
          icon: "none"
        });
      }
    },
    operationChange(e) {
      // 是否手术选择成功
      this.form.treatment_info.operation = e.target.value;
    },
    setsendCodeBtn() {
      setTimeout(() => {
        this.sendCodeing = false;
      }, 6 * 1000);
      this.sendCodeing = true;
    },
    InputChange(param, e) {
      this.form[param] = e.target.value;
      console.log(e.target.value);
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
    async uploadImg(filePath, cb) {
      let self = this;
      // filePath, success, fail, options, progress
      await qiniu.upload(
        filePath,
        res => {
          if (cb) cb(res);
          wx.showToast({
            title: "上传成功",
            icon: "success"
          });
        },
        error => {
          wx.showToast({
            title: "上传失败",
            icon: "none"
          });
        },
        {
          region: self.qiniuRegion,
          domain: self.qiniuDomain, // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
          uptoken: self.qiniuTicket // 由其他程序生成七牛 uptoken
        },
        res => {}
      );
    },
    imgsAdd(type = "treatment_info") {
      let self = this;
      this.type = this.type || 0;
      if (this.type < 9) {
        wx
          .chooseImageAsync({
            count: (9 - this.type) | 0, // 默认9
            sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ["album", "camera"] // 可以指定来源是相册还是相机，默认二者都有
          })
          .then(async res => {
            var tempFilePaths = res.tempFilePaths;
            self.type += tempFilePaths.length;
            tempFilePaths.forEach(src => {
              self.uploadImg(src, res => {
                // 返回bucket文件夹名 fsize文件大小 hash值 imageURL图片地址 key文件名
                if (type == "treatment_info") {
                  self.form.treatment_info.treatment_images.push(res);
                } else if (type == "certificate") {
                  self.form.certificate.push(res);
                }
              });
            });
          });
      } else {
        wx.showToast({
          title: "最多上传9张",
          icon: "success"
        });
      }
    },
    imgsPrev(url) {
      wx.previewImage({
        urls: [url]
      });
    },
    navigateTo(url) {
      wx.navigateTo({ url });
    },
    friendAdd(index) {
      wx.navigateTo({
        url:
          "/pages/addfriend/main?friend_index=" +
          index +
          "&friend=" +
          JSON.stringify(this.form.friend[index])
      });
    },
    validate() {
      // 验证字段的规则
      const rules = {
        name: {
          required: true,
          name: true
        },
        phone: {
          required: true,
          phone: true
        },
        code: {
          required: true,
          code: true
        }
      };
      if (this.form.role == "2") {
        rules.description = {
          required: true,
          minlength: 10,
          maxlength: 140
        };
      }
      // 验证字段的提示信息，若不传则调用默认的信息
      const messages = {
        name: {
          required: "请输入姓名",
          name: "请正确输入姓名"
        },
        phone: {
          required: "请输入手机号",
          phone: "请输入正确的手机号"
        },
        code: {
          required: "请输入验证码",
          code: "请输入正确的验证码"
        },
        description: {
          required: "请填写自我介绍",
          minlength: "自我介绍不可以小于10个字",
          maxlength: "自我介绍不可以大于140个字"
        }
      };
      // 创建实例对象
      this.WxValidate = new WxValidate(rules, messages);
      if (!this.WxValidate.checkForm(this.form)) {
        const error = this.WxValidate.errorList[0];
        wx.showToast({
          title: error.msg,
          icon: "none",
          mask: true
        });
        return false;
      } else {
        return true;
      }
    },
    async submit(e) {
      let can = this.validate();
      let self = this;
      if (can) {
        wx.showLoading({
          title: "上传中...",
          mask: true
        });
        update(this.form).then(res => {
          if (res.success) {
            wx.showToast({
              title: "更新成功",
              icon: "success",
              success: function() {
                wx.switchTab({
                  url: "/pages/my/main",
                  success() {
                    self.$store.dispatch("Login").then(_ => {
                      self.$store.dispatch("GetInfo");
                    });
                  }
                });
              }
            });
          } else {
            wx.showToast({
              title: "上传失败",
              icon: "none"
            });
          }
          wx.hideLoading();
        });
      }
    }
  }
};
</script>

<style scpoed>
.container {
  height: 100%;
}
._input {
  color: #333;
}
.avatar {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.avatar_btn {
  padding: 20px 0 20px 20px;
  line-height: 10px;
  color: #c8c8c8;
}
.avatar_btn ._span {
  padding-right: 10px;
}
.avatar_img {
  width: 60px;
  height: 60px;
  background-color: #eeeeee;
}
.department_picker {
  min-height: 30px;
  line-height: 30px;
  color: #949494;
  width: 100%;
}
.department_show {
  padding-right: 30px;
  min-height: 40px;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: center;
}
.department_tag {
  padding: 0 8px;
  margin: 4px 0;
  border: 1px solid #949494;
  border-radius: 4px;
  line-height: 20px;
  font-size: 12px;
}
.department_tip {
  color: #949494;
}

.treatment_title {
  position: relative;
  padding: 10px;
}
.treatment_showbtn {
  right: 30px;
  transform: rotateZ(-45deg);
}
.treatment_showbtn.treatment_showbtn-active {
  transform: rotateZ(135deg);
}
.treatment_img_list {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: flex-start;
}
.treatment_img_item {
  background-color: #eee;
  text-align: center;
  line-height: 70px;
  margin: 5px 10px 10px 0;
  height: 70px;
  width: 70px;
  border-radius: 6px;
}
.treatment_img_item .iconfont {
  font-size: 30px;
  font-weight: 600;
}
.treatment_img_image {
  position: relative;
  height: 100%;
  width: 100%;
}
.desc_textarea {
  padding-right: 10px;
  width: 100%;
}
</style>
