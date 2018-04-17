
import * as _ from "lodash";
wx._ = _;

const asyncWrap = fn => (options = {}) =>
  new Promise((resolve, reject) => {
    let conf = {
      baseUrl: "http://localhost:7001/api/",
      baseHeader: {
        Authorization: "Bearer " + wx.getStorageSync("token"),
        "content-type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log('res', res)
        if (res.data) {
          if (res.data.success) {
            resolve(res.data);
          } else {
            wx.showToast({
              title: res.data.error || res.data.message,
              icon: 'none',
              duration: 2000
            })
            reject(res.data);
          }
        } else {
          resolve(res);
        }
      },
      fail: err => {
        console.log('err', err)
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
wx.chooseImageAsync = asyncWrap('chooseImage');
wx.uploadFileAsync = asyncWrap('uploadFile');