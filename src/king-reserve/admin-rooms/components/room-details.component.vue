<script>
import { useI18n } from 'vue-i18n';
import { RoomsApiService } from "@/king-reserve/admin-rooms/services/rooms-api.service.js";
import { Room } from "@/king-reserve/admin-rooms/model/room.entity.js";
import PersonManagement from "@/king-reserve/admin-persons/pages/person-management.component.vue";

export default {
  name: "room-details",
  components: { PersonManagement },
  setup() {
    const { t } = useI18n();
    return { t };
  },
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
      console.log("soy el id del room",this.$route.params.roomId);
      console.log("soy el id de la reserva",this.$route.params.reservationId);
      this.roomService.getById(this.$route.params.reservationId,this.$route.params.roomId).then((response) => {
        console.log(response.data);
        let _room = response.data;
        this.room = Room.toDisplayableRoom(_room);
      });
    }

  }
};
</script>

<template>
  <div class="container">
  <div class="principal-container">
    <h2>{{ t('roomDetails') }}: {{ room.name }}</h2>
    <person-management :room-id="room.id"/>
  </div>
  </div>
</template>

<style scoped>
.principal-container {
  padding: 20px;
}
.container {
  background-color: var(--main-bg-color);
}
</style>