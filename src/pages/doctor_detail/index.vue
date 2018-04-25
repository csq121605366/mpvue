<template>
  <div class="app">
    <c-header back fixed title="医生详情"></c-header>
    <div class="container">
      <div class="list">

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
  data() {},
  computed: {
    ...mapGetters(["id", "department"])
  },
  mounted() {
      console.log(this.department)
  },
  methods: {}
};
</script>

<style scoped>

</style>
