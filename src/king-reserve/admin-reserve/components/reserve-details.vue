<script>
import CountPersons from "@/king-reserve/admin-persons/components/count-persons.component.vue";
import CountReserve from "@/king-reserve/admin-reserve/components/count-reserve.component.vue";
import GraficBarCondition from "@/king-reserve/admin-reserve/components/grafic-bar-condition.component.vue";

export default {
  name: "stadistics-total",
  components: {
    GraficBarCondition,
    CountReserve,
    CountPersons,
  }
}
</script>

<template>
  <div class="dashboard">
    <h2>Statistics Overview</h2>
    <div class="dashboard-cards">
      <div class="card">
        <CountPersons />
        <i class="pi pi-users card-icon"></i>
      </div>
      <div class="card">
        <CountReserve />
        <i class="pi pi-chart-bar card-icon"></i>
      </div>
      <div class="card">
        <GraficBarCondition />
        <i class="pi pi-chart-line card-icon"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #34d399;
}

h2 {
  color: #2C3E50;
  margin-bottom: 20px;
  text-align: center;
}

.dashboard-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  background-color: #34d399; /* Green color of the project */
  color: black; /* Black text color */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 30px; /* Increased padding */
  margin: 10px;
  flex: 1;
  min-width: 350px; /* Increased minimum width */
  max-width: 500px; /* Increased maximum width */
  text-align: center;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
  font-size: 1.5rem; /* Increased font size */
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-icon {
  font-size: 3rem; /* Increased icon size */
  color: black; /* White color for icons */
  position: absolute;
  bottom: 10px;
  left: 50%; /* Centered horizontally */
  transform: translateX(-50%); /* Centered horizontally */
}

.card i {
  margin-top: 10px;
}
</style>