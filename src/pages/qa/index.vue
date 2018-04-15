<template>
  <div class="app">
    <c-header fixed title="问答"></c-header>
    <div class="container">
      <c-search></c-search>
    </div>

  </div>
</template>

<script>
import cHeader from "@/components/cHeader";
import cSearch from "@/components/cSearch";
export default {
  components: {
    cHeader,
    cSearch
  }
};
</script>

<style>

</style>
