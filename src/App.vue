<template>
  <MapChart
    style="“height: 100%; width: 100%"
    title="新北市"
    :stats="{ data: [] }"
  />
</template>

<script>
import MapChart from "./components/MapChart.vue"

export default {
  name: "App",
  components: {
    MapChart,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
