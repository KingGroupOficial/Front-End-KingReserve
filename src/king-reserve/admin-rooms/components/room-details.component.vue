<script>
import { RoomsApiService } from "@/king-reserve/admin-rooms/services/rooms-api.service.js";
import { Room } from "@/king-reserve/admin-rooms/model/room.entity.js";

export default {
  name: "room-details",
  components: {person},
  data() {
    return {
      room: null,
      roomService: null
    };
  },
  created() {
    this.roomService = new RoomsApiService();
    this.findRoom();
  },
  methods: {
    findRoom() {
      this.roomService.getRoomById(this.$route.params.roomId).then((response) => {
        this.room = Room.toDisplayableRoom(response.data);
      });
    }
  }
};
</script>

<template>
  <div class="principal-container">
    <h2>{{ room.name }}</h2>
    <person-management :room-id="room.id"/>
  </div>
</template>

<style scoped>
.principal-container {
  padding: 20px;
}
</style>