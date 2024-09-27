<script>
export default {
  name: "filter-page-component",
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      minValue: null,
      maxValue: null,
      initialDateValue: null,
      finalDateValue: null
    };
  },
  methods: {
    selectReservation(reservation) {
      this.$emit('reservationSelected', reservation.id);
    },
    filterForDuration() {
      this.$emit('filteredDuration', { minValue: this.minValue, maxValue: this.maxValue });
      this.close();
    },
    filterForDate() {
      this.$emit('filteredDate', { initial: this.initialDateValue, final: this.finalDateValue });
      this.close();
    },
    close() {
      this.$emit('canceled');
    }
  }
};
</script>

<template>
  <div :class="['filter-content', { 'visible': visible }]">
    <button class="button-close" @click="close">X</button>
    <pv-stepper>
      <pv-stepper-panel header="Duration">
        <template #content="{ prevCallback }">
          <div class="flex flex-column h-12rem">
            <div class="surface-border border-round surface-ground flex-auto flex flex-column justify-content-center align-items-center font-medium">
              <div class="flex-auto flex justify-content-center align-items-center font-medium">
                <div class="input-number-duration">
                  <p class="custom-paragraph">MIN</p>
                  <pv-input-number v-model="minValue" showButtons buttonLayout="vertical" style="width: 3rem" :min="0" :max="99">
                    <template #incrementbuttonicon>
                      <span class="pi pi-plus"/>
                    </template>
                    <template #decrementbuttonicon>
                      <span class="pi pi-minus"/>
                    </template>
                  </pv-input-number>
                </div>
                <div :class="['input-number-duration', { 'hidden': minValue === null }]">
                  <p class="custom-paragraph">MAX</p>
                  <pv-input-number v-model="maxValue" showButtons buttonLayout="vertical" style="width: 3rem" :min="this.minValue" :max="99">
                    <template #incrementbuttonicon>
                      <span class="pi pi-plus"/>
                    </template>
                    <template #decrementbuttonicon>
                      <span class="pi pi-minus"/>
                    </template>
                  </pv-input-number>
                </div>
              </div>
              <p class="custom-paragraph">The duration is in days</p>
            </div>
          </div>
          <div class="flex py-4 container-buttons-actions">
            <pv-button label="Filter" severity="Primary" class="container-buttons-actions__filter" @click="filterForDuration"/>
            <pv-button label="Cancel" severity="secondary" @click="close"/>
          </div>
        </template>
      </pv-stepper-panel>
      <pv-stepper-panel header="Date">
        <template #content="{ prevCallback }">
          <div class="flex flex-column h-12rem">
            <div class="surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium container-dates">
              <pv-float-label>
                <pv-calendar class="calendar-dates" v-model="initialDateValue" showIcon iconDisplay="input" touchUI inputId="toDate"/>
                <label for="toDate">Initial Date</label>
              </pv-float-label>
              <pv-float-label>
                <pv-calendar class="calendar-dates" v-model="finalDateValue" showIcon iconDisplay="input" touchUI inputId="toDate"/>
                <label for="toDate">Final Date</label>
              </pv-float-label>
            </div>
          </div>
          <div class="flex py-4 container-buttons-actions">
            <pv-button label="Filter" severity="Primary" class="container-buttons-actions__filter" @click="filterForDate"/>
            <pv-button label="Cancel" severity="secondary" @click="close"/>
          </div>
        </template>
      </pv-stepper-panel>
    </pv-stepper>
  </div>
</template>

<style scoped>
/* Posicionamos el filtro fuera de la vista inicialmente */
.filter-content {
  position: absolute;
  top: 0;
  left: -100%;
  width: 80%;
  max-width: 500px;
  height: 100%;
  padding: 20px;
  background: white;
  transition: left 0.5s ease-in-out; /* Animación suave de deslizamiento */
  z-index: 1000;
}

.filter-content.visible {
  left: 0; /* Cuando el filtro esté visible, se desliza a la izquierda */
}

.button-close {
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  margin-top: 5px;
  margin-left: 5px;
}

.button-close:hover {
  background-color: #27272a;
  color: #ffffff;
}

.container-buttons-actions {
  gap: 5px;
}

.container-buttons-actions__filter {
  background-color: transparent;
  border: 1px solid #34d399;
  color: white;
}

.container-buttons-actions__filter:hover {
  background-color: #34d399;
  border: 1px solid #34d399;
  color: #27272a;
}

#container-name {
  flex-direction: column;
  overflow: hidden;
}

.custom-paragraph {
  width: 80%;
  height: auto;
  text-align: center;
  line-height: normal;
  opacity: 80%;
}

.container-radio-buttons {
  padding: 15px;
}

.container-radio-buttons p {
  opacity: 80%;
}

.input-number-duration {
  overflow: hidden;
  text-align: center;
  margin: 0 15px;
}

.container-dates {
  flex-direction: column;
  gap: 30px;
  align-items: center;
}

.calendar-dates:hover {
  cursor: pointer;
}

.hidden {
  display: none;
}
</style>
