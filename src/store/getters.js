const getters = {
  interval: state => state.app.interval,
  qiniuTicket: state => state.app.qiniuTicket,
  authType: state => state.app.authType,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  status: state => state.user.status,
  phone: state => state.user.phone,
  friend: state => state.app.friend
};
export default getters;
