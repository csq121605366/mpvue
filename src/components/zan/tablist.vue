<template>
  <div>
    <div v-for="item in list" :key="id" class="zan-tab__item" :class="{'zan-tab__item--selected': selectedId === item.id }" :data-component-id="componentId" :data-item-id="item.id" @click="__handleZanTabChange">
      <div class="zan-tab__title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { extractComponentId } from "../../utils/helper";
export default {
  props: ["list", "selectedId", "componentId", "_handleZanTabChange"],
  methods: {
    __handleZanTabChange(e) {
      const componentId = extractComponentId(e);
      const dataset = e.currentTarget.dataset;
      const selectedId = dataset.itemId;
      const data = { componentId, selectedId };
      if (this._handleZanTabChange) {
        this._handleZanTabChange(data);
      }
    }
  }
};
</script>

<style scoped>

</style>
