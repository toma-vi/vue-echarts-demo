<template>
  <div>
    <v-chart
      class="chart"
      ref="map"
      :option="option"
      @selectchanged="selectchanged"
      autoresize
    />
    <div>
      <button v-on:click="onClick">汐止區</button>
      <button v-on:click="onClick">土城區</button>
      <button v-on:click="onClick">雙溪區</button>
      <button v-on:click="onClick">鶯歌區</button>
      <button v-on:click="onClick">萬里區</button>
      <button v-on:click="onClick">三重區</button>
      <button v-on:click="onClick">中和區</button>
      <button v-on:click="onClick">八里區</button>
    </div>
    <div>{{ selected }}</div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from "vue"
import { registerMap } from "echarts"
import geoJsonNtpc from "./geojson/ntpc.json"

const map = ref(null)
const selected = ref("")

const props = defineProps(["stats", "title"])
registerMap("ntpc", geoJsonNtpc)

const data = [
  { value: 1, name: "土城區" },
  { value: 88, name: "雙溪區" },
  { value: 111, name: "鶯歌區" },
  { value: 88, name: "萬里區" },
  { value: 77, name: "三重區" },
  { value: 777, name: "中和區" },
  { value: 66, name: "八里區" },
  { value: 111, name: "蘆洲區" },
  { value: 55, name: "林口區" },
  { value: 111, name: "汐止區" },
  { value: 12, name: "泰山區" },
  { value: 111, name: "淡水區" },
  { value: 43, name: "瑞芳區" },
  { value: 111, name: "石碇區" },
  { value: 1111, name: "石門區" },
  { value: 111, name: "五股區" },
  { value: 53, name: "平溪區" },
  { value: 43, name: "貢寮區" },
  { value: 111, name: "坪林區" },
  { value: 11, name: "金山區" },
  { value: 999, name: "三芝區" },
  { value: 444, name: "永和區" },
  { value: 111, name: "新店區" },
  { value: 555, name: "板橋區" },
  { value: 22, name: "樹林區" },
  { value: 666, name: "深坑區" },
  { value: 33, name: "三峽區" },
  { value: 888, name: "烏來區" },
  { value: 44, name: "新莊區" },
]
const maxValue = data
  .map((v) => v.value)
  .reduce((max, v) => Math.max(max, v), 0)
// console.log(data)

const option = computed(() => {
  return {
    title: {
      text: props.title,
      left: "center",
    },
    // https://echarts.apache.org/en/option.html#tooltip
    tooltip: {
      trigger: "item",
      // https://echarts.apache.org/en/option.html#tooltip.formatter
      formatter: (params) => {
        const { value } = params
        return `總測量 <br/> ${isNaN(value) ? 0 : value} 人`
      },
    },
    // https://echarts.apache.org/en/option.html#visualMap
    visualMap: {
      min: 0,
      max: maxValue,
      text: ["High", "Low"],
      realtime: false,
      calculable: false,
      inRange: {
        color: ["lightskyblue", "yellow", "orangered"],
      },
    },
    series: [
      {
        // https://echarts.apache.org/en/option.html#series-map
        name: props.title,
        type: "map",
        map: "ntpc",
        data,
        label: { show: true, fontSize: 10 },
        nameProperty: "TOWN",

        // nameMap: {
        //   土城區: "土城",
        //   雙溪區: "雙溪",
        //   鶯歌區: "鶯歌",
        //   萬里區: "萬里",
        //   三重區: "三重",
        //   中和區: "中和",
        //   八里區: "八里",
        //   蘆洲區: "蘆洲",
        //   林口區: "林口",
        //   汐止區: "汐止",
        //   泰山區: "泰山",
        //   淡水區: "淡水",
        //   瑞芳區: "瑞芳",
        //   石碇區: "石碇",
        //   石門區: "石門",
        //   五股區: "五股",
        //   平溪區: "平溪",
        //   貢寮區: "貢寮",
        //   坪林區: "坪林",
        //   金山區: "金山",
        //   三芝區: "三芝",
        //   永和區: "永和",
        //   新店區: "新店",
        //   板橋區: "板橋",
        //   樹林區: "樹林",
        //   深坑區: "深坑",
        //   三峽區: "三峽",
        //   烏來區: "烏來",
        //   新莊區: "新莊",
        // },
      },
    ],
  }
})

const selectchanged = (params) => {
  // console.log(params)
  if (params.selected.length) {
    // console.log(params.selected[0])
    // console.log(params.selected[0].dataIndex[0])
    // console.log(data[params.selected[0].dataIndex[0]].name)
    selected.value = data[params.selected[0].dataIndex[0]].name
  } else {
    selected.value = ""
  }
}

const onClick = (e) => {
  map.value.dispatchAction({
    type: "select",
    name: e.target.innerText,
  })
}
</script>

<style scoped>
.chart {
  height: 80vh;
}
</style>
