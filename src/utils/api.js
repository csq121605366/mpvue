export function login(data) {
  return wx.requestAsync({
    url: "app/login",
    method: "POST",
    data
  });
}

export function getInfo() {
  return wx.requestAsync({
    url: "app/getuserinfo"
  });
}

export function updatebaseInfo(data) {
  return wx.requestAsync({
    url: "app/updatebaseInfo",
    method: "POST",
    data
  });
}

export function sendCode(data) {
  return wx.requestAsync({
    url: "sendcode",
    method: "POST",
    data
  });
}
