<script>
import {RoomsApiService} from "@/king-reserve/admin-rooms/services/rooms-api.service.js";
import PersonManagement from "@/king-reserve/admin-persons/pages/person-management.component.vue";
import {ReserveApiService} from "@/king-reserve/admin-reserve/services/reserve-api.service.js";
import {Room} from "@/king-reserve/admin-rooms/model/room.entity.js";

export default {
  name: "room-details.component",
  components: {PersonManagement},
  data() {
    return {
      room: null,
      roomService: null,
    };
  },
  created() {
    this.roomService = new RoomsApiService();
    this.reservationService = new ReserveApiService();
    this.findRoom();
  },
  methods: {
    findRoom() {
      console.log("Fetching room ID:", this.$route.params.roomId, typeof this.$route.params.roomId);
      this.roomService.getById(this.$route.params.roomId).then((response) => {
        console.log(response.data);
        let _room = response.data;
        this.room = Room.toDisplayableRoom(_room);
      });
    }
  }
}
</script>

<template>
  <div class="principal-container">
    <h2>{{ this.room.name }}</h2>
  </div>
  <person-management :room-id="this.room.name" />
</template>

<style scoped>
.principal-container {
  padding: 20px;
}
</style>
