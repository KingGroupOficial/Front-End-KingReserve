<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { ReserveApiService } from "@/king-reserve/admin-reserve/services/reserve-api.service.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default {
  name: "grafic-bar-condition",
  components: {
    BarChart: Bar
  },
  data() {
    return {
      conditionData: {
        labels: [], // Inicializa como un array vacío
        datasets: [
          {
            label: 'Reservation Conditions',
            backgroundColor: '#42A5F5',
            data: [] // Inicializa como un array vacío
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      isLoading: true
    };
  },

  created() {
    this.reserveService = new ReserveApiService(); // Inicializa el servicio
    this.fetchConditionData(); // Llama a la función para obtener datos
  },
  methods: {
    async fetchConditionData() {
      try {
        const data = await this.reserveService.getReserveConditionCount();
        console.log("Raw data from API:", data); // Registra los datos crudos para ver su estructura
        this.conditionData.labels = Object.keys(data);
        this.conditionData.datasets[0].data = Object.values(data);

        // Registra la cantidad de cada condición
        console.log("Condition Counts:");
        this.conditionData.labels.forEach((label, index) => {
          console.log(`${label}: ${this.conditionData.datasets[0].data[index]}`);
        });
      } catch (error) {
        console.error("Error fetching reservation conditions:", error);
      } finally {
        this.isLoading = false;
      }
    }

  }
};
</script>

<template>
  <div class="grafic-bar-condition">
    <h3>Reservation Conditions</h3>
    <BarChart v-if="!isLoading && conditionData.labels.length > 0"
              :chart-data="conditionData"
              :options="chartOptions"
              style="height: 400px;">
    </BarChart>
    <p v-else-if="isLoading">Loading...</p>
    <p v-else>No data available.</p>
  </div>
</template>


<style scoped>
.grafic-bar-condition {
  margin: 20px;
}

h3 {
  color: #2C3E50;
  margin-bottom: 20px;
}
</style>
