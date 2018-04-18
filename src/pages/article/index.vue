<template>
  <div class="app">
    <web-view @message="getMessage" src="http://localhost:7001/app/article"></web-view>
  </div>
</template>

<script>
export default {
  methods: {
    getMessage(e) {
      console.log("=====", e);
    }
  }
};
</script>

