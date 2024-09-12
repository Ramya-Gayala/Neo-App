<template>
  <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 md:p-6 lg:p-8 w-full max-w-screen-xl mb-6">
    <div class="flex flex-col lg:flex-row lg:space-x-6 mb-6">
      <div class="flex-1 mb-4 lg:mb-0">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
        <VueDatePicker
          v-model="localStartDate"
          :enable-time-picker="false"
          class="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Select Start Date"
        />
      </div>
      <div class="flex-1 mb-4 lg:mb-0">
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">End Date</label>
        <VueDatePicker
          v-model="localEndDate"
          :enable-time-picker="false"
          :disabled-dates="disabledDates"
          class="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Select End Date"
        />
      </div>
    </div>
    <div class="flex justify-center">
      <button
        type="button"
        class="px-4 py-2 md:px-6 md:py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        @click="submitDates"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },
  props: {
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    },
  },
  data() {
    return {
      localStartDate: this.startDate,
      localEndDate: this.endDate
    };
  },
  watch: {
    startDate(newVal) {
      this.localStartDate = newVal;
    },
    endDate(newVal) {
      this.localEndDate = newVal;
    },
    localStartDate(newVal) {
      this.$emit('update:startDate', newVal);
    },
    localEndDate(newVal) {
      this.$emit('update:endDate', newVal);
    }
  },
  computed: {
    disabledDates() {
      return (date) => {
        if (!this.localStartDate) {
          return true;
        }
        const maxDate = new Date(this.localStartDate);
        maxDate.setDate(maxDate.getDate() + 7);
        return date < this.localStartDate || date > maxDate;
      };
    },
  },
  methods: {
    submitDates() {
      this.$emit('submit');
    }
  }
};
</script>
