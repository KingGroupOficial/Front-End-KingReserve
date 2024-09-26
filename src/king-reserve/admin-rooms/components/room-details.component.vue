<script>
import {RoomsApiService} from "@/king-reserve/admin-rooms/services/rooms-api.service.js";
import PersonManagement from "@/king-reserve/admin-persons/pages/person-management.component.vue";

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
    this.reservationService = new ReservationApiService();
    this.findRoom();
  },
  methods: {
    findRoom() {
      console.log("Fetching room ID:", this.$route.params.roomId, typeof this.$route.params.roomId);
      this.roomService.getById(this.$route.params.roomId).then((response) => {
        console.log(response.data);
        this.room = response.data;
      });
    }
  }
}
</script>

<template>
  <div class="principal-container">
    <h2>{{ room?.name }}</h2>
  </div>
  <person-management :room-id="room?.id" />
</template>

<style scoped>
.principal-container {
  padding: 20px;
}
</style>
