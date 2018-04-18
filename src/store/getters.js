const getters = {
  id: state => state.user.id,
  qiniuTicket: state => state.app.qiniuTicket,
  authType: state => state.app.authType,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  status: state => state.user.status,
  phone: state => state.user.phone
};
export default getters;
