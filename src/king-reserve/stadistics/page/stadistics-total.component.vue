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
  <div>
    <h2>Statistics Overview</h2>
    <CountPersons />
    <CountReserve />
  </div>
</template>

<style scoped>
h2 {
  color: #2C3E50;
  margin-bottom: 20px;
}
</style>