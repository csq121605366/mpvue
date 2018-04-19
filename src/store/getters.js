const getters = {

  qiniuTicket: state => state.app.qiniuTicket,
  authType: state => state.app.authType,

  id: state => state.user.id,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  avatarUrl: state => state.user.avatarUrl,
  role: state => state.user.role,
  rolelist: state => state.user.rolelist,
  status: state => state.user.status,
  phone: state => state.user.phone,
  hospital: state => state.user.hospital,
  certificate: state => state.user.certificate,
  gender: state => state.user.gender,
  genderlist: state => state.user.genderlist,
  department: state => state.user.department,
  agency: state => state.user.agency,
  friend: state => state.user.friend,
  title: state => state.user.title,
  treatment_info: state => state.user.treatment_info,
  description: state => state.user.description,
};
export default getters;
