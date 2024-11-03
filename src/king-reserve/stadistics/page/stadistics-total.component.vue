<script>
import { useI18n } from 'vue-i18n';
import CountPersons from "@/king-reserve/admin-persons/components/count-persons.component.vue";
import CountReserve from "@/king-reserve/admin-reserve/components/count-reserve.component.vue";
import GraficBarCondition from "@/king-reserve/admin-reserve/components/grafic-bar-condition.component.vue";

export default {
  name: "stadistics-total",
  components: {
    GraficBarCondition,
    CountReserve,
    CountPersons,
  },
  setup() {
    const {t} = useI18n();
    return {t};
  }
}
</script>

<template>
  <div class="container">
  <div class="dashboard">
    <h2>{{ t('statisticsOverview') }}</h2>
    <br>
    <div class="dashboard-cards">
      <div class="card">
        <i class="pi pi-users card-icon"></i>
        <CountPersons/>
      </div>
      <div class="card">
        <i class="pi pi-chart-bar card-icon"></i>
        <CountReserve/>
      </div>
      <div class="card">
        <i class="pi pi-chart-line card-icon"></i>
        <GraficBarCondition/>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
}

h2 {
  color: white;
  margin-bottom: 20px;
  text-align: center;
  font-size: 3rem;
}

.dashboard-cards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  text-align: center;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-icon {
  font-size: 2rem;
  color: #f4a261; /* Naranja del proyecto */
  position: absolute;
  top: 10px;
  right: 10px;
}

.card-icon:hover {
  color: #e76f51; /* Naranja oscuro al hover */
}

.card i {
  margin-bottom: 10px;
}

.container {
  background-color: var(--main-bg-color);
}
</style>