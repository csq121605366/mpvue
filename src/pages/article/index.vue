<template>
  <div class="app">
    <!-- <web-view @message="getMessage" src="http://192.168.51.3:7001/app/article"></web-view> -->
    <web-view @message="getMessage" src="http://192.168.166.3:7001/app/article"></web-view>
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

