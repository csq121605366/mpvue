const user = {
  state: {
    token: "5465464",
    name: "54735437",
    avatar: "546737",
    role: "",
    phone: ""
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLE: (state, role) => {
      state.role = role;
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const data = response.data;
            setToken(data.token);
            commit("SET_TOKEN", data.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const data = response.data;
            commit("SET_ROLE", data.role);
            commit("SET_NAME", data.username);
            commit("SET_AVATAR", data.avatarUrl);
            commit("SET_PHONE", data.phone);
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
