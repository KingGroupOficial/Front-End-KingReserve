<script>
import { useI18n } from "vue-i18n";
import {Service} from "@/king-reserve/service/model/service.entity.js"

export default {
  name: "service-view",
  components: {


  },
  props: {
    service: Service
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data(){
    return {
      items: [
        {
          label: 'Update',
          icon: 'pi pi-pencil',
          command: () => {
            this.$emit('Edit', this.service);

          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            this.$emit('Delete', this.service);
          }
        }
      ]
    }
  },

}
</script>

<template>
  <div :style="{position: 'relative'}">
    <pv-speed-dial :model="items" direction="down" mask :style="{ right: '-10px', top: '-15px' }"/>
    <pv-card class="custom-card">
      <template #title> {{service.name }}</template>
      <template #content>
        <div>
          <p style="font-weight:bold">{{ t('status') }}</p>
          <p>{{ room.status }}</p>
        </div>
      </template>
    </pv-card>

  </div>
</template>


<style scoped>
.custom-card {
  width: 18rem;
  height: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background-color: black;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.custom-card:hover {
  transform: scale(1.05);
}

.container-subtitle {
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 0.9rem;
  color: #666666;
}

.custom-card p {
  margin: 0;
  font-size: 1rem;
}

.custom-card p:first-of-type {
  font-weight: bold;
}

.flex {
  display: flex;
}

.gap-3 {
  gap: 0.75rem;
}

.w-full {
  width: 100%;
}

.mt-1 {
  margin-top: 0.25rem;
}
</style>