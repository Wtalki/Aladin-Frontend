<template>
  <div class="iframe-wrapper">
    <iframe :src="iframeUrl" class="game-frame" frameborder="0"></iframe>
    <button class="close-btn" @click="$emit('close')">✖</button>
  </div>
</template>

<script>
export default {
  props: {
    iframeUrl: String,
  }
}
</script>

<style scoped>
.iframe-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #4f32a080; /* semi-transparent black */
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.game-frame {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: rgb(0, 0, 0);
  box-shadow: 0 0 10px black;
}
.close-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 24px;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>
