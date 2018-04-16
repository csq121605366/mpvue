
// 登录
export function login(data) {
  return wx.requestAsync({
    url: "app/login",
    method: "POST",
    data
  });
}

// 获取信息
export function getInfo() {
  return wx.requestAsync({
    url: "app/getuserinfo"
  });
}

// 用户授权获取基本信息
export function updatebaseInfo(data) {
  return wx.requestAsync({
    url: "app/updatebaseInfo",
    method: "POST",
    data
  });
}

// 发送手机验证码
export function sendCode(data) {
  return wx.requestAsync({
    url: "sendcode",
    method: "POST",
    data
  });
}


// 获取主科室列表
export function mainDepart() {
  return wx.requestAsync({
    url: 'app/maindepartments'
  })
}
// 获取次科室列表
export function viceDepart(_id) {
  return wx.requestAsync({
    url: 'app/vicedepartments?_id=' + _id
  })
}

//获取七牛ticket
export function qiniuTicket() {
  return wx.requestAsync({
    url: "qiniu/ticket"
  })
}

export function titleList() {
  return wx.requestAsync({
    url: 'app/titlelist'
  })
}