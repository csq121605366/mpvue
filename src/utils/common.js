// import * as _ from "lodash";
// wx._ = _;
import store from "@/store";

const asyncWrap = fn => (options = {}) =>
  new Promise((resolve, reject) => {
    let conf = {
      // baseUrl: "http://localhost:7001/api/",
      baseUrl: store.getters.apiUrl,
      baseHeader: {
        Authorization: "Bearer " + wx.getStorageSync("token"),
        "content-type": "application/json"
      },
      success: res => {
        if (res.data) {
          if (res.data.success) {
            resolve(res.data);
          } else {
            if (res.statusCode == 401 && store.getters.times > 0) {
              store.dispatch('reduceTimes');
              store.dispatch("Login").then(res => {
                store.dispatch("GetInfo");
              });
              reject(res.data);
            } else if (res.statusCode == 403) {
              wx.showToast({
                title: "您的审核未通过，请修改后重新提交",
                icon: "none",
                mask: true,
                success: function () {
                  setTimeout(() => {
                    wx.switchTab({
                      url: "/pages/my/main"
                    });
                  }, 800);
                }
              });
            } else {
              wx.showToast({
                title: res.data.error || res.data.message,
                icon: "none",
                duration: 2000
              });
              reject(res.data);
            }
          }
        } else {
          resolve(res);
        }
      },
      fail: err => {
        console.log("err", err);

        // wx.showToast({
        //   title: '无网络',
        //   icon: 'none',
        //   duration: 2000
        // })
        // reject(err);
      }
    };
    options.url = conf.baseUrl + options.url;
    options.header = Object.assign({}, conf.baseHeader, options.header);
    let opt = Object.assign({}, conf, options);
    wx[fn](opt);
  });

wx.requestAsync = asyncWrap("request");
wx.loginAsync = asyncWrap("login");
wx.chooseImageAsync = asyncWrap("chooseImage");
wx.uploadFileAsync = asyncWrap("uploadFile");
wx.chooseVideoAsync = asyncWrap("chooseVideo");
