const app = {
  state: {
    apiUrl: 'http://192.168.51.3:7001/api/',
    // apiUrl: 'http://192.168.166.3:7001/api/',
    rootUrl: 'http://192.168.51.3:7001/',
    // rootUrl: 'http://192.168.166.3:7001/',
    sortList: { "1": '日志记录', "2": '手术记录', "3": '科普文章' },
    operationList: { '0': '保密', '1': '否', '2': '已手术' },// 0保密 1否 2已手术
    articleStatusList: { '0': '保存', '1': '未审核', '2': '已审核' }, //0保存 1未审核 2已审核 3已删除
  },
  mutations: {

  },
  actions: {
  }
};

export default app;
