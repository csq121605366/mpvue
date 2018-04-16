function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join("/");
  const t2 = [hour, minute, second].map(formatNumber).join(":");

  return `${t1} ${t2}`;
}

// 深度copy
export function clone(value, isDeep) {
  if (value === null) return null;
  if (typeof value !== "object") return value;
  if (Array.isArray(value)) {
    if (isDeep) {
      return value.map(item => clone(item, true));
    }
    return [].concat(value);
  } else {
    if (isDeep) {
      var obj = {};
      Object.keys(value).forEach(item => {
        obj[item] = clone(value[item], true);
      });
      return obj;
    }
    return { ...value };
  }
}

// 防抖
export function debounce(func, wait, leading, trailing) {
  var timer,
    lastCall = 0,
    flag = true;
  return function () {
    var context = this;
    var args = arguments;
    var now = +new Date();
    if (now - lastCall < wait) {
      flag = false;
      lastCall = now;
    } else {
      flag = true;
    }
    if (leading && flag) {
      lastCall = now;
      return func.apply(context, args);
    }
    if (trailing) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        flag = true;
        func.apply(context, args);
      }, wait);
    }
  };
}

// 节流
export function throttle(func, wait, leading, trailing) {
  var timer,
    lastCall = 0,
    flag = true;
  return function () {
    var context = this;
    var args = arguments;
    var now = +new Date();
    flag = now - lastCall > wait;
    if (leading && flag) {
      lastCall = now;
      return func.apply(context, args);
    }
    if (!timer && trailing && !(flag && leading)) {
      timer = setTimeout(function () {
        timer = null;
        lastCall = +new Date();
        func.apply(context, args);
      }, wait);
    } else {
      lastCall = now;
    }
  };
}

// 柯里化
export function curry(func) {
  var l = func.length;
  return function curried() {
    var args = [].slice.call(arguments);
    if (args.length < l) {
      return function () {
        var argsInner = [].slice.call(arguments);
        return curried.apply(this, args.concat(argsInner));
      };
    } else {
      return func.apply(this, args);
    }
  };
}
// 数组扁平化
export function flattenDepth(array, depth = 1) {
  let result = [];
  array.forEach(item => {
    let d = depth;
    if (Array.isArray(item) && d > 0) {
      result.push(...flattenDepth(item, --d));
    } else {
      result.push(item);
    }
  });
  return result;
}

export const authType = {
  require: { reg: /[\w\W]+/, info: "请输入内容" },
  username: {
    reg: /^[a-zA-Z0-9_-]{4,16}$/,
    info: "4-16位（字母，数字，下划线，减号）"
  },
  password: {
    reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/,
    info: "6-21字母和数字组成，不能是纯数字或纯英文"
  },
  email: {
    reg: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    info: "邮箱格式不正确"
  }, //Email正则
  phone: {
    reg: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
    info: "手机格式不正确"
  }, //手机号正则
  name: {
    reg: /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/,
    info: "姓名格式不正确"
  }, //姓名正则
  code: { reg: /^[0-9]{4,6}$/, info: "验证码格式不正确" },
  idcard: {
    reg: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    info: "身份证格式不正确"
  }, //18位身份证
  url: {
    reg: /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
    info: "网址格式不正确"
  } // url验证
};



export function guid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}