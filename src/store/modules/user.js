import { login, getInfo, updatebaseInfo } from "@/utils/api.js";

const user = {
  state: {
    id: "",
    name: "",
    avatar: {},
    avatarUrl: '',
    role: "", // 0:游客 1:普通用户 2:医生 3:经理人 9:前台页面管理员
    rolelist: ['游客', '用户', '医生', '经理人'],
    status: "", // 用户账号状态 0保留 1未激活 2已激活 3已锁定(也叫审核未通过) 9已删除
    phone: "",
    hospital: "",
    certificate: '',
    gender: '',
    genderlist: ['未知', '男性', '女性'],// 0代表未知 1代表男性 2代表女性
    department: '',
    agency: '',
    friend: '',
    title: '',
    treatment_info: '',
    description: '',
  },

  mutations: {
    SET_ID: (state, param) => {
      state.id = param;
    },
    SET_NAME: (state, param) => {
      state.name = param;
    },
    SET_AVATAR: (state, param) => {
      state.avatar = param;
    },
    SET_AVATARURL: (state, param) => {
      state.avatarUrl = param;
    },
    SET_ROLE: (state, param) => {
      state.role = param;
    },
    SET_STATUS: (state, param) => {
      state.status = param;
    },
    SET_PHONE: (state, param) => {
      state.phone = param;
    },
    SET_HOSPITAL: (state, param) => {
      state.hospital = param;
    },
    SET_CERTIFICATE: (state, param) => {
      state.certificate = param;
    },
    SET_GENDER: (state, param) => {
      state.gender = param;
    },
    SET_DEPARTMENT: (state, param) => {
      state.department = param;
    },
    SET_AGENCY: (state, param) => {
      state.agency = param;
    },
    SET_FRIEND: (state, param) => {
      state.friend = param;
    },
    SET_TITLE: (state, param) => {
      state.title = param;
    },
    SET_TREATMENT_INFO: (state, param) => {
      state.treatment_info = param;
    },
    SET_DESCRIPTION: (state, param) => {
      state.description = param;
    }
  },

  actions: {
    // 登录
    async Login({ commit }) {
      let code;
      await wx.loginAsync().then(res => {
        code = res.code;
      });
      return new Promise((resolve, reject) => {
        login({ code })
          .then(response => {
            const data = response.data;
            wx.setStorageSync("token", data.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    UpdatebaseInfo({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        updatebaseInfo(data)
          .then(response => {
            const data = response.data;
            commit("SET_ID", data._id);
            commit("SET_ROLE", data.role);
            commit("SET_NAME", data.name);
            commit("SET_AVATAR", data.avatar);
            commit("SET_AVATARURL".data.avatarUrl);
            commit("SET_STATUS", data.status);
            commit("SET_PHONE", data.phone);
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const data = response.data;
            commit("SET_ID", data._id);
            commit("SET_ROLE", data.role);
            commit("SET_NAME", data.name);
            commit("SET_AVATARURL", data.avatarUrl);
            commit("SET_AVATAR", data.avatar);
            commit("SET_STATUS", data.status);
            commit("SET_PHONE", data.phone);
            commit("SET_DEPARTMENT", data.department);
            commit("SET_GENDER", data.gender);
            //1普通用户 2医生 3经纪人
            if (data.role == '1') {
              commit("SET_TREATMENT_INFO", data.treatment_info);
            } else if (data.role == '2') {
              commit("SET_HOSPITAL", data.hospital);
              commit("SET_CERTIFICATE", data.certificate);
              commit("SET_TITLE", data.title);
              commit("SET_DESCRIPTION", data.description);
            } else if (data.role == '3') {
              commit("SET_FRIEND", data.friend);
              commit("SET_AGENCY", data.agency);
            }
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};

export default user;
