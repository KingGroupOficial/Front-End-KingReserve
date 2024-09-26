<script>

import {Room} from "@/king-reserve/admin-rooms/model/room.entity.js";

export default {
  name: "room-view",
  components: {},
  props:{
    room: Room
  },
  data() {

    return {
      items: [
        {
          label: 'Update',
          icon: 'pi pi-pencil',
          command: () => {
            this.$emit('Edit', this.room);
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            this.$emit('Delete', this.room);
          }
        }
      ]
    }

  },
  methods:{
    viewPersons(){
      this.$emit('viewPersons', this.room);
    }
  }
}
</script>

<template>
  <div :style="{ position: 'relative'} ">

    <pv-speed-dial :model="items" direction="down" mask :style="{ right: '-10px', top: '-15px' }" />

    <pv-card class="custom-card">
      <template #title>{{room.name}}</template>

      <template #subtitle>
        <div class="container-subtitle">
          <p style="font-weight:bold">Area:</p>
          <p>{{room.area}}</p>
        </div>
      </template>

      <template #content>
        <div>
          <p style="font-weight:bold">Status</p>
          <p>{{room.status}}</p>
        </div>
      </template>

      <template #footer>
        <div class="flex gap-3 mt-1">
          <pv-button label="View Persons" class="w-full" @click="viewPersons" />
        </div>
      </template>
    </pv-card>

  </div>
</template>

<style scoped>
.custom-card {
  width: 20rem;
  height: 20rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
}
.container-subtitle {
  display: flex;
  gap: 5px;
}
</style>
