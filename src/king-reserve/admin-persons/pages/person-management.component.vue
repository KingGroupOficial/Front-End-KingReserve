<script>

import {PersonApiService} from "@/king-reserve/admin-persons/services/person-api.services.js";

export default {
  name: "person-management",
  props: {
    roomId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      persons: []
    };
  },
  created() {
    this.personService = new PersonApiService();
    this.fetchPersons();
  },
  methods: {
    fetchPersons() {
      this.personService.getByRoomId(this.roomId).then((response) => {
        this.persons = response.data;
      });
    }
  }
};
</script>

<template>
  <div class="person-management">
    <h3>Persons in Room</h3>
    <ul>
      <li v-for="person in persons" :key="person.id">{{ person.name }}</li>
    </ul>
  </div>
</template>

<style scoped>
.person-management {
  padding: 20px;
}
</style>