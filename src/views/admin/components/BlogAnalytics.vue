<script setup>
import { ref, onMounted, watch } from "vue";
import axios from 'axios';
import Chart from 'primevue/chart';

const blogData = ref({
  labels: [],
  datasets: []
});

const selectedType = ref("daily"); // Default filter type
const selectedYear = ref(new Date().getFullYear()); // Default current year
const availableYears = ref([]); // To store dynamic years
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const fetchYears = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/available-years", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      withCredentials: true
    });
    availableYears.value = response.data.data;
  } catch (error) {
    console.error("Error fetching years:", error.message);
  }
};

const fetchBlogData = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/getblog-analytics/?year=${selectedYear.value}&type=${selectedType.value}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    const result = response.data;

    let labels, totals;

    if (selectedType.value === "daily") {
      labels = result.data.map(item => item.date);
      totals = result.data.map(item => item.total);
    } else { // Monthly view
      labels = result.data.map(item => item.month);
      totals = result.data.map(item => item.total);
    }

    blogData.value = {
      labels,
      datasets: [
        {
          label: selectedType.value === "daily" ? "Total Blogs Per Day" : "Total Blogs Per Month",
          backgroundColor: "#42A5F5",
          borderColor: "#1E88E5",
          data: totals
        }
      ]
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(async () => {
  await fetchYears();
  await fetchBlogData();
});

watch([selectedType, selectedYear], fetchBlogData);
</script>

<template>
  <div class="mx-20">
    <h3>Blog Analytics</h3>
    <div class="filters">
      <select v-model="selectedType">
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
      </select>

      <select v-model="selectedYear">
        <option v-for="year in availableYears" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
    </div>

    <Chart type="bar" :data="blogData" :options="chartOptions" style="height: 400px; width: 100%" />
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
</style>