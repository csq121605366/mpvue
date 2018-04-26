<template>
  <div class="app">
    <c-header back fixed title="文章"></c-header>
    <div class="container article">
      <div class="zan-panel">
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">文章类型</div>
          <picker class="article_sort" range-key="value" :range="picker.sortlist" @change="sortChange($event)" :value="picker.sort">
            <input type="text" :value="picker.sortlist[picker.sort]?picker.sortlist[picker.sort].value:''" placeholder="点击选择" disabled class="zan-field__input zan-cell__bd" />
          </picker>
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">展示状态</div>
          <picker class="article_sort" range-key="value" :range="picker.typelist" @change="typeChange($event)" :value="picker.type">
            <input type="text" :value="picker.typelist[picker.type]?picker.typelist[picker.type].value:''" placeholder="点击选择" disabled class="zan-field__input zan-cell__bd" />
          </picker>
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">文章标题</div>
          <input type="text" v-model="form.title" placeholder="请输入标题" class="zan-field__input zan-cell__bd" />
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">疾病或手术类型</div>
          <input type="text" v-model="form.illness_name" placeholder="请输入类型" class="zan-field__input zan-cell__bd" />
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">手术进程</div>
          <picker class="article_sort" :range="picker.timelist" @change="timeChange($event)" :value="picker.time">
            <input type="text" :value="picker.timelist[picker.time]?picker.timelist[picker.time]:''" placeholder="点击选择" disabled class="zan-field__input zan-cell__bd" />
          </picker>
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">附件(图片)</div>
          <div class="image_info">
            <div class="image_tip zan-c-gray">上传图片 资源个数：{{form.images.length}} / 9 (长按删除)</div>
            <div class="image_img_list">
              <div @longpress="form.images.splice(index,1)" @tap="imgsPrev(item.imageURL)" v-for="(item,index) in form.images" :key="index" class="image_img_item">
                <image class="image_img_image" :src="item.imageURL+'-webp'"></image>
              </div>
              <div @click="imgsAdd" class="image_img_item">
                <span class="iconfont icon-tainjia"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">附件(视频)</div>
          <div class="image_info">
            <div class="image_tip zan-c-gray">上传图片(长按删除)</div>
            <div class="image_img_list">
              <div @longpress="form.videos.splice(index, 1)" v-for="(item,index) in form.videos" :key="index" class="image_img_item">
                <image class="image_img_image" :src="item.thumbImg.imageURL"></image>
              </div>
              <div @click="videoAdd" v-if="videMaxItem>form.videos.length" class="image_img_item">
                <span class="iconfont icon-tainjia"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="zan-cell content">
          <div class="zan-cell__hd zan-field__title">正文内容</div>
          <div class="content-prev">
            {{form.pre_content}}
          </div>
          <button @click="addContent" class="zan-btn zan-btn--mini zan-btn--primary">添加和修改正文</button>
        </div>
      </div>
      <div class="btns">
        <button @click="publish" :disabled="form.article_id?false:true" class="btn zan-btn--primary">发布</button>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { qiniuTicket } from "@/utils/api.js";
import * as qiniu from "@/utils/qiniuUploader";
import { articleCreateAndUpdate, getDetail, articlePublish } from "@/utils/api";
import WxValidate from "@/utils/validate";
export default {
  components: {
    cHeader
  },
  data() {
    return {
      qiniuTicket: "",
      qiniuDomain: "",
      qiniuRegion: "",
      maxDuration: 60,
      videMaxItem: 3,
      imageMaxItem: 9,
      picker: {
        sort: 0,
        sortlist: [
          { key: "1", value: "日志" },
          { key: "2", value: "手术记录" },
          { key: "3", value: "科普文章" }
        ],
        type: 0,
        typelist: [
          { key: "1", value: "公开" },
          { key: "2", value: "仅相同科室查看" },
          { key: "3", value: "私有" }
        ],
        time: 0,
        timelist: [
          "术后一周",
          "术后一个月",
          "术后三个月",
          "术后半年",
          "术后一年"
        ]
      },
      form: {
        article_id: "",
        sort: "1", //文章分类 1日志 2手术记录 3科普文章
        title: "", //标题
        illness_name: "", //疾病名称
        illness_time: "术后一周", //手术时间进程
        type: "1", //文章展示模式 1公开 2相同科室查看 3私有
        images: [], // 文章相关图片
        videos: [], // 视频资源
        pre_content: "" //文章预览内容
      }
    };
  },
  mounted() {
    // 获取七牛ticket
    this.qiniu_init();
  },
  onLoad(options) {
    if (options && options.article_id) {
      this._initData(options.article_id);
    }
  },
  onShow() {
    let article_id = this.$mp.page.data.article_id;
    if (article_id) {
      this._initData(article_id);
    }
  },
  methods: {
    _initData(article_id) {
      this.form.article_id = article_id;
      getDetail({ article_id }).then(res => {
        if (res.success) {
          Object.assign(this.form, res.data);
        }
      });
    },
    qiniu_init() {
      qiniuTicket().then(res => {
        this.qiniuRegion = res.data.qiniuRegion;
        this.qiniuTicket = res.data.qiniuTicket;
        this.qiniuDomain = res.data.qiniuDomain;
      });
    },
    sortChange(e) {
      this.picker.sort = e.target.value;
      this.form.sort = this.picker.sortlist[this.picker.sort].key;
    },
    timeChange(e) {
      this.picker.time = e.target.value;
      this.form.illness_time = this.picker.timelist[this.picker.time];
    },
    typeChange(e) {
      this.picker.type = e.target.value;
      this.form.type = this.picker.typelist[this.picker.type].key;
    },
    async upload(filePath, cb) {
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
    videoAdd(e) {
      let self = this;
      if (this.form.videos.length < this.videMaxItem) {
        wx
          .chooseVideoAsync({
            sourceType: ["album", "camera"],
            maxDuration: this.maxDuration
          })
          .then(async data => {
            wx.showLoading({
              title: "上传中...",
              mask: true
            });
            var tempFilePath = data.tempFilePath;
            var thumbTempFilePath = data.thumbTempFilePath;
            if (data.duration < self.maxDuration) {
              self.upload(tempFilePath, video => {
                self.upload(thumbTempFilePath, img => {
                  video.thumbImg = img;
                  self.form.videos.push(video);
                  wx.hideLoading();
                });
              });
            } else {
              wx.showToast({
                title: `请上传小于${this.maxDuration}s的视频`,
                icon: "none"
              });
            }
          });
      } else {
        wx.showToast({
          title: `最多上传${this.videMaxItem}个视频`,
          icon: "none"
        });
      }
    },
    imgsAdd() {
      let self = this;
      if (this.form.images.length < this.imageMaxItem) {
        wx
          .chooseImageAsync({
            count: (this.imageMaxItem - this.form.images.length) | 0, // 默认9
            sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ["album", "camera"] // 可以指定来源是相册还是相机，默认二者都有
          })
          .then(async data => {
            var tempFilePaths = data.tempFilePaths;
            tempFilePaths.forEach(src => {
              self.upload(src, res => {
                // 返回bucket文件夹名 fsize文件大小 hash值 imageURL图片地址 key文件名
                self.form.images.push(res);
              });
            });
          });
      } else {
        wx.showToast({
          title: `最多上传${this.imageMaxItem}张`,
          icon: "none"
        });
      }
    },
    imgsPrev(url) {
      wx.previewImage({
        urls: [url]
      });
    },
    addContent() {
      let can = this.validate();
      if (can) {
        wx.showLoading({
          title: "上传中...",
          mask: true
        });
        articleCreateAndUpdate(this.form).then(res => {
          wx.hideLoading();
          if (res.data && res.data.article_id) {
            wx.navigateTo({
              url: `/pages/article_content/main?article_id=${
                res.data.article_id
              }`
            });
          } else {
            wx.showToast({
              title: `创建失败`,
              mask: true,
              icon: "none"
            });
          }
        });
      }
    },
    validate() {
      // 验证字段的规则
      const rules = {
        title: {
          required: true,
          minlength: 1,
          maxlength: 25
        }
        // article_id: {
        //   required: true
        // }
      };

      // 验证字段的提示信息，若不传则调用默认的信息
      const messages = {
        title: {
          required: "请填写文章标题",
          minlength: "文章标题最少一个字",
          maxlength: "文章标题最多25个字"
        }
        // article_id: {
        //   required: "请添加正文内容"
        // }
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
    publish() {
      let can = this.validate();
      if (can) {
        articlePublish({ article_id: this.form.article_id }).then(res => {
          if (res.success) {
            wx.showToast({
              title: `操作成功`,
              mask: true,
              icon: "none",
              success() {
                wx.navigateBack();
              }
            });
          } else {
            wx.showToast({
              title: res.message,
              mask: true,
              icon: "none"
            });
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.article_sort {
  flex: 1 1 auto;
}

.image_title {
  position: relative;
  padding: 10px;
}
.image_showbtn {
  right: 30px;
  transform: rotateZ(-45deg);
}
.image_showbtn.image_showbtn-active {
  transform: rotateZ(135deg);
}
.image_img_list {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: flex-start;
}
.image_img_item {
  background-color: #eee;
  text-align: center;
  line-height: 70px;
  margin: 5px 10px 10px 0;
  height: 70px;
  width: 70px;
  border-radius: 6px;
}
.image_img_item .iconfont {
  font-size: 30px;
  font-weight: 600;
}
.image_img_image {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 6px;
}

.content-prev {
  flex: 1;
}

.btns {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
.btn {
  flex: 1 1 auto;
  margin: 0 20px;
  line-height: 40px;
}
</style>
