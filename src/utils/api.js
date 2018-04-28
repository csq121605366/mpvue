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

//更新用户信息
export function update(data) {
  return wx.requestAsync({
    url: "app/update",
    method: "POST",
    data
  });
}

// app/updatelocaltion 增加用户地址信息
export function updateLocaltion(data) {
  return wx.requestAsync({
    url: "app/updatelocaltion",
    method: "POST",
    data
  });
}

//经理人获取潜在客户
export function getFriend(data) {
  return wx.requestAsync({
    url: "app/friend/get",
    method: "POST",
    data
  });
}

//经理人获取代理医生
export function getAgency(data) {
  return wx.requestAsync({
    url: "app/agency/get",
    method: "GET",
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
    url: "app/department/main"
  });
}
// 获取次科室列表
export function viceDepart(_id) {
  return wx.requestAsync({
    url: "app/department/vice?_id=" + _id
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

export function articleCreateAndUpdate(data) {
  return wx.requestAsync({
    url: "app/article/createandupdate",
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

//首页进入时的文章列表
export function articlePaging(data) {
  return wx.requestAsync({
    url: "app/article/paging",
    method: "POST",
    data
  });
}

// 创建问题或回答
export function qaCreate(data) {
  return wx.requestAsync({
    url: "app/qa/create",
    method: "POST",
    data
  });
}

//回答问题
export function qaAnswer(data) {
  return wx.requestAsync({
    url: "app/qa/answer",
    method: "POST",
    data
  });
}

// 获取问答列表
export function qaSearch(data) {
  return wx.requestAsync({
    url: "app/qa/search",
    method: "POST",
    data
  });
}

//问答详情
export function qaDetail(data) {
  return wx.requestAsync({
    url: "app/qa/detail",
    method: "post",
    data
  });
}

//获取科室用户列表
export function userListByDepartment(data) {
  return wx.requestAsync({
    url: "app/user/department",
    method: "POST",
    data
  });
}
//用户详情
export function userDetail(data) {
  return wx.requestAsync({
    url: "app/user/detail",
    method: "POST",
    data
  });
}

// 混合搜索
export function search(data) {
  return wx.requestAsync({
    url: "app/search",
    method: "POST",
    data
  });
}
