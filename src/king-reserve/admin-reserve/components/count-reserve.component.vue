<script>
import { ReserveApiService } from "@/king-reserve/admin-reserve/services/reserve-api.service.js";

export default {
  name: "count-reserve",
  data() {
    return {
      totalReserves: 0
    };
  },
  created() {
    this.reserveService = new ReserveApiService();
    this.fetchTotalReserves();
  },
  methods: {
    async fetchTotalReserves() {
      try {
        this.totalReserves = await this.reserveService.getTotalReserves();
      } catch (error) {
        console.error("Error fetching total reserves:", error);
      }
    }
  }
};
</script>

<template>
  <div class="count-reserve-card">
    <div class="card-header">
      <i class="fas fa-calendar-check card-icon"></i>
      <h3>Total Reservations</h3>
    </div>
    <div class="card-content">
      <p><strong>{{ totalReserves }}</strong></p>
    </div>
  </div>
</template>

<style scoped>
h3 {
  color: black;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.8rem; /* Increased font size */
}

p {
  color: black;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.8rem; /* Increased font size */
}
</style>