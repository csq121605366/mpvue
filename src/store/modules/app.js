import { qiniuTicket } from "@/utils/api.js";
import * as qiniu from "@/utils/qiniuUploader";

const app = {
  state: {
    codeTime: 3,
    otimes: 1,
    times: 1, //如果为401不被允许重新登录的次数
    // apiUrl: 'http://192.168.51.3:7001/api/',
    apiUrl: "http://192.168.166.3:7001/api/",
    // rootUrl: 'http://192.168.51.3:7001/',
    rootUrl: "http://192.168.166.3:7001/",
    sortList: { "1": "日志记录", "2": "手术记录", "3": "科普文章" },
    operationList: { "0": "保密", "1": "否", "2": "已手术" }, // 0保密 1否 2已手术
    articleStatusList: { "0": "保存", "1": "未审核", "2": "已审核" }, //0保存 1未审核 2已审核 3已删除
    qiniu: {
      qiniuRegion: "", //机房位置
      qiniuDomain: "", // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
      qiniuTicket: "", // 由其他程序生成七牛 uptoken
      timestamp: "" //时间戳
    }
  },
  mutations: {
    SET_TIMES: (state, param) => {
      state.times = param;
    },
    SET_QINIU: (state, param) => {
      state.qiniu = param;
    }
  },
  actions: {
    reduceTimes({ commit, state }) {
      commit("SET_TIMES", --state.times);
    },
    refreshTimes({ commit, state }) {
      commit("SET_TIMES", state.otimes);
    },
    async qiniuUpload({ commit, state }, filePath) {
      // filePath, success, fail, options, progress
      if (
        !state.qiniu.timestamp ||
        Date.now() - state.qiniu.timestamp > 60 * 60 * 1000
      ) {
        await qiniuTicket().then(res => {
          let qiniu = {
            qiniuRegion: res.data.qiniuRegion,
            qiniuTicket: res.data.qiniuTicket,
            qiniuDomain: res.data.qiniuDomain,
            timestamp: Date.now()
          };
          commit("SET_QINIU", qiniu);
        });
      }
      return new Promise((resolve, reject) => {
        console.log("qiniu.filepath", filePath);
        qiniu.upload(filePath, res => resolve(res), error => reject(error), {
          region: state.qiniu.qiniuRegion,
          domain: state.qiniu.qiniuDomain,
          uptoken: state.qiniu.qiniuTicket
        });
      });
    }
  }
};

export default app;
