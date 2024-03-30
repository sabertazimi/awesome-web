<template>
  <div id="nav">
    <router-link :to="{ name: 'EventList' }">
      Events
    </router-link> |
    <router-link :to="{ name: 'About' }">
      About
    </router-link>
  </div>
  <suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <div>Loading events list ...</div>
    </template>
  </suspense>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

h4 {
  font-size: 20px;
}
</style>
