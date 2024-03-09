<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="loading-square">
      <span class="c c1" />
      <span class="c c2" />
      <span class="c c3" />
      <span class="c c2" />
      <span class="c c3" />
      <span class="c c4" />
      <span class="c c3" />
      <span class="c c4" />
      <span class="c c5" />
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.loading-square {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
}

.c {
  position: relative;
  float: left;
  width: 20px;
  height: 20px;
}

.c::before {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  animation: square 1s infinite;
  background-color: #1890ff;
  content: '';
}

.c2::before {
  animation-delay: 0.1s;
}

.c3::before {
  animation-delay: 0.2s;
}

.c4::before {
  animation-delay: 0.3s;
}

.c5::before {
  animation-delay: 0.4s;
}

@keyframes square {
  100% {
    width: 0;
    height: 0;
  }
}
</style>
