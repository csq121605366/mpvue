<template>
  <div class="app">
    <c-header back fixed title="文章"></c-header>
    <div class="container article">
      <div class="zan-panel">
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">文章类型</div>
          <picker class="article_sort" range-key="value" :range="picker.sortlist" @change="picker.sort = $event.target.value" :value="picker.sort">
            <input type="text" :value="picker.sortlist[picker.sort]?picker.sortlist[picker.sort].value:''" placeholder="点击选择" disabled class="zan-field__input zan-cell__bd" />
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
          <picker class="article_sort" :range="picker.timelist" @change="picker.time = $event.target.value" :value="picker.time">
            <input type="text" :value="picker.timelist[picker.time]?picker.timelist[picker.time]:''" placeholder="点击选择" disabled class="zan-field__input zan-cell__bd" />
          </picker>
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">附件(图片)</div>
          <div class="image_info">
            <div class="image_tip zan-c-gray">上传图片 资源个数：{{form.images.length}} / 9 (长按删除)</div>
            <div class="image_img_list">
              <div @longpress="imgsDel(index)" @tap="imgsPrev(item.imageURL)" v-for="(item,index) in form.images" :key="index" class="image_img_item">
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
              <!-- <div @longpress="form.videos.splice(index, 1)" v-for="(item,index) in form.videos" :key="index" class="image_img_item">
                <image class="image_img_image" :src="item.imageURL+'-webp'"></image>
              </div> -->
              <div @click="videoAdd" class="image_img_item">
                <span class="iconfont icon-tainjia"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="zan-cell">
          <web-view src="http://localhost:7001/admin/login"></web-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { qiniuTicket } from "@/utils/api.js";
import * as qiniu from "@/utils/qiniuUploader";
export default {
  components: {
    cHeader
  },
  data() {
    return {
      qiniuTicket: "",
      qiniuDomain: "",
      qiniuRegion: "",
      picker: {
        sort: -1,
        sortlist: [
          { key: "1", value: "日志" },
          { key: "2", value: "手术记录" },
          { key: "3", value: "科普文章" }
        ],
        type: -1,
        typelist: [
          { key: "1", value: "公开" },
          { key: "2", value: "仅相同科室查看" },
          { key: "3", value: "私有" }
        ],
        time: -1,
        timelist: [
          "术后一周",
          "术后一个月",
          "术后三个月",
          "术后半年",
          "术后一年"
        ]
      },
      form: {
        sort: "", //文章分类 1日志 2手术记录 3科普文章
        title: "", //标题
        illness_name: "", //疾病名称
        illness_time: "", //手术时间进程
        type: "", //文章展示模式 1公开 2相同科室查看 3私有
        images: [], // 文章相关图片
        videos: [], // 视频资源
        content: "" //文章内容
      }
    };
  },
  mounted() {
    // 获取七牛ticket
    qiniuTicket().then(res => {
      this.qiniuRegion = res.data.qiniuRegion;
      this.qiniuTicket = res.data.qiniuTicket;
      this.qiniuDomain = res.data.qiniuDomain;
    });
  },
  methods: {
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
    videoAdd() {
      let self = this;
      if (this.form.videos.length < 6) {
        wx.chooseVideo({
          sourceType: ["album", "camera"],
          maxDuration: 4,
          success(e) {
            console.log(e);
          }
        });
      }
    },
    imgsAdd() {
      let self = this;
      if (this.form.images.length < 9) {
        wx
          .chooseImageAsync({
            count: (9 - this.form.images.length) | 0, // 默认9
            sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ["album", "camera"] // 可以指定来源是相册还是相机，默认二者都有
          })
          .then(async res => {
            var tempFilePaths = res.tempFilePaths;
            tempFilePaths.forEach(src => {
              self.upload(src, res => {
                // 返回bucket文件夹名 fsize文件大小 hash值 imageURL图片地址 key文件名
                self.form.images.push(res);
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
</style>
