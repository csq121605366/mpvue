<template>
    <div class="search__wrap">
        <div class="search">
            <i class="search__icon iconfont icon-sousuo" type="search"></i>
            <input disabled class="search__box" placeholder-class="placeholder" type="text" placeholder="搜索医生 / 科室 / 问题 / 资讯">
        </div>
    </div>
</template>

<script>
export default {
  name: "search"
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
  text-indent: 10px;
  font-size: 16px;
  color: #a5a5a5;
}
</style>
