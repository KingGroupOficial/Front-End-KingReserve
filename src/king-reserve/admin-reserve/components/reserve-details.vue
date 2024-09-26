<script>
import roomManagement from "@/king-reserve/admin-rooms/pages/room-management.vue";
import {ReserveApiService} from "@/king-reserve/admin-reserve/services/reserve-api.service.js";

export default {
  name: "reserve-details",
  components:{roomManagement},
  data(){
    return {
      reserve: null,
      reserveService: null
    };
  },
  created(){
    this.reserveService = new ReserveApiService();
    this.findReserve();
  },
  watch:{
    '$route.params.reserveId': function(newVal, oldVal) {
      this.findReserve();
    }
  },
  methods: {
    findReserve() {
      this.reserveService.getById(this.$route.params.reservationId).then(response => {
        const reserveData = response.data;
        const startDate = new Date(reserveData.dateStart);
        const endDate = new Date(reserveData.dateEnd);

        this.reserve = {
          id: reserveData.id,
          dateStart: startDate,
          dateEnd: endDate,
          room: reserveData.room,
          user: reserveData.user,
          status: reserveData.status
        };
        console.log("Soy la reserva escogida", this.reserve);
      }).catch(error => {
        console.log("Error al cargar la reserva", error);
      });
    }
  }
}
</script>

<template>
  <div class="reserve-section">
    <div  class="container-title">
      <router-link to="/reserve">
        <pv-button icon="pi pi-arrow-left" class="title-button-2" rounded ></pv-button>
      </router-link>
      <h1 v-if="reserve" class="title">{{ reserve.name }}</h1>
    </div>

    <room-management />
  </div>

</template>

<style scoped>
.reserve-section{
  padding:20px;
}
.container-title{
  display:flex;
  flex-direction:column;
  align-items:start;
  gap:5px;
}

.title-button-2{
  border-radius: 15px;
  color:white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.title-button-2:hover {
  background-color: #27272a;
  color: #34d399;
}
.title{
  font-size:30px;
}
@media (min-width: 750px) {

  .container-title{
    flex-direction:row;
    align-items: center;
  }


}
</style>