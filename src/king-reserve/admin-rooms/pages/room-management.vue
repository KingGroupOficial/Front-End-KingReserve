<template>
  <section>
    <pv-toast />
    <div class="container-title">
      <h2 class="title">{{ t('roomManagement.myRooms') }}</h2>
      <div>
        <div class="button-group-desktop" v-if="!deleteFlag">
          <pv-button class="mr-2 title-button btn-new" icon="pi pi-plus" :label="t('roomManagement.new')" severity="secondary" @click="onNewItemEventHandler"></pv-button>
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-filter" :label="t('roomManagement.filter')" severity="secondary" text @click="onFilterSelected"></pv-button>
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-trash" severity="secondary" text @click="deleteAction"></pv-button>
        </div>
        <div class="button-group-mobile" v-if="!deleteFlag">
          <pv-button class="mr-2 icon-button btn-new" icon="pi pi-plus" severity="secondary" @click="onNewItemEventHandler"></pv-button>
          <pv-button class="mr-2 icon-button btn-action" icon="pi pi-filter" severity="secondary" text></pv-button>
          <pv-button class="mr-2 icon-button btn-action" icon="pi pi-trash" severity="secondary" text @click="deleteAction"></pv-button>
        </div>
        <div v-if="deleteFlag">
          <pv-button class="mr-2 title-button" icon="pi pi-trash" severity="success" :label="t('roomManagement.delete')" @click="deleteSelection"></pv-button>
          <pv-button class="mr-2 title-button" severity="secondary" v-if="deleteFlag" :label="t('roomManagement.cancel')" @click="deleteAction"></pv-button>
        </div>
      </div>
    </div>
    <div class="on-filter flex display-flex align-items-center flex-direction-row justify-content-space-between" v-if="wasFilter !== false">
      <div class="filter-total-results flex gap-3">
        <p v-if="rooms">{{ t('roomManagement.totalResults') }}:</p>
        <p v-if="rooms">{{ rooms.length.toString() }}</p>
      </div>
      <pv-button class="mr-2 title-button" icon="pi pi-times" text rounded severity="secondary" @click="closeFilter"></pv-button>
    </div>
    <div class="container-cards">
      <div v-for="room in rooms" :key="room.id">
        <div class="flex align-items-center" v-if="deleteFlag">
          <pv-checkbox v-model="selectedRooms" :inputId="room.id" name="room" :value="room.id"></pv-checkbox>
        </div>
        <room-view :room="room" @viewDetails="handleViewRoomDetails" @Edit="onEditItemEventHandler" @Delete="onDeleteItemEventHandler" />
      </div>
    </div>
  </section>
  <room-create-and-edit
      :item="room"
      :visible="isVisibleCard"
      :edit="isEdit"
      @canceled="onCanceledEventHandler"
      @saved="onSavedEventHandler($event)" />

  <div class="app-content">
    <template>
      <div class="card flex justify-content-center">
        <pv-sidebar v-model:visible="visibleFilter"  position="right" style="width: 25rem;">
          <room-filter-page @closeFilter="onFilterSelected"
                            @filter1="onFilter($event)"
                            @filter-status="onFilterForStatus($event)"
                            @filter-area="onFilterArea($event)"
          />
        </pv-sidebar>
      </div>
    </template>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import RoomView from "../components/room-view.component.vue";
import { Room } from "../model/room.entity.js";
import RoomFilterPage from "./room-filter-page.component.vue";
import RoomCreateAndEdit from "@/king-reserve/admin-rooms/components/room-create-and-edit.vue";
import { RoomsApiService } from "@/king-reserve/admin-rooms/services/rooms-api.service.js";

export default {
  name: "room-management",
  components: { RoomFilterPage, RoomCreateAndEdit, RoomView },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      room: {},
      roomsService: null,
      rooms: [], // Asegúrate de inicializar como un array vacío
      allRooms: [], // array for filter
      selectedRooms: [], // array for delete selected
      isVisibleCard: false,
      isEdit: false,
      submitted: false,
      deleteFlag: false,
      visibleFilter: false,
      wasFilter: false
    };
  },
  created() {
    this.roomsService = new RoomsApiService();
    this.getRooms();
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({ severity: "contrast", summary: "Success", detail: message, life: 3000 });
    },
    findIndexById(id) {
      return this.rooms.findIndex((room) => room.id === id);
    },
    onFilterSelected() {
      this.visibleFilter = !this.visibleFilter;
    },
    handleViewRoomDetails(room) {
      this.$router.push({
        name: "personList",
        params: { reservationId: room.reservationId }
      });
    },
    getRooms() {
      this.roomsService.getAll().then((response) => {
        console.log(response.data);
        let rooms = response.data;
        this.rooms = rooms
            .filter(room => room.reservationId == this.$route.params.reservationId)
            .map(room => new Room(room.id, room.name, room.area, room.status, room.reservationId));
        console.log("Rooms fetched", this.rooms);
        this.allRooms = [...this.rooms];
      });
    },
    onNewItemEventHandler() {
      this.room = {};
      this.submitted = false;
      this.isEdit = false;
      this.isVisibleCard = true;
      console.log(`Creating new room, visible: ${this.isVisibleCard}`);
    },
    onEditItemEventHandler(item) {
      this.room = item;
      this.submitted = false;
      this.isEdit = true;
      this.isVisibleCard = true;
      console.log(`Editing room, visible: ${this.isVisibleCard}`);
    },
    onCanceledEventHandler() {
      this.submitted = false;
      this.isEdit = false;
      this.isVisibleCard = false;
      console.log(`Canceled operation, visible: ${this.isVisibleCard}`);
    },
    onSavedEventHandler(item) {
      this.submitted = true;
      if (this.room.name.trim()) {
        if (item.id) {
          console.log("Updating room");
          this.updateRoom();
        } else {
          console.log("Creating room");
          this.createRoom();
          console.log("Finished creating room");
        }
      }
      this.isVisibleCard = false;
      console.log(`Room dialog closed, visible: ${this.isVisibleCard}`);
      this.isEdit = false;
    },
    deleteAction() {
      this.deleteFlag = !this.deleteFlag;
    },
    deleteSelection() {
      if (this.selectedRooms) {
        this.selectedRooms.forEach((room) => {
          console.log(this.selectedRooms);
          this.roomsService.delete(room.id).then(() => {
            this.rooms = this.rooms.filter((t) => t.id !== room.id);
          });
        });
      }
      this.deleteFlag = !this.deleteFlag;
      this.allRooms = [...this.rooms];
    },
    onDeleteItemEventHandler(item) {
      this.room = item;
      this.deleteRoom();
    },
    createRoom() {
      this.room = Room.fromDisplayableRoom(this.room);
      this.room.reservationId = this.$route.params.reservationId;
      this.roomsService.create(this.room).then((response) => {
        this.room = Room.toDisplayableRoom(response.data);
        this.rooms.push(this.room);
        this.notifySuccessfulAction("Room Created");
      });
      this.allRooms = [...this.rooms];
    },
    updateRoom() {
      this.room = Room.fromDisplayableRoom(this.room);
      this.roomsService.update(this.room.id, this.room).then((response) => {
        this.rooms[this.findIndexById(response.data.id)] = Room.toDisplayableRoom(response.data);
        this.notifySuccessfulAction("Room Updated");
      });
      this.allRooms = [...this.rooms];
    },
    deleteRoom() {
      this.roomsService.delete(this.room.id).then(() => {
        this.rooms = this.rooms.filter((t) => t.id !== this.room.id);
        this.room = {};
        this.notifySuccessfulAction("Room Deleted");
      });
      this.allRooms = [...this.rooms];
    },
    onFilter(value) {
      if (typeof value !== 'string') {
        return;
      }
      const searchValue = value.toLowerCase();
      this.rooms = this.allRooms.filter(room => {
        return room.name && room.name.toLowerCase().includes(searchValue);
      });
      this.wasFilter = true;
    },
    onFilterForStatus(value) {
      const statusValue = value.toLowerCase();
      this.rooms = this.allRooms.filter(room => {
        return room.status.toLowerCase() === statusValue;
      });
      this.wasFilter = true;
    },
    onFilterArea(object) {
      if (object.maxValue === object.minValue) {
        this.rooms = this.allRooms.filter(room => {
          return room.area === object.maxValue;
        });
      } else {
        this.rooms = this.allRooms.filter(room => {
          return room.area >= object.minValue && room.area <= object.maxValue;
        });
      }
      this.wasFilter = true;
    },
    closeFilter() {
      this.rooms = this.allRooms;
      this.wasFilter = false;
    },
    onFilterByReservation(reservationId) {
      this.rooms = this.allRooms.filter(room => room.reservationId === reservationId);
      this.wasFilter = true;
    }
  }
};
</script>

<style scoped>
.container-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 100px;
  height: 100vh;
  gap: 20px;
  width: 100%;
}

.title {
  font-weight: 500;
  font-size: 25px;
}

.container-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #4d3b29; /* Marrón oscuro */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.title-button, .icon-button {
  background-color: #f4a261; /* Naranja */
  border: none;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.title-button:hover, .icon-button:hover {
  background-color: #e76f51; /* Naranja oscuro al hover */
}

.btn-action:hover {
  color: #e76f51; /* Cambia el texto a naranja oscuro al hover */
}

.btn-new:hover {
  color: #e76f51; /* Cambia el texto a naranja oscuro al hover */
}

.button-group-desktop {
  display: none;
}

.button-group-mobile {
  display: flex;
}

.on-filter {
  width: 100%;
  justify-content: space-between;
}

@media (min-width: 750px) {
  .container-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0px;
  }

  .button-group-desktop {
    display: flex;
  }

  .button-group-mobile {
    display: none;
  }
}
</style>