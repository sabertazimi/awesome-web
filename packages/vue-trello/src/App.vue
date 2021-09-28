<template>
  <router-view />
</template>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .container {
    @apply mx-auto;
  }

  .link {
    @apply underline text-green-500 hover:text-green-300 transition duration-500;
  }

  .btn {
    @apply inline-flex items-center min-w-min max-w-max px-4 py-2 rounded-3xl cursor-pointer;
    @apply bg-green-500 text-white font-bold;
    @apply hover:bg-green-400;
    @apply transition duration-500;
  }

  .btn-sm {
    @apply btn;
    @apply px-2 py-1 text-sm;
  }

  .btn-danger {
    @apply btn;
    @apply bg-red-500 text-white hover:bg-red-400;
  }
}

html,
body {
  height: 100%;
}

#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
