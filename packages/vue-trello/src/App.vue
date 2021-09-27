<template><router-view /></template>

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
    @apply inline-flex items-center px-4 py-2 rounded-3xl;
    @apply bg-green-500 text-white font-bold hover:bg-green-400 transition duration-500;
  }

  .btn-danger {
    @apply btn;
    @apply bg-red-500 text-white hover:bg-red-400;
  }
}

#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
