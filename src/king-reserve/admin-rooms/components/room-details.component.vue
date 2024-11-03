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
      this.roomService.getRoomById(this.$route.params.roomId).then((response) => {
        this.room = Room.toDisplayableRoom(response.data);
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