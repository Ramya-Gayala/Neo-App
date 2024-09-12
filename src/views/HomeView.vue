<template>
  <section class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center p-4">
    <!-- Heading -->
    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
      Asteroid - Neo Stats
    </h1>

    <!-- Date Picker Form Component -->
    <DatePickerCard
      v-model:startDate="startDate"
      v-model:endDate="endDate"
      @submit="getData"
    />

    <div v-if="loading" class="mt-6">
      <svg class="animate-spin h-8 w-8 text-gray-600 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="8"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
    </div>

    <!-- Asteroid Stats in a Card with 3 Columns -->
    <asteroid-stats
      :fastestSpeed="fastestSpeed"
      :nearestDistance="nearestDistance"
      :averageSize="AverageSize"
      :fastestAsteroidId="fastestAsteroidId"
      :nearestAsteroidId="nearestAsteroidId"
      v-if="!loading && showChart"
    ></asteroid-stats>

    <!-- Chart Section -->
    <chart-card :chartData="chartData" v-if="!loading && showChart"></chart-card>

    <!-- Toast Notification -->
    <div v-if="toastMessage" class="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-lg">
      {{ toastMessage }}
    </div>
  </section>
</template>

<script>
import DatePickerCard from "./DatePickerCard.vue";
import ChartCard from "@/components/ChartCard.vue";
import AsteroidStats from "./AsteroidStats.vue";
import api from "../services/api.js";

export default {
  components: { DatePickerCard, ChartCard, AsteroidStats },
  data() {
    return {
      startDate: null,
      endDate: null,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Number of Asteroids",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      fastestSpeed: null,
      nearestDistance: null,
      AverageSize: null,
      fastestAsteroidId: null,
      nearestAsteroidId: null,
      showChart: false,
      loading: false, // Add loading state
      toastMessage: "", // Add toast message for error handling
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    async getData() {
      if (this.startDate && this.endDate) {
        const formattedStartDate = this.formatDate(this.startDate);
        const formattedEndDate = this.formatDate(this.endDate);

        this.loading = true; // Start loading

        try {
          const response = await api.getAsteroids(
            formattedStartDate,
            formattedEndDate
          );

          // Initialize an empty object to store asteroid counts by date
          const asteroidCounts = {};
          let maxSpeed = 0;
          let nearestDistance = Infinity;
          let totalDiameter = 0;
          let totalAsteroids = 0;
          let fastestAsteroidId = null;
          let nearestAsteroidId = null;

          // Loop through each date in the response
          for (const [date, asteroids] of Object.entries(
            response.data.near_earth_objects
          )) {
            // Count the number of asteroids for this date
            asteroidCounts[date] = asteroids.length;

            // Find the fastest and nearest asteroids
            asteroids.forEach((asteroid) => {
              const speed = parseFloat(
                asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour
              );
              const distance = parseFloat(
                asteroid.close_approach_data[0].miss_distance.kilometers
              );
              const diameter =
                (asteroid.estimated_diameter.kilometers.estimated_diameter_min +
                  asteroid.estimated_diameter.kilometers.estimated_diameter_max) /
                2;

              if (speed > maxSpeed) {
                maxSpeed = speed;
                fastestAsteroidId = asteroid.id;
              }

              if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestAsteroidId = asteroid.id;
              }

              totalDiameter += diameter;
              totalAsteroids++;
            });
          }

          this.fastestSpeed = maxSpeed;
          this.nearestDistance = nearestDistance;
          this.fastestAsteroidId = fastestAsteroidId;
          this.nearestAsteroidId = nearestAsteroidId;
          this.AverageSize = totalAsteroids > 0 ? (totalDiameter / totalAsteroids).toFixed(2) : 0;

          const dates = Object.keys(asteroidCounts);
          const counts = Object.values(asteroidCounts);

          this.showChart = true;
          this.chartData = {
            labels: dates,
            datasets: [
              {
                label: "Number of Asteroids",
                backgroundColor: "#f87979",
                data: counts,
              },
            ],
          };

        } catch (error) {
          this.toastMessage = "Error fetching asteroid data. Please try again.";
          setTimeout(() => {
            this.toastMessage = ""; 
          }, 3000);
        } finally {
          this.loading = false; // End loading
        }
      } else {
        this.toastMessage = "Both start and end dates must be selected.";
        setTimeout(() => {
          this.toastMessage = "";
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
