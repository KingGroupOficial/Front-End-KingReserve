<template>
  <div class="count-persons-card">
    <div class="card-header">
      <i class="fas fa-users card-icon"></i>
      <h3>Personas Hospedadas</h3>
    </div>
    <div class="card-content">
      <p> <strong>{{ totalPersons }}</strong></p>
    </div>
  </div>
</template>

<script>
import { PersonApiService } from "@/king-reserve/admin-persons/services/person-api.services.js";

export default {
  name: "count-persons",
  data() {
    return {
      totalPersons: 0
    };
  },
  created() {
    this.personService = new PersonApiService();
    this.fetchTotalPersons();
  },
  methods: {
    async fetchTotalPersons() {
      try {
        this.totalPersons = await this.personService.getTotalPersons();
      } catch (error) {
        console.error("Error fetching total persons:", error);
      }
    }
  }
};
</script>

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
