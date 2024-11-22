<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";
import { ReserveApiService } from "../services/reserve-api.service.js";

export default {
  name: "reserve-create-and-edit",
  components: { createAndEdit },
  props: {
    item: null, // Datos iniciales de la reserva
    visible: Boolean,
    edit: Boolean,
  },
  data() {
    return {
      submitted: false,
      dateError: "", // Para validación de fechas
    };
  },
  methods: {
    canceledEventHandler() {
      this.$emit("canceled");
      this.submitted = false;
    },
    savedEventHandler() {
      // Asignar `userId` desde el localStorage
      this.item.userId = parseInt(localStorage.getItem("userIDSIGN"), 10);

      // Formatear las fechas a string en formato yyyy-mm-dd
      this.item.dateStart = this.formatDate(this.item.dateStart);
      this.item.dateEnd = this.formatDate(this.item.dateEnd);

      console.log("Datos enviados para la reserva:", this.item);

      this.submitted = true;

      // Validar campos requeridos
      if (this.item.name && this.validateDates()) {
        this.$emit("saved2", this.item); // Emitir evento de guardado con los datos necesarios
      }
    },
    // Función para formatear la fecha
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0'); // El mes comienza en 0
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    validateDates() {
      // Validar que la fecha de inicio sea menor a la fecha de fin
      if (this.item.dateEnd <= this.item.dateStart) {
        this.dateError = "End date must be after start date.";
        return false;
      }
      this.dateError = "";
      return true;
    },
    async changeCondition(reserveId, condition) {
      try {
        const reserveApiService = new ReserveApiService();
        if (condition === 'Finished') {
          await reserveApiService.setConditionFinished(reserveId);
        } else if (condition === 'Active') {
          await reserveApiService.setConditionActive(reserveId);
        }
        console.log(`Condition changed to ${condition} for reserveId: ${reserveId}`);
      } catch (error) {
        console.error('Error changing condition:', error);
      }
    }
  }
};
</script>

<template>
  <create-and-edit
      :entity="item"
      :edit="edit"
      :visible="visible"
      entityName="Reservation"
      @canceled="canceledEventHandler"
      @saved="savedEventHandler"
  >
    <template #content>
      <div class="p-fluid">
        <!-- Campo para el nombre -->
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text
                id="name"
                v-model="item.name"
                :class="{ 'p-invalid': submitted && !item.name }"
            />
            <small v-if="submitted && !item.name" class="p-invalid">
              Name is required.
            </small>
          </pv-float-label>
        </div>

        <!-- Campo para fecha de inicio -->
        <div class="field mt-5">
          <pv-float-label>
            <pv-calendar
                inputId="date-start"
                v-model="item.dateStart"
                dateFormat="yy-mm-dd"
                showIcon
                iconDisplay="input"
            />
            <label for="date-start">Date Start</label>
          </pv-float-label>
        </div>

        <!-- Campo para fecha de fin -->
        <div class="field mt-5">
          <pv-float-label>
            <pv-calendar
                inputId="date-end"
                v-model="item.dateEnd"
                dateFormat="yy-mm-dd"
                showIcon
                iconDisplay="input"
            />
            <label for="date-end">Date End</label>
            <small v-if="submitted && dateError" class="p-invalid">
              {{ dateError }}
            </small>
          </pv-float-label>
        </div>

        <!-- Botones para cambiar la condición de la reserva, solo en modo edición -->
        <div v-if="edit" class="field mt-5">
          <pv-button
              label="Mark as Finished"
              class="p-button-success"
              @click="changeCondition(item.id, 'Finished')"
          />
          <pv-button
              label="Mark as Active"
              class="p-button-info"
              @click="changeCondition(item.id, 'Active')"
          />
        </div>
      </div>
    </template>
  </create-and-edit>
</template>



<style scoped>
</style>
