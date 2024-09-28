<template>
  <div class="filter-container">
    <div class="card">
      <pv-stepper orientation="vertical">
        <pv-stepper-panel :header="$t('duration')">
          <template #content="{ prevCallback }">
            <div class="flex flex-column h-12.5rem">
              <div class="surface-border border-round surface-ground flex-auto flex flex-column justify-content-center align-items-center font-medium">

                <div class="flex-auto flex justify-content-center align-items-center font-medium">
                  <div class="input-number-duration ">
                    <p class="custom-paragraph">{{ $t('min') }}</p>
                    <pv-input-number v-model="minValue" showButtons buttonLayout="vertical" style="width: 3rem" :min="0" :max="99">
                      <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                      </template>
                      <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                      </template>
                    </pv-input-number>
                  </div>

                  <div :class="['input-number-duration', { 'hidden': minValue === null }]">
                    <p class="custom-paragraph">{{ $t('max') }}</p>
                    <pv-input-number v-model="maxValue" showButtons buttonLayout="vertical" style="width: 3rem" :min="this.minValue" :max="99">
                      <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                      </template>
                      <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                      </template>
                    </pv-input-number>
                  </div>
                </div>

                <p class="custom-paragraph">{{ $t('durationInDays') }}</p>

              </div>
            </div>
            <div class="flex py-4 container-buttons-actions">
              <pv-button :label="$t('filter')" severity="Primary" class="container-buttons-actions__filter" @click="filterForDuration" />
              <pv-button :label="$t('cancel')" severity="secondary" @click="close" />
            </div>
          </template>
        </pv-stepper-panel>

        <pv-stepper-panel :header="$t('date')">
          <template #content="{ prevCallback }">
            <div class="flex flex-column h-12rem">
              <div class="surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium container-dates">
                <pv-float-label>
                  <pv-calendar class="calendar-dates" v-model="initialDateValue" showIcon iconDisplay="input" inputId="initialDate" />
                  <label for="initialDate">{{ $t('initialDate') }}</label>
                </pv-float-label>

                <pv-float-label>
                  <pv-calendar class="calendar-dates" v-model="finalDateValue" showIcon iconDisplay="input" inputId="finalDate" />
                  <label for="finalDate">{{ $t('finalDate') }}</label>
                </pv-float-label>
              </div>
            </div>
            <div class="flex py-4 container-buttons-actions">
              <pv-button :label="$t('filter')" severity="Primary" class="container-buttons-actions__filter" @click="filterForDate" />
              <pv-button :label="$t('cancel')" severity="secondary" @click="close" />
            </div>
          </template>
        </pv-stepper-panel>
      </pv-stepper>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: "filter-page",
  props: {
    visible: Boolean,
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      minValue: null,
      maxValue: null,
      initialDateValue: null,
      finalDateValue: null,
      datesValue: {},
    };
  },
  methods: {
    close() {
      this.$emit('closeFilter');
    },
    filterForDuration() {
      if (this.minValue != null && this.maxValue != null) {
        this.$emit('filter-duration', { minValue: this.minValue, maxValue: this.maxValue });
        this.close();
      }
    },
    filterForDate() {
      this.datesValue.initial = this.initialDateValue;
      this.datesValue.final = this.finalDateValue;
      this.$emit('filter-date', this.datesValue);
      this.close();
    },
  },
};
</script>

<style scoped>
.filter-container {
  padding: 20px;
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

.input-number-duration {
  overflow: hidden;
  text-align: center;
  margin: 0 15px;
}

.custom-paragraph {
  margin: 10px 0;
}
</style>