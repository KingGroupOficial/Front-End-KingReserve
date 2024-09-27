<template>
  <div class="person-management">
    <h3>Persons Registered in the Hotel</h3>
    <button @click="addPerson">Add Person</button>
    <div v-if="loading">Loading persons...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!loading && Object.keys(personsByRoom).length > 0">
      <div v-for="(persons, roomId) in personsByRoom" :key="roomId" class="room-group">
        <h4>Staying in: {{ rooms[roomId]?.name || 'Unknown' }}</h4>
        <div class="cards-container">
          <div v-for="person in persons" :key="person.id" class="card">
            <h4>{{ person.name }}</h4>
            <p><strong>Age:</strong> {{ person.age }}</p>
            <p><strong>Date:</strong> {{ person.date }}</p>
            <p><strong>Country:</strong> {{ person.country || 'Not specified' }}</p>
            <p><strong>City:</strong> {{ person.city || 'Not specified' }}</p>
            <p><strong>District:</strong> {{ person.district || 'Not specified' }}</p>
            <p><strong>Room:</strong> {{ rooms[person.roomId]?.name || 'Unknown' }}</p>
            <p><strong>Observations:</strong> {{ person.observations || 'No observations' }}</p>
            <button @click="editPerson(person)">Edit</button>
            <button @click="deletePerson(person.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!loading && Object.keys(personsByRoom).length === 0">No persons found.</div>

    <person-create-and-edit-component
        :item="person"
        :visible="isVisibleCard"
        :rooms="roomsArray"
        @canceled="onCanceledEventHandler"
        @saved="onSavedEventHandler"
    />
  </div>
</template>

<script>
import { PersonApiService } from "@/king-reserve/admin-persons/services/person-api.services.js";
import PersonCreateAndEditComponent from "@/king-reserve/admin-persons/components/person-create-and-edit.component.vue";
import { RoomsApiService } from "@/king-reserve/admin-rooms/services/rooms-api.service.js";

export default {
  name: "person-management",
  components: {PersonCreateAndEditComponent},
  data() {
    return {
      persons: [],
      person: {},
      rooms: {},
      roomsArray: [],
      loading: false,
      error: null,
      isVisibleCard: false,
      isEdit: false,
      submitted: false
    };
  },
  computed: {
    personsByRoom() {
      return this.persons.reduce((acc, person) => {
        if (!person.roomId) return acc;

        if (!acc[person.roomId]) {
          acc[person.roomId] = [];
        }
        acc[person.roomId].push(person);
        return acc;
      }, {});
    }
  },
  created() {
    this.personService = new PersonApiService();
    this.roomService = new RoomsApiService();
    this.fetchPersons();
  },
  methods: {
    async fetchPersons() {
      this.loading = true;
      this.error = null;

      try {
        const [personsResponse, roomsResponse] = await Promise.all([
          this.personService.getAll(),
          this.roomService.getAll()
        ]);

        this.persons = personsResponse.data;
        this.rooms = roomsResponse.data.reduce((acc, room) => {
          acc[room.id] = room;
          return acc;
        }, {});
        this.roomsArray = roomsResponse.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.error = "Failed to load data.";
      } finally {
        this.loading = false;
      }
    },
    addPerson() {
      this.person = {
        name: '',
        age: null,
        date: '',
        country: '',
        city: '',
        district: '',
        observations: '',
        roomId: null
      };
      this.isEdit = false;
      this.isVisibleCard = true;
    },
    editPerson(person) {
      this.person = {...person};
      this.isEdit = true;
      this.isVisibleCard = true;
    },
    async deletePerson(personId) {
      try {
        await this.personService.delete(personId);
        this.persons = this.persons.filter(person => person.id !== personId);
      } catch (error) {
        console.error("Error deleting person:", error);
        this.error = "Failed to delete person.";
      }
    },
    onCanceledEventHandler() {
      this.isEdit = false;
      this.isVisibleCard = false;
    },
    async onSavedEventHandler(person) {
      if (this.submitted) return; // Prevent multiple submissions
      this.submitted = true;

      if (this.validateForm()) {
        if (this.isEdit) {
          await this.updatePerson(person);
        } else {
          await this.createPerson(person);
        }
        this.isVisibleCard = false;
      }

      this.submitted = false; // Reset after saving
    },
    async createPerson(person) {
      const exists = this.persons.some(p => p.name === person.name && p.roomId === person.roomId);
      if (exists) {
        this.error = "This person already exists in this room.";
        return;
      }

      try {
        const response = await this.personService.create(person);
        this.persons.push(response.data);
      } catch (error) {
        console.error("Error creating person:", error);
        this.error = "Failed to create person.";
      }
    },
    async updatePerson(person) {
      try {
        const response = await this.personService.update(person.id, person);
        const index = this.persons.findIndex(p => p.id === person.id);
        if (index !== -1) {
          this.persons[index] = response.data;
        }
      } catch (error) {
        console.error("Error updating person:", error);
        this.error = "Failed to update person.";
      }
    },
    validateForm() {
      return this.person.name && this.person.age && this.person.date && this.person.roomId && this.person.country && this.person.city && this.person.district;
    }
  }
};
</script>

<style scoped>
.person-management {
  padding: 20px;
}

.room-group {
  margin-bottom: 20px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns */
  gap: 20px;
}

.card {
  background-color: #32C793;
  border: 1px solid #32C793;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card h4 {
  margin: 0 0 8px;
}

.error {
  color: red;
}
</style>
