import * as _ from "lodash";
wx._ = _;
import store from "@/store";

const asyncWrap = fn => (options = {}) =>
  new Promise((resolve, reject) => {
    console.log(store)
    let conf = {
      // baseUrl: "http://localhost:7001/api/",
      baseUrl: store.getters.apiUrl,
      baseHeader: {
        Authorization: "Bearer " + wx.getStorageSync("token"),
        "content-type": "application/json"
      },
      success: res => {
        console.log("res", res);
        if (res.data) {
          if (res.data.success) {
            resolve(res.data);
          } else {
            if (res.statusCode == 401) {
              store.dispatch("Login").then(res => {
                store.dispatch("GetInfo");
              });
              if (res.data.error && res.data.error.indexOf("expired")) {
                wx.showToast({
                  title: "开了个小差,已经回来了",
                  icon: "none",
                  duration: 2000
                });
              }
              reject(res.data);
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
    options.header = _.assign({}, conf.baseHeader, options.header);
    let opt = _.assign({}, conf, options);
    wx[fn](opt);
  });

wx.requestAsync = asyncWrap("request");
wx.loginAsync = asyncWrap("login");
wx.chooseImageAsync = asyncWrap("chooseImage");
wx.uploadFileAsync = asyncWrap("uploadFile");
wx.chooseVideoAsync = asyncWrap("chooseVideo");
