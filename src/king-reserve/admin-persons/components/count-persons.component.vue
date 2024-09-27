<template>
  <div class="count-persons-card">
    <div class="card-header">
      <i class="fas fa-users card-icon"></i>
      <h3>Total Persons</h3>
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
.count-persons-card {
  background-color: #34d399; /* Fondo blanco para la carta */
  border: 1px solid #34d399; /* Borde gris claro */
  border-radius: 8px; /* Bordes redondeados */
  padding: 20px; /* Espaciado interno */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-header {
  display: flex;
  align-items: center;
}

.card-icon {
  color: #27AE60; /* Color del ícono */
  font-size: 2em; /* Tamaño del ícono */
  margin-right: 10px; /* Espacio a la derecha del ícono */
}

.card-content {
  margin-top: 10px; /* Espacio superior para el contenido */
  font-size: 1.2em; /* Tamaño de texto del contenido */
  color: #333; /* Color del texto */
}
</style>
