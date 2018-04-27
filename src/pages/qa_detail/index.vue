<template>
  <div class="app">
    <c-header back fixed title="问题详情"></c-header>
    <div class="container">
      <div v-if="qa" class="zan-panel">
        <view class="zan-panel-title treatment_title">提问信息</view>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">问题标题</div>
          <input type="text" v-model="qa.title" disabled placeholder="请填写问题题目" class="zan-field__input zan-cell__bd" />
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">询问科室</div>
          <div class="zan-cell__bd">
            <input type="text" v-model="qa.department.label" disabled placeholder="选择科室" class="zan-field__input zan-cell__bd" />
          </div>
        </div>
        <div v-if="qa.illness_name" class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">所患疾病</div>
          <input type="text" v-model="qa.illness_name" disabled placeholder="请填写所患疾病" class="zan-field__input zan-cell__bd" />
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">是否手术</div>
          <div class="zan-cell__bd">
            <input type="text" v-model="operationList[qa.operation]" disabled placeholder="请填写是否手术" disabled class="zan-field__input zan-cell__bd" />
          </div>
        </div>
        <div v-if="qa.images&&qa.images.length" class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">就诊信息</div>
          <div class="zan-cell__bd">
            <div class="treatment_img_list">
              <div @tap="imgsPrev(item.imageURL)" v-for="(item,index) in qa.images" :key="index" class="treatment_img_item">
                <image class="treatment_img_image" :src="item.imageURL+'-webp'"></image>
              </div>
            </div>
          </div>
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">问题详情</div>
          <div class="zan-cell__bd">
            <div class="qa_content">{{qa.content}}</div>
          </div>
        </div>
        <!-- 已经回复内容 -->
        <div v-if="qa.answer&&qa.answer.length" v-for="(item,index) in qa.answer" :key="index">
          <view class="zan-panel-title treatment_title">{{item.title||'经理人'}}-{{item.name}}：</view>
          <div class="zan-cell zan-field">
            <div class="zan-cell__bd">
              <div class="qa_content">{{item.content}}</div>
              <div v-if="item.images&&item.images.length" class="treatment_img_list">
                <div @tap="imgsPrev(x.imageURL)" v-for="(x,y) in item.images" :key="y" class="treatment_img_item">
                  <image class="treatment_img_image" :src="x.imageURL+'-webp'"></image>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 回复内容 -->
        <div v-if="role=='2'||role=='3'" class="zan-panel">
          <view @click="answerShow=!answerShow" class="zan-panel-title treatment_title">回复信息
            <i class="zan-arrow treatment_showbtn" :class="answerShow?'treatment_showbtn-active':''"></i>
          </view>
          <div v-if="answerShow">
            <div class="zan-cell zan-field">
              <div class="zan-cell__bd">
                <textarea class="content" v-model="form.content" placeholder="回复用户的问题" maxlength="500"></textarea>
              </div>
            </div>
            <div class="zan-cell zan-field">
              <div class="zan-cell__hd zan-field__title">回复附图</div>
              <div class="form">
                <div class="treatment_tip zan-c-gray">图片个数：{{form.images.length}} / {{maxImageNum}} (长按删除)</div>
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
          <div class="zan-btns">
            <button class="zan-btn zan-btn--primary" @click="submit">提交回复</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { qaDetail, qiniuTicket, qaAnswer } from "@/utils/api";
import { debounce } from "@/utils";
import { mapGetters } from "vuex";
import * as qiniu from "@/utils/qiniuUploader";
import WxValidate from "@/utils/validate";
export default {
  name: "qa_detail",
  components: {
    cHeader
  },
  onLoad(option) {
    if (option.qa_id) {
      this.qa_id = option.qa_id;
      this.form.qa_id = option.qa_id;
    }
  },
  data() {
    return {
      qa_id: "",
      qa: "",
      treamentShow: true,
      answerShow: true,
      maxImageNum: 9,
      form: {
        qa_id: "",
        images: [],
        content: ""
      }
    };
  },
  computed: {
    ...mapGetters(["operationList", "role"])
  },
  methods: {
    _initData() {
      this.form.content = "";
      this.form.images = [];
      qaDetail({ qa_id: this.qa_id }).then(res => {
        if (res.success) {
          this.qa = res.data;
        }
      });
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
    imgsPrev(url) {
      wx.previewImage({
        urls: [url]
      });
    },
    validate() {
      // 验证字段的规则
      const rules = {
        content: {
          required: true,
          minlength: 10,
          maxlength: 500
        }
      };
      // 验证字段的提示信息，若不传则调用默认的信息
      const messages = {
        content: {
          required: "请填写回复信息后提交",
          rangelength: "回复信息不可以小于10个字",
          maxlength: "回复信息不可以大于500个字"
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
    submit() {
      let can = this.validate();
      let self = this;
      if (can) {
        wx.showLoading({
          title: "上传中...",
          mask: true
        });
        qaAnswer(this.form).then(res => {
          if (res.success) {
            wx.showToast({
              title: "回复成功",
              icon: "success",
              success: function() {
                self._initData();
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
  },
  onShow() {
    // 获取七牛ticket
    qiniuTicket().then(res => {
      this.qiniuRegion = res.data.qiniuRegion;
      this.qiniuTicket = res.data.qiniuTicket;
      this.qiniuDomain = res.data.qiniuDomain;
    });
  },
  mounted() {
    this._initData();
  }
};
</script>

<style scoped>
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
.qa_content {
  word-break: break-all;
}
.content {
  width: 100%;
}
</style>
