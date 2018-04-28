<template>
    <div class="app">
        <c-header back fixed title="代理医生列表"></c-header>
        <div class="container article">
            <div v-if="list&&list.length" v-for="(item,index) in list" :key="index" class="agency_list">
                <view class="zan-panel-title">{{item.department.label}}</view>
                <view class="zan-panel names">
                    <div v-if="item.names" class="name" v-for="(x,i) in item.names" :key="x">{{x}}</div>
                </view>
            </div>
        </div>
    </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import { getAgency } from "@/utils/api";
export default {
  components: {
    cHeader
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    getData() {
      getAgency().then(res => {
        let data = res.data;
        data.forEach((element, index) => {
          data[index].names = element.name.split(" ");
        });
        this.list = data;
        console.log(this.list);
      });
    }
  },
  onLoad() {
    this.getData();
  }
};
</script>

<style scoped>
.names {
  padding: 10px;
  display: flex;
}
.name {
  padding: 0 20px;
}
</style>
