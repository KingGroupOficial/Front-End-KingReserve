
<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "room-create-and-edit",
  components: { createAndEdit },
  props: {
    item: Object, // Corrige para asegurar que se espera un objeto
    visible: Boolean,
    edit: Boolean
  },
  data() {
    return {
      reservationId: null,
      submitted: false,
      statusOptions: [
        { label: 'Available', value: 0 },
        { label: 'Reserved', value: 1 },
        { label: 'Occupied', value: 2 },
        { label: 'Completed', value: 3 },
        { label: 'Waiting', value: 4 }
      ]
    };
  },
  created() {
    this.reservationId = parseInt(this.$route.params.reservationId, 10);
    if (isNaN(this.reservationId)) {
      console.error("reservationId no está definido en la ruta o no es un número válido");
    }
  },
  methods: {
    canceledEventHandler() {
      this.$emit("canceled");
      this.submitted = false;
    },
    savedEventHandler() {
      console.log("Preparando datos para guardar:", this.item);

      // Asegúrate de que los datos estén en el formato esperado
      const transformedItem = {
        name: this.item.name,
        area: parseInt(this.item.area, 10), // Convertir área a número entero
        status: typeof this.item.status === 'object' ? this.item.status.value : this.item.status // Convertir status a número
      };

      console.log("Datos transformados para enviar al backend:", transformedItem);

      // Validación de campos obligatorios
      if (!transformedItem.name || isNaN(transformedItem.area) || transformedItem.status === undefined) {
        console.error("Validación fallida: Campos obligatorios faltantes.", transformedItem);
        this.error = "Please fill in all required fields.";
        return;
      }

      // Emitir evento con datos transformados
      this.$emit("saved", transformedItem);
    }


  }
};
</script>



<template>
  <create-and-edit :entity="item" :edit="edit" :visible="visible" entityName="Room" @canceled="canceledEventHandler"
                   @saved="savedEventHandler">
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <label for="name" class="label-input">Name</label>
          <pv-float-label>
            <pv-input-text id="name" v-model="item.name" :class="{'p-invalid': submitted && !item.name}"/>
            <small v-if="submitted && !item.name" class="p-invalid">Name is required.</small>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <label for="area" class="label-input">Area</label>
          <pv-float-label>
            <pv-input-number v-model="item.area" inputId="area" mode="decimal" showButtons :step="10" :min="0"/>
            <small v-if="!submitted" class="down-input-label">Area is in meters.</small>
            <small v-if="submitted && !item.area" class="p-invalid">Area is required.</small>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <label for="status" class="label-input">Status</label>
          <pv-float-label>
            <pv-dropdown v-model="item.status" inputId="status" :options="statusOptions" optionLabel="label"
                         placeholder="Select a Status"
                         :class="{'p-invalid': submitted && !item.status}"/>
            <small v-if="submitted && !item.status" class="p-invalid">Status is required.</small>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>
.label-input {
  font-size: 15px;
}

.down-input-label {
  color: #CACEDE;
  font-weight: 300;
}
</style>