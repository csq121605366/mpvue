<template>
  <div class="app">
    <c-header fixed title="问答"></c-header>
    <div class="container">
      <div class="qa">
        <div class="zan-panel">
          <view @click="treamentShow=!treamentShow" class="zan-panel-title treatment_title">就诊信息(必填,填写有助于医生诊断)
            <i class="zan-arrow treatment_showbtn" :class="treamentShow?'treatment_showbtn-active':''"></i>
          </view>
          <div v-if="treamentShow">
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">问题标题</div>
              <input type="text" v-model="form.title" placeholder="请填写问题题目" class="zan-field__input zan-cell__bd" />
            </div>
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">询问科室</div>
              <div class="zan-cell__bd">
                <input type="text" v-model="form.department.label" disabled placeholder="选择科室" class="zan-field__input zan-cell__bd" />
              </div>
              <div class="zan-cell__ft">
                <picker range-key="label" class="department_picker" :range="department" @change="departmentChange">
                  <button class="zan-btn zan-btn--mini zan-btn--primary">选择科室</button>
                </picker>
              </div>
            </div>
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">所患疾病</div>
              <input type="text" v-model="form.illness_name" placeholder="请填写所患疾病" class="zan-field__input zan-cell__bd" />
            </div>
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">是否手术</div>
              <div class="zan-cell__bd">
                <input type="text" v-model="picker.operationList[form.operation].value" placeholder="请填写是否手术" disabled class="zan-field__input zan-cell__bd" />
              </div>
              <div class="zan-cell__ft">
                <picker range-key="value" :range="picker.operationList" @change="operationChange" :value="form.operation">
                  <button class="zan-btn zan-btn--mini zan-btn--primary">是否手术</button>
                </picker>
              </div>
            </div>
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">就诊信息</div>
              <div class="form">
                <div class="treatment_tip zan-c-gray">提问前请上传病例信息，便于医生了解您的病情。上传资料以图片的方式提供，包括住院病例，入院记录、手术记录、出院记录、会诊记录、B超、心电图、CT、核磁共振、医嘱记录等 图片个数：{{form.images.length}} / {{maxImageNum}} (长按删除)</div>
                <div class="treatment_img_list">
                  <div @longpress="form.images.splice(index,1)" @tap="imgsPrev(item.imageURL)" v-for="(item,index) in form.images" :key="index" class="treatment_img_item">
                    <image class="treatment_img_image" :src="item.imageURL+'-webp'"></image>
                  </div>
                  <div v-if="form.images.length<maxImageNum" @click="imgsAdd" class="treatment_img_item">
                    <span class="iconfont icon-tainjia"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 详细内容 -->
          <div class="zan-panel">
            <div class="zan-cell zan-field">
              <div class="zan-cell__bd">
                <textarea class="content" v-model="form.content" placeholder="请简练描述您的年龄、性别、症状以及就诊经历，便于医生进行准确分析。(最多500字)" maxlength="500"></textarea>
              </div>
            </div>
          </div>
          <div class="zan-btns">
            <button class="zan-btn zan-btn--primary" @click="submit">提交问题</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { qiniuTicket, qaCreate } from "@/utils/api.js";
import * as qiniu from "@/utils/qiniuUploader";
import { mapGetters } from "vuex";
export default {
  components: {
    cHeader
  },
  data() {
    return {
      treamentShow: true,
      picker: {
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
        ]
      },
      qiniuTicket: "",
      qiniuDomain: "",
      qiniuRegion: "",
      form: {
        title: "",
        department: "",
        illness_name: "",
        operation: "0",
        images: [],
        content: ""
      },
      maxImageNum: 9
    };
  },
  computed: {
    ...mapGetters(["role", "status", "department"])
  },
  onShow() {
    //病人进来为提问页面 医生进来为问题列表
    if (this.role == "1") {
      // 获取七牛ticket
      qiniuTicket().then(res => {
        this.qiniuRegion = res.data.qiniuRegion;
        this.qiniuTicket = res.data.qiniuTicket;
        this.qiniuDomain = res.data.qiniuDomain;
      });
    } else if (this.role.indexOf(["2", "3"]) > -1 && this.status != "2") {
      wx.showToast({
        title: "未激活",
        icon: "none",
        mask: true,
        success: function() {
          setTimeout(() => {
            wx.switchTab({
              url: "/pages/index/main"
            });
          }, 800);
        }
      });
    } else {
      wx.showToast({
        title: "请完善资料",
        icon: "none",
        mask: true,
        success: function() {
          setTimeout(() => {
            wx.switchTab({
              url: "/pages/my/main"
            });
          }, 800);
        }
      });
    }
  },
  methods: {
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
    imgsAdd() {
      let self = this;
      if (this.form.images.length < this.maxImageNum) {
        wx
          .chooseImageAsync({
            count: (this.maxImageNum - this.form.images.length) | 0, // 默认9
            sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ["album", "camera"] // 可以指定来源是相册还是相机，默认二者都有
          })
          .then(async res => {
            var tempFilePaths = res.tempFilePaths;
            tempFilePaths.forEach(src => {
              self.uploadImg(src, res => {
                console.log(res);
                // 返回bucket文件夹名 fsize文件大小 hash值 imageURL图片地址 key文件名
                self.form.images.push(res);
              });
            });
          });
      } else {
        wx.showToast({
          title: `最多上传${this.maxImageNum}张`,
          icon: "success"
        });
      }
    },
    operationChange(e) {
      this.form.operation = e.target.value;
    },
    departmentChange(e) {
      let num = e.target.value;
      this.form.department = this.department[num];
    },
    imgsPrev(url) {
      wx.previewImage({
        urls: [url]
      });
    },
    submit() {
      wx.showLoading({
        title: "上传中...",
        mask: true
      });
      qaCreate(this.form).then(res => {
        wx.hideLoading();
        wx.showToast({
          title: "提问成功",
          icon: "success",
          success: function() {
            wx.switchTab({
              url: "/pages/index/main"
            });
          }
        });
      });
    }
  }
};
</script>

<style scpoed>
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
.department_tip {
  color: #666;
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
.content {
  width: 100%;
}
</style>
