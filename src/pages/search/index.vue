<template>
    <div class="app">
        <c-header fixed title="问答"></c-header>
        <div class="container">
            <div class="search__wrap">
                <div class="search">
                    <i class="search__icon iconfont icon-sousuo" type="search"></i>
                    <input @input="hospitalSearch($event)" class="search__box" placeholder-class="placeholder" type="text" :placeholder="placeholder">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import cSearch from "@/components/cSearch";
import { hospitalSearch } from "@/utils/api";
import { debounce } from "@/utils";
export default {
  name: "search",
  components: {
    cHeader,
    cSearch
  },
  onLoad(option) {
    option.type = "hospital";
    if (option.type) {
      if (option.type == "hospital") {
        this.placeholder = "搜索医院";
      }
      this.type = option.type;
    }
  },
  data() {
    return {
      placeholder: "搜索医生 / 科室 / 医院 / 症状 / 疾病",
      type: ""
    };
  },
  methods: {
    hospitalSearch: debounce(e => {
      if (e.type == "input") {
        let key = e.target.value;
        hospitalSearch({ key }).then(res => {
          console.log(res);
        });
      }
    }, 600)
  }
};
</script>

<style scoped>
.placeholder {
  color: #a5a5a5;
  font-size: 14px;
}
.search__wrap {
  background-color: #2bb5f5;
  padding: 10px 20px 10px;
}
.search {
  position: relative;
  height: 35px;
  background-color: #fff;
  border-radius: 35px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.search__icon {
  padding: 0 10px;
  color: #2bb5f5;
}
.search__box {
  flex: 1 1 auto;
  padding-left: 10px;
  font-size: 16px;
  color: #2b2b2b;
}
</style>
