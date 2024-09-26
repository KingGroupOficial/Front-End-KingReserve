<script>
import ReserveView from "@/king-reserve/admin-reserve/components/reserve-view.vue";
import { ReserveApiService } from "@/king-reserve/admin-reserve/services/reserve-api.service.js";
import { Reservation } from "@/king-reserve/admin-reserve/model/reserve.entity.js";
import ReserveCreateAndEditComponent from "@/king-reserve/admin-reserve/components/reserve-create-and-edit.component.vue";
import FilterPageComponent from "@/king-reserve/admin-reserve/pages/filter-page.component.vue";

export default {
  name: "reserve-management",
  components: { FilterPageComponent, ReserveView, ReserveCreateAndEditComponent },
  data() {
    return {
      title: { singular: 'Reservation', plural: 'Reservations' },
      reservation: {},
      reservations: [],
      allReservations: [],
      reservationService: null,
      selectedReservations: [],
      isVisibleCard: false,
      isEdit: false,
      submitted: false,
      deleteFlag: false,
      visibleFilter: false,
      wasFilter: false
    };
  },
  created() {
    this.reservationService = new ReserveApiService();
    this.reservationService.getAll().then((response) => {
      const reservations = response.data;
      if (Array.isArray(reservations)) {
        this.reservations = reservations;
        this.allReservations = reservations;
      }
    }).catch(error => {
      console.error("Failed to fetch reservations:", error);
    });
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({ severity: "contrast", summary: "Success", detail: message, life: 3000 });
    },
    handleViewMore(reservation) {
      this.$router.push({ name: 'reserveDetails', params: { reservationId: reservation.id } });
    },
    findIndexById(id) {
      return this.reservations.findIndex((reservation) => reservation.id === id);
    },
    onFilterSelected() {
      this.visibleFilter = !this.visibleFilter;
    },
    onNewItemEventHandler() {
      this.reservation = {};
      this.submitted = false;
      this.isEdit = false;
      this.isVisibleCard = true;
    },
    onEditItemEventHandler(item) {
      this.reservation = item;
      this.submitted = false;
      this.isEdit = true;
      this.isVisibleCard = true;
    },
    onCanceledEventHandler() {
      this.submitted = false;
      this.isEdit = false;
      this.isVisibleCard = false;
    },
    onSavedEventHandler(item) {
      this.submitted = true;
      if (this.reservation.name.trim()) {
        if (item.id) {
          this.updateReservation();
        } else {
          this.createReservation();
        }
      }
      this.isVisibleCard = false;
      this.isEdit = false;
    },
    toggleSelection(reservation) {
      const index = this.selectedReservations.findIndex(r => r.id === reservation.id);
      if (index > -1) {
        this.selectedReservations.splice(index, 1);
      } else {
        this.selectedReservations.push(reservation);
      }
    },
    deleteAction() {
      this.deleteFlag = !this.deleteFlag;
    },
    deleteSelection() {
      if (this.selectedReservations) {
        this.selectedReservations.forEach((reservation) => {
          this.reservationService.delete(reservation.id).then(() => {
            this.reservations = this.reservations.filter(r => r.id !== reservation.id);
          });
        });
      }
      this.deleteFlag = !this.deleteFlag;
      this.allReservations = [...this.reservations];
    },
    onDeleteItemEventHandler(item) {
      this.reservation = item;
      this.deleteReservation();
    },
    createReservation() {
      this.reservation = Reservation.fromDisplayableReservation(this.reservation);
      this.reservation.condition = 'Active';
      this.reservationService.create(this.reservation).then((response) => {
        this.reservation = Reservation.toDisplayableReservation(response.data);
        this.reservations.push(this.reservation);
        this.notifySuccessfulAction("Reservation Created");
      });
      this.allReservations = [...this.reservations];
    },
    updateReservation() {
      this.reservation = Reservation.fromDisplayableReservation(this.reservation);
      this.reservationService.update(this.reservation.id, this.reservation)
          .then((response) => {
            this.reservations[this.findIndexById(response.data.id)] = Reservation.toDisplayableReservation(response.data);
            this.notifySuccessfulAction("Reservation Updated");
          });
      this.allReservations = [...this.reservations];
    },
    deleteReservation() {
      this.reservationService.delete(this.reservation.id)
          .then(() => {
            this.reservations = this.reservations.filter((r) => r.id !== this.reservation.id);
            this.reservation = {};
            this.notifySuccessfulAction("Reservation Deleted");
          });
      this.allReservations = [...this.reservations];
    },
    onFilter(value) {
      if (typeof value !== 'string') {
        return;
      }
      const searchValue = value.toLowerCase();
      this.reservations = this.allReservations.filter(reservation => {
        return reservation.name && reservation.name.toLowerCase().includes(searchValue);
      });
      this.wasFilter = true;
    },
    onFilterForCondition(value) {
      const conditionValue = value.toLowerCase();
      this.reservations = this.allReservations.filter(reservation => {
        return reservation.condition.toLowerCase() === conditionValue;
      });
      this.wasFilter = true;
    },
    onFilterForDuration(object) {
      this.reservations = this.allReservations.filter(reservation => {
        return reservation.duration > object.minValue && reservation.duration < object.maxValue;
      });
      this.wasFilter = true;
    },
    onFilterDate(object) {
      this.reservations = this.allReservations.filter(reservation => {
        return reservation.dateStart >= object.initial && reservation.dateEnd <= object.final;
      });
      this.wasFilter = true;
    },
    closeFilter() {
      this.reservations = this.allReservations;
      this.wasFilter = false;
    }
  }
}
</script>

<template>
  <section class="reserve-section" :style="{ position: 'relative'} ">
    <pv-toast />
    <div class="container-title">
      <p class="container-title--title">My Reservations</p>
      <div>
        <div class="button-group-desktop" v-if="!deleteFlag">
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-plus" label="New" severity="secondary" @click="onNewItemEventHandler"></pv-button>
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-filter" label="Filter" severity="secondary" text @click="onFilterSelected"></pv-button>
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-trash" severity="secondary" text @click="deleteAction"></pv-button>
        </div>

        <div class="button-group-mobile" v-if="!deleteFlag">
          <pv-button class="mr-2 icon-button btn-action" icon="pi pi-plus" severity="secondary" @click="onNewItemEventHandler"></pv-button>
          <pv-button class="mr-2 icon-button btn-action" icon="pi pi-filter" severity="secondary" @click="onFilterSelected"></pv-button>
          <pv-button class="mr-2 icon-button btn-action" icon="pi pi-trash" severity="secondary" @click="deleteAction"></pv-button>
        </div>

        <div v-if="deleteFlag">
          <pv-button class="mr-2 title-button btn-action" icon="pi pi-trash" severity="secondary" label="Delete" @click="deleteSelection"></pv-button>
          <pv-button class="mr-2 title-button btn-action" severity="secondary" v-if="deleteFlag" text label="Cancel" @click="deleteAction"></pv-button>
        </div>

      </div>
    </div>

    <div class="on-filter flex display-flex align-items-center flex-direction-row justify-content-space-between " v-if="wasFilter">
      <div class="filter-total-results flex gap-3">
        <p>Total Results:</p>
        <p>{{ reservations.length.toString() }}</p>
      </div>
      <pv-button class="mr-2 title-button" icon="pi pi-times" text rounded severity="secondary" @click="closeFilter"></pv-button>
    </div>

    <div class="container-cards">
      <div v-for="reservation in reservations" :key="reservation.id" class="card">
        <div class="flex align-items-center" v-if="deleteFlag">
          <pv-checkbox v-model="selectedReservations" :inputId="reservation.id" name="reservation" :value="reservation.id"></pv-checkbox>
        </div>
        <reserve-view :reserve="reservation" @viewMore="handleViewMore" @Edit="onEditItemEventHandler" @Delete="onDeleteItemEventHandler" />
      </div>
    </div>

    <reserve-create-and-edit-component
        :item="reservation"
        :visible="isVisibleCard"
        :edit="isEdit"
        @canceled="onCanceledEventHandler"
        @saved="onSavedEventHandler"
    />
    <filter-page-component :visible="visibleFilter" @canceled="onFilterSelected" @filtered="onFilter" @filteredCondition="onFilterForCondition" @filteredDuration="onFilterForDuration" @filteredDate="onFilterDate" />
  </section>
</template>

<style scoped>
.reserve-section {
  padding: 20px;
}
.on-filter {
  width: 100%;
  justify-content: space-between;
}
.container-cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 50px;
  height: 100vh;
  gap: 20px;
  width: 100%;
}
.container-title {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
  border-bottom: #32C793 1px solid;
}
.title-button {
  height: 50px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
}

.btn-action:hover {
  color: #32C793;
}

.filter-total-results p {
  font-weight: 500;
}

.button-group-desktop {
  display: none;
}

.button-group-mobile {
  display: flex;
}

.container-title--title {
  font-weight: 500;
  font-size: 25px;
}

@media (min-width: 750px) {
  .container-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0;
  }
  .button-group-desktop {
    display: flex;
  }

  .button-group-mobile {
    display: none;
  }
}
</style>