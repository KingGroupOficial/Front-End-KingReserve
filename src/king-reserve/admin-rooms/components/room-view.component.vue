<script>
import { useI18n } from 'vue-i18n';
import { Room } from "@/king-reserve/admin-rooms/model/room.entity.js";

export default {
  name: "room-view",
  components: {},
  props: {
    room: Room
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      items: [
        {
          label: this.t('update'),
          icon: 'pi pi-pencil',
          command: () => {
            this.$emit('Edit', this.room);
          }
        },
        {
          label: this.t('delete'),
          icon: 'pi pi-trash',
          command: () => {
            this.$emit('Delete', this.room);
          }
        }
      ]
    }
  },
  methods: {

    viewPersons() {
      this.$emit('viewPersons', this.room.id);
    }
  }
}
</script>

<template>
  <div :style="{ position: 'relative'} ">
    <pv-speed-dial :model="items" direction="down" mask :style="{ right: '-10px', top: '-15px' }" />
    <pv-card class="custom-card">
      <template #title>{{ room.name }}</template>
      <template #subtitle>
        <div class="container-subtitle">
          <p style="font-weight:bold">{{ t('area') }}:</p>
          <p>{{ room.area }}</p>
        </div>
      </template>
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