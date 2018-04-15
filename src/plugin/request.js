const VueRequestPlugin = {};
VueRequestPlugin.install = (Vue, options) => {
  const asyncWrap = fn => (options = {}) =>
    new Promise((resolve, reject) => {
      let conf = {
        success: res => {
          resolve(res);
        },
        fail: err => {
          reject(err);
        }
      };
      wx[fn](Object.assign({}, conf, options));
    });
  Vue.prototype.$request = asyncWrap("request");
};
export default VueRequestPlugin;
