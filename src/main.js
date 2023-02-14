import { createApp } from 'vue'
import App from './App.vue'
import { MapChart } from 'echarts/charts'
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

use([
    MapChart,
  ])

createApp(App)
.component('v-chart', ECharts)
.mount('#app')
