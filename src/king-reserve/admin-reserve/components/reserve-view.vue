<script>
import { useI18n } from 'vue-i18n';
import { Reservation } from "@/king-reserve/admin-reserve/model/reserve.entity.js";

export default {
  name: "reserve-view",
  props: {
    reserve: {
      type: Object,
      required: true
    }
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      items: [
        {
          label: 'Update',
          icon: 'pi pi-pencil',
          command: () => {
            this.$emit('Edit', this.reserve);
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            this.$emit('Delete', this.reserve);
          }
        }
      ]
    };
  },
  methods: {
    viewMore() {
      this.$emit('viewMore', this.reserve);
    },
    formatDate(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    },
    getConditionClass(condition) {
      if (condition === 'Good') {
        return 'good';
      } else if (condition === 'Warning') {
        return 'warning';
      } else {
        return 'bad';
      }
    }
  }
};
</script>

<template>
  <div :style="{ position: 'relative'} ">
    <pv-toast/>
    <pv-speed-dial :model="items" direction="down" mask :style="{ right: '-10px', top: '-15px' }"/>

    <pv-card class="custom-card">
      <template #title>
        <p class="card-title" v-if="reserve"> {{ reserve.name }}</p>
      </template>

      <template #content>
        <div class="card-content" v-if="reserve">
          <!-- Primera fila -->
          <div class="row">
            <div>
              <p>{{ t('start') }}</p>
              <p>{{ formatDate(reserve.dateStart) }}</p>
            </div>

            <div>
              <p>{{ t('end') }}</p>
              <p>{{ formatDate(reserve.dateEnd) }}</p>
            </div>
          </div>

          <!-- Segunda fila -->
          <div class="row">
            <div>
              <p>{{ t('duration') }}</p>
              <p>{{ reserve.duration }} {{ t('days') }}</p>
            </div>
          </div>

          <div class="state" :class="getConditionClass(reserve.condition)">
            <p>{{ t('condition') }}</p>
            <p>{{ reserve.condition }}</p>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="card-footer" v-if="reserve">
          <pv-button label="View More" class="w-full" @click="viewMore"/>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.custom-card {
  width: 18rem; /* Ajusta el tamaño según sea necesario */
  height: auto; /* Permite que la altura se ajuste al contenido */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  margin: 1rem; /* Espaciado entre cartas */
  background-color: #1e1e1e; /* Fondo oscuro */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para profundidad */
}

.card-title {
  font-size: 1.5rem; /* Tamaño de fuente para el título */
  color: #ffffff; /* Color del texto */
  margin-bottom: 0.5rem; /* Espaciado inferior */
}

.card-content {
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 0.5rem; /* Espaciado superior */
  color: #ffffff; /* Color del texto */
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem; /* Espaciado entre filas */
}

.card-footer {
  margin-top: auto; /* Empuja el pie hacia abajo */
}

.pv-button {
  background-color: #00bcd4; /* Color de fondo del botón */
  color: #ffffff; /* Color del texto del botón */
  border: none; /* Sin borde */
  border-radius: 4px; /* Bordes redondeados */
  padding: 0.5rem 1rem; /* Espaciado interno */
  cursor: pointer; /* Cambia el cursor al pasar el ratón */
  transition: background-color 0.3s; /* Transición suave */
}

.pv-button:hover {
  background-color: #0097a7; /* Color al pasar el ratón */
}

.state {
  font-weight: bold; /* Negrita para el estado */
}

.state.good {
  color: green; /* Color para estado bueno */
}

.state.warning {
  color: orange; /* Color para estado de advertencia */
}

.state.bad {
  color: red; /* Color para estado malo */
}
</style>