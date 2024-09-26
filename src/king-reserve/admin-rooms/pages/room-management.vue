<script>
import RoomView from "../components/room-view.component.vue";
import {Room} from "../model/room.entity.js";
import RoomFilterPage from "./room-filter-page.component.vue";
import RoomCreateAndEdit from "@/king-reserve/admin-rooms/components/room-create-and-edit.vue";
import {RoomsApiService} from "@/king-reserve/admin-rooms/services/rooms-api.service.js";

export default {
  name: "room-management",
  components: { RoomFilterPage, RoomCreateAndEdit, RoomView },
  data() {
    return {
      room: {},
      roomsService: null,
      rooms: [],
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
        name: "roomDetails",
        params: { roomId: room.id }
      });
    },
    getRooms() {
      this.roomsService.getAll().then((response) => {
        console.log(response.data);
        let rooms = response.data;
        this.rooms = rooms.map(room => Room.toDisplayableRoom(room));
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
          this.roomsService.delete(room).then(() => {
            this.rooms = this.rooms.filter((r) => r.id !== room);
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

    // CRUD METHODS
    createRoom() {
      this.room = Room.fromDisplayableRoom(this.room);
      // Aggregate default values if necessary
      this.roomsService.create(this.room).then((response) => {
        this.room = Room.toDisplayableRoom(response.data);
        this.rooms.push(this.room);
        this.notifySuccessfulAction("Room Created");
      });
      console.log('Current rooms:', this.rooms);
      this.allRooms = [...this.rooms];
    },
    updateRoom() {
      this.room = Room.fromDisplayableRoom(this.room);
      this.roomsService.update(this.room.id, this.room)
          .then((response) => {
            this.rooms[this.findIndexById(response.data.id)] =
                Room.toDisplayableRoom(response.data);
            this.notifySuccessfulAction("Room Updated");
          });
      this.allRooms = [...this.rooms];
    },
    deleteRoom() {
      this.roomsService.delete(this.room.id)
          .then(() => {
            this.rooms = this.rooms.filter((t) => t.id !== this.room.id);
            this.room = {};
            this.notifySuccessfulAction("Room Deleted");
          });
      this.allRooms = [...this.rooms];
    },

    // Filter methods
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
          return room.area > object.minValue && room.area < object.maxValue;
        });
      } else {
        this.rooms = this.allRooms.filter(room => {
          return room.area > object.minValue;
        });
      }
      this.wasFilter = true;
    },
    closeFilter() {
      this.rooms = this.allRooms;
      this.wasFilter = false;
    }
  }
}
</script>

<template>
  <section>
    <pv-toast />
    <div class="container-title">
      <h2 class="title"> My Rooms</h2>
      <div>
        <div class="button-group-desktop" v-if="!deleteFlag">
          <pv-button class="mr-2 title-button btn-new" icon="pi pi-plus" label="New" severity="secondary" @click="onNewItemEventHandler"></pv-button>
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-filter" label="Filter" severity="secondary" text @click="onFilterSelected"></pv-button>
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-trash" severity="secondary" text @click="deleteAction"></pv-button>
        </div>
        <div class="button-group-mobile" v-if="!deleteFlag">
          <pv-button class="mr-2 icon-button btn-new" icon="pi pi-plus" severity="secondary" @click="onNewItemEventHandler"></pv-button>
          <pv-button class="mr-2 icon-button btn-action" icon="pi pi-filter" severity="secondary" text></pv-button>
          <pv-button class="mr-2 icon-button btn-action" icon="pi pi-trash" severity="secondary" text @click="deleteAction"></pv-button>
        </div>

        <div v-if="deleteFlag">
          <pv-button class="mr-2 title-button" icon="pi pi-trash" severity="success" label="Delete" @click="deleteSelection"></pv-button>
          <pv-button class="mr-2 title-button" severity="secondary" v-if="deleteFlag" label="Cancel" @click="deleteAction"></pv-button>
        </div>
      </div>
    </div>

    <div class="on-filter flex display-flex align-items-center flex-direction-row justify-content-space-between" v-if="wasFilter !== false">
      <div class="filter-total-results flex gap-3">
        <p> Total Results:</p>
        <p>{{rooms.length.toString()}}</p>
      </div>

      <pv-button class="mr-2 title-button" icon="pi pi-times" text rounded severity="secondary" @click="closeFilter"></pv-button>
    </div>

    <div class="container-cards">
      <div v-for="room in rooms" :key="room.id">
        <div class="flex align-items-center" v-if="deleteFlag">
          <pv-checkbox v-model="selectedRooms" :inputId="room.id" name="room" :value="room.id"></pv-checkbox>
        </div>
        <room-view :room="room" @viewDetails="handleViewRoomDetails" @Edit="onEditItemEventHandler" @Delete="onDeleteItemEventHandler"/>
      </div>
    </div>

    <room-create-and-edit
        :item="room"
        :visible="isVisibleCard"
        :edit="isEdit"
        @canceled="onCanceledEventHandler"
        @saved="onSavedEventHandler($event)"/>

    <div class="app-content">
      <template>
        <div class="card flex justify-content-center">
          <pv-sidebar v-model:visible="visibleFilter" position="right" style="width: 25rem;">
            <room-filter-page @closeFilter="onFilterSelected"
                              @filter1="onFilter($event)"
                              @filter-status="onFilterForStatus($event)"
                              @filter-area="onFilterArea($event)"
            />
          </pv-sidebar>
        </div>
      </template>
    </div>
  </section>
</template>
