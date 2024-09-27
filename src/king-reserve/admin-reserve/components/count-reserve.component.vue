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
.count-reserve-card {
  background-color: #34d399;
  border: 1px solid #34d399;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-header {
  display: flex;
  align-items: center;
}

.card-icon {
  color: #27AE60;
  font-size: 2em;
  margin-right: 10px;
}

.card-content {
  margin-top: 10px;
  font-size: 1.2em;
  color: #333;
}
</style>