<template>
  <div class="app">
    <aheader back fixed title="添加潜在客户"></aheader>
    <div class="container">
      <div class="zan-panel">
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">姓名</div>
          <input type="text" @input="form.name = $event.target.value" :placeholder="form.name||'请输入姓名'" class="zan-field__input zan-cell__bd" />
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">性别</div>
          <div class="zan-cell__bd">
            <input type="text" disabled :placeholder="picker.genderList[form.gender].value||'请输入手机号'" class="zan-field__input zan-cell__bd">
          </div>
          <div class="zan-cell__ft">
            <picker range-key="value" :range="picker.genderList" @change="genderChange" :value="picker.gender">
              <button class="zan-btn zan-btn--mini zan-btn--primary">选择性别</button>
            </picker>
          </div>
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">手机号</div>
          <input type="number" @input="form.phone = $event.target.value" :placeholder="form.phone||'请输入手机号'" class="zan-field__input zan-cell__bd" />
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">医院</div>
          <div class="zan-cell__bd department_show">
            <div v-if="!form.hospital" class="department_tip">选择医院(长按删除)</div>
            <div v-else @longpress="form.hospital=''" @click="deleteHandle('hospital',index)" class="department_tag">
              {{form.hospital.label}}
            </div>
          </div>
          <div class="zan-cell__ft">
            <navigator v-if="!form.hospital.label" open-type="navigateTo" url="/pages/search/main?type=hospital" class="zan-btn zan-btn--mini zan-btn--primary">选择医院</navigator>
          </div>
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">科室</div>
          <div class="zan-cell__bd department_show">
            <input type="text" disabled :value="form.department.label" placeholder="请选择科室">
          </div>
          <div class="zan-cell__ft">
            <picker mode="multiSelector" @columnchange="departmentColumChange" class="department_picker" :range="picker.departmentList" @change="departmentChange" :value="picker.department">
              <button class="zan-btn zan-btn--mini zan-btn--primary">选择科室</button>
            </picker>
          </div>
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">职称</div>
          <div class="zan-cell__bd">
            <input type="text" :value="form.title" placeholder="请选择职称" disabled class="zan-field__input zan-cell__bd" />
          </div>
          <div class="zan-cell__ft">
            <picker v-if="picker.titleList.length" range-key="label" :range="picker.titleList" @change="titleChange">
              <button class="zan-btn zan-btn--mini zan-btn--primary">选择职称</button>
            </picker>
          </div>
        </div>
        <div class="zan-cell zan-field">
          <div class="zan-cell__hd zan-field__title">简介</div>
          <div class="zan-cell__bd">
            <textarea v-model="form.description" placeholder="医生简介(擅长领域)" />
          </div>
        </div>
      </div>
      <div class="btns">
        <button class="btn zan-btn--primary" @click="reset">重置</button>
        <button class="btn zan-btn--primary" @click="add">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import ZanField from "@/components/zan/field";
import ZanSelect from "@/components/zan/select";
import { titleList, mainDepart, viceDepart, getFriend } from "@/utils/api.js";
import WxValidate from "@/utils/validate";
export default {
  name: "addfriend",
  components: {
    aheader: cHeader,
    ZanField,
    ZanSelect
  },
  data() {
    return {
      picker: {
        gender: 0,
        genderList: [
          {
            key: "0",
            value: "保密"
          },
          {
            key: "1",
            value: "男"
          },
          {
            key: "2",
            value: "女"
          }
        ],
        department: [0, 0],
        departmentList: [],
        titleList: []
      },
      oform: {
        name: "",
        gender: "1",
        title: "",
        phone: "",
        hospital: "",
        department: {},
        description: ""
      },
      form: {
        name: "",
        gender: "1",
        title: "",
        phone: "",
        hospital: "",
        department: {},
        description: ""
      }
    };
  },
  onShow() {
    let hospital = this.$mp.page.data.hospital;
    if (hospital) {
      this.form.hospital = hospital;
    }
  },
  onLoad: function(options) {
    if (options.friend) {
      this.form = JSON.parse(options.friend);
      this.friend_index = options.friend_index;
    }
    console.log(this.form);
    this.getTitleList();
    this.getmainDepart();
  },
  methods: {
    getFriendData(param) {
      getFriend({ friend_id: param }).then(res => {
        this.form = res.data;
      });
    },
    getTitleList() {
      titleList().then(res => {
        this.picker.titleList = res.data;
        // 设置默认值
        // this.form.title = res.data[0]["name"];
      });
    },
    titleChange(e) {
      let index = e.target.value;
      this.form.title = this.picker.titleList[index].label;
      console.log(this.picker.titleList[index], this.form.title);
    },
    genderChange(e) {
      //性别选择成功
      this.picker.gender = e.target.value;
      this.form.gender = this.picker.genderList[e.target.value].key;
    },
    departmentChange(e) {
      //科室选择成功
      let cIndex = e.target.value[1];
      let obj = {
        label: this.viceDepartList[cIndex].label,
        key: this.viceDepartList[cIndex].key
      };
      this.form.department = obj;
    },
    deleteHandle(target, index = -1) {
      let self = this;
      wx.showModal({
        title: "提示",
        content: "删除?",
        success: function(res) {
          if (res.confirm) {
            if (target == "department") {
              self.form[target].splice(index, 1);
            } else if (target == "hospital") {
              self.form[target] = "";
            }
          }
        }
      });
    },
    getmainDepart() {
      //获取主列表并设置默认值
      mainDepart().then(res => {
        let m = res.data;
        let mArr = [];
        m.forEach(item => {
          mArr.push(item.label);
        });
        this.picker.departmentList = [mArr, []];
        this.mainDepartList = m;
        this.mainDepartArr = mArr;
        let default_id = m[0]["_id"];
        if (default_id) {
          this.getviceDepart(default_id);
        }
      });
    },
    getviceDepart(_id) {
      // 动态获取副列表
      viceDepart(_id).then(res => {
        let m = res.data;
        let mArr = [];
        m.forEach(item => {
          mArr.push(item.label);
        });
        this.picker.departmentList = [this.mainDepartArr, mArr];
        this.viceDepartList = m;
        this.viceDepartArr = mArr;
      });
    },
    async departmentColumChange(e) {
      //科室主列表选择后变更副列表
      // 符合条件才进行查询副列表 1是列表变化事件 2列表变化的是第一列 3新选择的主列值跟老值不一样
      this.picker.department[e.target.column] = e.target.value;
      if (e.type == "columnchange" && e.target.column == 0) {
        let index = e.target.value;
        await this.getviceDepart(this.mainDepartList[index]["_id"]);
        this.picker.department[1] = 0;
      }
    },
    reset() {
      this.oform.department = [];
      this.form = Object.assign({}, this.oform);
    },
    add() {
      // 验证字段的规则
      const rules = {
        name: {
          required: true,
          name: true
        },
        phone: {
          required: false,
          phone: true
        },
        hospital: {
          isobject: true
        },
        department: {
          isobject: true
        }
      };

      // 验证字段的提示信息，若不传则调用默认的信息
      const messages = {
        name: {
          required: "请输入姓名",
          name: "请正确输入姓名"
        },
        phone: {
          phone: "请输入正确的手机号"
        },
        hospital: {
          isobject: "请添加医院信息"
        },
        department: {
          isobject: "请添加科室信息"
        }
      };
      // 创建实例对象
      this.WxValidate = new WxValidate(rules, messages);
      if (!this.WxValidate.checkForm(this.form)) {
        const error = this.WxValidate.errorList[0];
        wx.showToast({
          title: error.msg,
          icon: "none",
          mask: true
        });
        return false;
      } else {
        let pages = getCurrentPages(); //当前页面
        let prevPage = pages[pages.length - 2]; //上一页面
        prevPage.setData({
          friend: this.form,
          friend_index: this.friend_index || ""
        });
        wx.navigateBack();
      }
    }
  }
};
</script>

<style scoped>
.department_tip {
  color: #949494;
}
.department_show {
  padding-right: 30px;
  height: 34px;
  line-height: 34px;
  display: flex;
  flex-flow: row;
  align-items: flex-start;
}
.department_tag {
  padding: 0 8px;
  margin: 4px 0;
  border: 1px solid #949494;
  line-height: 20px;
  font-size: 12px;
}
.department_tag_close {
  display: inline-block;
  line-height: 23px;
  vertical-align: middle;
}
.btns {
  margin-top: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
.btn {
  flex: 1 1 auto;
  margin: 0 20px;
  line-height: 40px;
}
</style>
