<template>
  <header class="relative">
    <!-- 主背景容器 -->
    <div class="relative overflow-hidden h-20 flex items-center">
      <!-- 标题文字 -->
      <div class="relative pt-1 pb-1.5 pl-2 text-center header-container">
        <h1
          class="font-bold tracking-wider uppercase inline-block text-2xl text-primary-blue"
        >
          展示网站管理首页
        </h1>

        <!-- 右侧装饰元素组 -->
        <div class="absolute top-4 -right-3 inline-flex items-center -mt-2">
          <!-- 第一个装饰块 - 渐变 -->
          <div
            class="mr-1 inline-block skew-x-12 w-10 h-2.5"
            style="
              background: linear-gradient(180deg, #00d6fe 0%, #00aded 100%);
            "
          ></div>

          <!-- 第二个装饰块 -->
          <div
            class="mr-1 inline-block skew-x-12 w-2 h-2.5"
            style="background-color: #00acf9"
          ></div>

          <!-- 第三个装饰块 -->
          <div
            class="mr-1 inline-block skew-x-12 w-2 h-2.5"
            style="background-color: #009df4"
          ></div>

          <!-- 第四个装饰块 -->
          <div
            class="mr-1 inline-block skew-x-12 w-2 h-2.5"
            style="background-color: #0376f3"
          ></div>

          <!-- 第五个装饰块 -->
          <div
            class="mr-1 inline-block skew-x-12 w-2 h-2.5"
            style="background-color: #2d3dbc"
          ></div>

          <!-- 第六个装饰块 -->
          <div
            class="mr-1 inline-block skew-x-12 w-2 h-2.5"
            style="background-color: #2c357e"
          ></div>
        </div>

        <div class="opacity-0 inline-flex items-center -mt-2">
          <!-- 第一个装饰块 - 渐变 -->
          <div
            class="mr-1 inline-block skew-x-12 w-10 h-2.5"
            style="
              background: linear-gradient(180deg, #00d6fe 0%, #00aded 100%);
            "
          ></div>

          <!-- 第二个装饰块 -->
          <div
            class="mr-1 inline-block skew-x-12 w-2 h-2.5"
            style="background-color: #00acf9"
          ></div>

          <!-- 第三个装饰块 -->
          <div
            class="mr-1 inline-block skew-x-12 w-2 h-2.5"
            style="background-color: #009df4"
          ></div>

          <!-- 第四个装饰块 -->
          <div
            class="mr-1 inline-block skew-x-12 w-2 h-2.5"
            style="background-color: #0376f3"
          ></div>

          <!-- 第五个装饰块 -->
          <div
            class="mr-1 inline-block skew-x-12 w-2 h-2.5"
            style="background-color: #2d3dbc"
          ></div>

          <!-- 第六个装饰块 -->
          <div
            class="mr-1 inline-block skew-x-12 w-2 h-2.5"
            style="background-color: #2c357e"
          ></div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-container {
  background: linear-gradient(
    90deg,
    rgba(64, 158, 255, 0.2) 2.33%,
    rgba(64, 158, 255, 0.0862918) 42.83%,
    rgba(64, 158, 255, 2e-5) 100%
  );
}

.header-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    #63fbfc 2.33%,
    #63fbfc 42.83%,
    #63fbfc 100%
  );
}
</style>
