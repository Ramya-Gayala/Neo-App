<template>
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8 w-full max-w-screen-xl mb-6">
    <!-- Header -->
    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Neo Feed</h2>

    <!-- Stats Section -->
    <div class="space-y-4">
      <!-- Fastest Asteroid -->
      <div class="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
        <span class="bg-indigo-500 text-white p-3 rounded-full">
          🚀
        </span>
        <div class="ml-4">
          <div class="text-lg font-medium text-gray-700 dark:text-gray-300">Fastest Asteroid</div>
          <div class="text-lg text-gray-500 dark:text-gray-400">ID: {{ fastestAsteroidId }}</div>
        </div>
        <div class="ml-auto text-lg font-bold text-gray-700 dark:text-gray-300">
          {{ fastestSpeed.toLocaleString() }} km/h
        </div>
      </div>

      <!-- Nearest Asteroid -->
      <div class="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
        <span class="bg-red-500 text-white p-3 rounded-full">
          📍
        </span>
        <div class="ml-4">
          <div class="text-lg font-medium text-gray-700 dark:text-gray-300">Nearest Asteroid</div>
          <div class="text-lg text-gray-500 dark:text-gray-400">ID: {{ nearestAsteroidId }}</div>
        </div>
        <div class="ml-auto text-lg font-bold text-gray-700 dark:text-gray-300">
          {{ nearestDistance.toLocaleString() }} km
        </div>
      </div>

      <!-- Average Asteroid Size -->
      <div class="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
        <span class="bg-green-500 text-white p-3 rounded-full">
          📏
        </span>
        <div class="ml-4">
          <div class="text-lg font-medium text-gray-700 dark:text-gray-300">Average Asteroid Size</div>
        </div>
        <div class="ml-auto text-lg font-bold text-gray-700 dark:text-gray-300">
          {{ averageSize.toLocaleString() }} km
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AsteroidStats",
  props: {
    fastestSpeed: {
      type: Number,
      required: true,
    },
    nearestDistance: {
      type: Number,
      required: true,
    },
    averageSize: {
      type: Number,
      required: true,
    },
    nearestAsteroidId: {
      type: Number,
      required: true,
    },
    fastestAsteroidId: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
