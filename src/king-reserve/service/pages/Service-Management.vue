<template>
  <section>
    <pv-toast></pv-toast>
    <div class="container-title">
      <h2 class="title">Services</h2>
      <div>
        <div class="button-group-desktop">
          <pv-button
              class="mr-2 title-button btn-new"
              icon="pi pi-plus"
              :label="t('ServiceManagement.new')"
              severity="secondary"
              @click="onNewItemEventHandler"
          ></pv-button>
        </div>
      </div>
    </div>
    <ServiceCreateAndEdit
        :items="service"
        :visible="isVisibleCard"
        :edit="isEdit"
        @canceled="onCanceledEventHandler"
        @saved="onSavedEventHandler"
    />
    <div class="container-cards">
      <div v-for="service in services" :key="service.id" class="card">
        <h3>{{ service.name }}</h3>
        <p>Status: {{ service.status }}</p>
        <pv-button
            icon="pi pi-pencil"
            @click="editService(service)"
            label="Edit"
            class="btn-action"
        />
        <br>
        <br>

        <pv-button
            icon="pi pi-trash"
            @click="deleteService(service.id)"
            label="Delete"
            class="btn-action"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { useI18n } from "vue-i18n";
import { Service } from "../model/service.entity.js";
import ServiceCreateAndEdit from "../components/service-create-and-edit.vue";
import { ServiceApiService } from "@/king-reserve/service/services/ServiceApiService.js";

export default {
  name: "service-management",
  components: { ServiceCreateAndEdit },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      service: {}, // Se usará tanto para crear como editar
      serviceService: new ServiceApiService(),
      services: [],
      isVisibleCard: false,
      isEdit: false,
      submitted: false,
    };
  },
  created() {
    this.getServices();
  },
  methods: {
    async getServices() {
      try {
        const response = await this.serviceService.getAll();
        this.services = response.data.map((s) => new Service(s.id, s.name, s.status));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    },
    onNewItemEventHandler() {
      this.service = {}; // Reiniciar el objeto para crear un nuevo servicio
      this.isEdit = false;
      this.isVisibleCard = true;
    },
    onCanceledEventHandler() {
      this.isVisibleCard = false;
      this.service = {}; // Limpiar el objeto para evitar datos residuales
    },
    async onSavedEventHandler(item) {
      if (this.isEdit) {
        await this.updateService(item);
      } else {
        await this.createService(item);
      }
      this.isVisibleCard = false;
      this.service = {}; // Limpiar el objeto después de guardar
    },
    async createService(item) {
      try {
        const response = await this.serviceService.create(item);
        const exists = this.services.some((s) => s.id === response.data.id);
        if (!exists) {
          this.services.push(new Service(response.data.id, response.data.name, response.data.status));
          this.notifySuccessfulAction("Service Created");
        }
      } catch (error) {
        this.notifyErrorAction("Error creating service: " + error.message);
      }
    },
    async updateService(item) {
      try {
        const response = await this.serviceService.update(item.id, item);

        // Buscar el índice del servicio actualizado en la lista
        const index = this.services.findIndex((service) => service.id === item.id);

        if (index !== -1) {
          // Actualizar el servicio en la lista usando la respuesta del backend
          this.services[index] = {...this.services[index], ...response.data};

          // Crear un nuevo array para forzar la reactividad
          this.services = [...this.services];
        }

        this.notifySuccessfulAction("Service Updated");
      } catch (error) {
        this.notifyErrorAction("Error updating service: " + error.message);
      }
    },
    async deleteService(serviceId) {
      try {
        await this.serviceService.delete(serviceId);
        this.services = this.services.filter(service => service.id !== serviceId);
        this.notifySuccessfulAction("Service Deleted");
      } catch (error) {
        this.notifyErrorAction("Error deleting service: " + error.message);
      }
    },
    editService(service) {
      this.service = {...service}; // Copia el servicio seleccionado para edición
      this.isEdit = true;
      this.isVisibleCard = true;
    },
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },
    notifyErrorAction(message) {
      this.$toast.add({severity: 'error', summary: 'Error', detail: message, life: 3000});
    }
  }
};
</script>

<style scoped>
.container-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 20px;
  width: 100%;
}

.card {
  background-color: #black;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;
}
</style>
