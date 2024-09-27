<template>
  <div class="person-management">
    <h3 class="title">Persons Registered in the Hotel</h3>
    <div class="custom-toolbar">
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search by name..." />
      </div>
      <div class="right-toolbar">
        <button class="custom-button" @click="addPerson">Add Person</button>
        <button class="custom-button" @click="exportToPDF">Export PDF</button>
      </div>
    </div>

    <div v-if="loading">Loading persons...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!loading && Object.keys(filteredPersonsByRoom).length > 0">
      <div v-for="(persons, roomId) in filteredPersonsByRoom" :key="roomId" class="room-group">
        <h4>Staying in: {{ rooms[roomId]?.name || 'Unknown' }}</h4>
        <br>
        <div class="cards-container">
          <div v-for="person in persons" :key="person.id" class="card" :style="{ backgroundColor: getRoomColor(person.roomId) }">
            <h4>{{ person.name }}</h4>
            <p><strong>Age:</strong> {{ person.age }}</p>
            <p><strong>Date:</strong> {{ person.date }}</p>
            <p><strong>Country:</strong> {{ person.country || 'Not specified' }}</p>
            <p><strong>City:</strong> {{ person.city || 'Not specified' }}</p>
            <p><strong>District:</strong> {{ person.district || 'Not specified' }}</p>
            <p class="footer"><strong>Staying at:</strong> {{ rooms[person.roomId]?.name || 'Rooms a stranger' }}</p>
            <div class="button-container">
              <button class="button" @click="editPerson(person)"><i class="pi pi-pencil"></i> Edit</button>
              <button class="button" @click="deletePerson(person.id)"><i class="pi pi-trash"></i> Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!loading && Object.keys(filteredPersonsByRoom).length === 0">No persons found.</div>

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
import jsPDF from "jspdf";

export default {
  name: "person-management",
  components: { PersonCreateAndEditComponent },
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
      submitted: false,
      searchQuery: ''
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
    },
    filteredPersonsByRoom() {
      if (!this.searchQuery) {
        return this.personsByRoom;
      }
      const query = this.searchQuery.toLowerCase();
      return Object.keys(this.personsByRoom).reduce((acc, roomId) => {
        const filteredPersons = this.personsByRoom[roomId].filter(person =>
            person.name.toLowerCase().includes(query)
        );
        if (filteredPersons.length) {
          acc[roomId] = filteredPersons;
        }
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
    getRoomColor(roomId) {
      const colors = {
        8: '#A3E4D7', // Light green
        7: '#76D7C4', // Medium green
        5: '#48C9B0', // Teal
      };
      return colors[roomId] || '#E0E0E0'; // Default color if not found
    },
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
      this.person = { ...person };
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
    },
    exportToPDF() {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Persons Registered in the Hotel', 105, 22, { align: 'center' }); // Centered title
      doc.setFontSize(12);

      const headers = ['Name', 'Age', 'Date', 'Country', 'City', 'District'];
      const data = this.persons.map(person => [
        person.name,
        person.age,
        person.date,
        person.country || 'Not specified',
        person.city || 'Not specified',
        person.district || 'Not specified'
      ]);

      const startX = 10;
      const startY = 40;
      const rowHeight = 10;
      const colWidths = [40, 20, 30, 40, 40, 40];

      // Draw headers
      headers.forEach((header, index) => {
        doc.text(header, startX + colWidths.slice(0, index).reduce((a, b) => a + b, 0), startY);
      });

      // Draw data rows
      data.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          doc.text(cell.toString(), startX + colWidths.slice(0, colIndex).reduce((a, b) => a + b, 0), startY + (rowIndex + 1) * rowHeight);
        });
      });

      doc.save('persons.pdf');
    }

  }
};
</script>

<style scoped>
.person-management {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.custom-toolbar {
  display: flex;
  justify-content: space-between; /* Distribute space between elements */
  align-items: center; /* Align items vertically */
  margin-bottom: 20px;
}

.search-bar {
  flex: 1; /* Take up remaining space */
}

.search-bar input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
}

.right-toolbar {
  display: flex;
  gap: 10px; /* Space between buttons */
}

.room-group {
  margin-bottom: 40px;
  text-align: center;
  border: 2px solid #27AE60; /* Add border to room group */
  border-radius: 12px; /* Optional: Add border radius */
  padding: 20px; /* Optional: Add padding */
}

.room-group h4 {
  font-size: 24px;
  color: white;
  margin-bottom: 10px;
  transition: font-size 0.3s ease, color 0.3s ease;
}

.room-group h4:hover {
  font-size: 26px;
  color: #27AE60; /* Cambia a un color dorado al pasar el ratón */
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  justify-items: center;
}

.card {
  border: 1px solid #27AE60;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card:hover {
  transform: scale(1.05);
}

.card h4 {
  margin: 0 0 10px;
  font-size: 20px;
  color: black;
}

.card p {
  margin: 5px 0;
  color: black;
}

.footer {
  margin-top: auto;
  font-weight: bold;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.button {
  background-color: #27AE60;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin: 5px;
  flex: 1;
}

.button:hover {
  background-color: #1E824C;
  transform: scale(1.05);
}

.error {
  color: red;
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}

.custom-button {
  font-weight: bold;
  padding: 12px 20px;
  background-color: #28a745;
  border: none;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
  margin: 0 5px;
  flex: 1;
  min-width: 120px;
  font-size: 16px;
}

h3 {
  color: #32C793;
}

</style>