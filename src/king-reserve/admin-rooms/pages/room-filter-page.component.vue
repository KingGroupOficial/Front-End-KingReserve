<template>
  <div class="filter-container">
    <div class="card">
      <pv-stepper orientation="vertical">
        <pv-stepper-panel :header="t('room.name')" class="panel-with-large-header">
          <template #content="{ nextCallback }">
            <div class="flex flex-column h-12rem">
              <div class="border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium" id="container-name">
                <pv-icon-field iconPosition="left">
                  <pv-input-icon class="pi pi-search"></pv-input-icon>
                  <pv-input-text :placeholder="t('room.search')" v-model="filterNameValue" @change="filterForName" />
                </pv-icon-field>
                <p class="custom-paragraph">{{ t('room.searchDescription') }}</p>
              </div>
            </div>
            <div class="flex py-4 container-buttons-actions">
              <pv-button :label="t('room.filter')" severity="Primary" class="container-buttons-actions__filter" @click="filterForName" />
              <pv-button :label="t('room.cancel')" severity="secondary" @click="close" />
            </div>
          </template>
        </pv-stepper-panel>

        <pv-stepper-panel :header="t('room.status')">
          <template #content="{ prevCallback, nextCallback }">
            <div class="flex flex-column h-12rem">
              <div class="border-round surface-ground flex-auto flex align-items-center font-medium" id="container-condition">
                <div class="flex flex-column gap-2 container-radio-buttons flex">
                  <p>{{ t('room.selectCondition') }}</p>
                  <div v-for="(condition, index) in status" :key="index" class="flex align-items-center gap-2" :style="{ margin: '5px 0' }">
                    <pv-radio-button v-model="selectedStatus" :inputId="'status_' + index" name="condition" :value="condition.name" />
                    <label :for="'status_' + index">{{ condition.name }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex py-4 container-buttons-actions">
              <pv-button :label="t('room.filter')" severity="Primary" class="container-buttons-actions__filter" @click="filterForStatus" />
              <pv-button :label="t('room.cancel')" severity="secondary" @click="close" />
            </div>
          </template>
        </pv-stepper-panel>

        <pv-stepper-panel :header="t('room.area')">
          <template #content="{ prevCallback }">
            <div class="flex flex-column h-12.5rem">
              <div class="surface-border border-round surface-ground flex-auto flex flex-column justify-content-center align-items-center font-medium">
                <div class="flex-auto flex justify-content-center align-items-center font-medium">
                  <div class="input-number-duration">
                    <p class="custom-paragraph">{{ t('room.min') }}</p>
                    <pv-input-number v-model="minValue" showButtons buttonLayout="vertical" style="width: 3rem" :min="0" :max="9999">
                      <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                      </template>
                      <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                      </template>
                    </pv-input-number>
                  </div>

                  <div :class="['input-number-duration', { 'hidden': minValue === null }]">
                    <p class="custom-paragraph">{{ t('room.max') }}</p>
                    <pv-input-number v-model="maxValue" showButtons buttonLayout="vertical" style="width: 3rem" :min="minValue" :max="9999">
                      <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                      </template>
                      <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                      </template>
                    </pv-input-number>
                  </div>
                </div>

                <p class="custom-paragraph">{{ t('room.areaDescription') }}</p>
              </div>
            </div>
            <div class="flex py-4 container-buttons-actions">
              <pv-button :label="t('room.filter')" severity="Primary" class="container-buttons-actions__filter" @click="filterForArea" />
              <pv-button :label="t('room.cancel')" severity="secondary" @click="close" />
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
  name: "room-filter-page",
  props: {
    visible: Boolean
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      status: [
        { name: 'In process' },
        { name: 'Waiting' },
        { name: 'Completed' }
      ],
      selectedStatus: null,
      filterNameValue: null,
      minmaxValues: {},
      minValue: null,
      maxValue: null
    };
  },
  methods: {
    close() {
      this.$emit('closeFilter');
    },
    filterForName() {
      if (this.filterNameValue !== null) {
        this.$emit('filter1', this.filterNameValue);
        this.close();
      }
    },
    filterForStatus() {
      if (this.selectedStatus) {
        this.$emit('filter-status', this.selectedStatus);
        this.close();
      }
    },
    filterForArea() {
      if (this.minValue != null) {
        this.minmaxValues.minValue = this.minValue;
        this.minmaxValues.maxValue = this.maxValue;
        this.$emit('filter-area', this.minmaxValues);
        this.close();
      }
    }
  }
}
</script>

<style scoped>
.filter-container {
  padding: 20px;
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
</style>