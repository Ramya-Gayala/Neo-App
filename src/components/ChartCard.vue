<template>
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 lg:p-8 w-full max-w-screen-xl">
      <Line :data="chartData" :options="chartData.options" ref="myChart" />
    </div>
  </template>
  
  <script>
  import { Line } from "vue-chartjs";
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  
  export default {
    name: "ChartCard",
    components: { Line },
    props: {
      chartData: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  

  