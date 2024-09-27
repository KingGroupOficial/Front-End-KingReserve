
<template>
  <div class="chart-container">
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { ReserveApiService } from "@/king-reserve/admin-reserve/services/reserve-api.service.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChartComponent',
  components: {
    Bar
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
  },
  async mounted() {
    await this.loadReservesByCondition();
  },
  methods: {
    async loadReservesByCondition() {
      try {
        const reserveApiService = new ReserveApiService();
        const conditionCounts = await reserveApiService.getReservesCountByCondition();
        if (conditionCounts) {
          this.chartData = {
            labels: ['Finished', 'Active'],
            datasets: [{
              label: 'Number of Reservations',
              backgroundColor: ['#4CAF50', '#FFC107'],
              data: [
                conditionCounts.Finished || 0,
                conditionCounts.Active || 0
              ]
            }]
          };
        }
      } catch (error) {
        console.error('Error loading reserves by condition:', error);
      }
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}


</style>