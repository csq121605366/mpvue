<template>
  <div class="app">
    <c-header back fixed title="文章列表"></c-header>
    <div class="container">
      <div class="list">
        <c-tap :user_id="id" :articleList="true"></c-tap>
      </div>
    </div>
  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import cTap from "@/components/cTap";
import { mapGetters } from "vuex";

export default {
  components: {
    cHeader,
    cTap
  },
  computed: {
    ...mapGetters(["id", "department"])
  },
  onShow() {
    console.log(this.id);
  }
};
</script>

<style scoped>

</style>
