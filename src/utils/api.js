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
export function canUpdate() {
  return wx.requestAsync({
    url: "app/canupdate"
  });
}

export function update(data) {
  return wx.requestAsync({
    header: {
      "content-type": "application/json"
    },
    url: "app/update",
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
    url: "app/maindepartments"
  });
}
// 获取次科室列表
export function viceDepart(_id) {
  return wx.requestAsync({
    url: "app/vicedepartments?_id=" + _id
  });
}

//获取七牛ticket
export function qiniuTicket() {
  return wx.requestAsync({
    url: "qiniu/ticket"
  });
}

//职称列表
export function titleList() {
  return wx.requestAsync({
    url: "app/titlelist"
  });
}

// 搜索医院
export function hospitalSearch(data) {
  return wx.requestAsync({
    url: "app/hospital",
    method: "POST",
    data
  });
}

export function articleCreate(data) {
  return wx.requestAsync({
    url: "app/article/create",
    method: "POST",
    data
  });
}

//发表文章
export function articlePublish(data) {
  return wx.requestAsync({
    url: "app/article/publish",
    method: "POST",
    data
  });
}

//获取文章内容
export function articleList(data) {
  return wx.requestAsync({
    url: "app/article/list",
    method: "POST",
    data
  });
}
//文章获取详情
export function getDetail(data) {
  return wx.requestAsync({
    url: "app/article/getdetail",
    method: "POST",
    data
  });
}

export function getPaging(data) {
  return wx.requestAsync({
    url: 'app/article/paging',
    method: 'POST',
    data
  })
}

// 创建问题或回答
export function qaCreate(data) {
  return wx.requestAsync({
    url: 'app/qa/create',
    method: 'POST',
    data
  })
}


export function qaList(data) {
  return wx.requestAsync({
    url: 'app/qa/list',
    method: 'POST',
    data
  })
}