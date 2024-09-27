<script>
import StaffCard from "../components/staff-card.component.vue";
import {StaffApiService} from "../services/staff-api.service.js";
import {Staff} from "../model/staff.entity.js"

export default {
  name: "staff-view",
  components: {StaffCard},
  props: {},
  data() {
    return {
      title: {singular: 'Staff', plural: 'Staffs'},
      staff: {},
      staffs: [],
      staffService: null,
      isVisibleCard: false,
      visibleFilter:false
    }

  },
  created() {
    this.staffService = new StaffApiService();
    this.staffService.getAll().then((response) => {
      console.log(response.data);
      let staffs = response.data;
      this.staffs = staffs.map((staff) => {
        return Staff.fromDisplayableStaff({
          id: staff.id,
          campaigns_id: staff.campaigns_id,
          name: staff.name,
          last_name: staff.last_name,
          email: staff.email,
          on_job_status: staff.on_job_status,
          job_description: staff.job_description,
          date_start: staff.dateStart,
          date_end: staff.dateEnd,
        });
      });

    });
  },
  methods: {

  }
}
</script>

<template>
  <section class="staff-section">
    <pv-toast/>

    <!-- Title -->
    <div class="container-title">
      <h2 class="title"> Staff View </h2>
    </div>

    <!-- Toolbar -->
    <pv-toolbar class="mb-4">

      <!-- Edit Button -->
      <template #center>
        <router-link to="/staff-manage" rel="noopener">
          <pv-button class="mr-2" icon="pi pi-pencil" label="Edit" raised/>
        </router-link>
      </template>

    </pv-toolbar>


    <!-- Cards -->
    <div class="container-staff">
      <div v-for="staff in staffs" :key="staff.id" class="card">
        <staff-card :staff="staff"/>
      </div>
    </div>

  </section>

</template>

<style scoped>

.staff-section {
  padding: 20px;
  position: relative;
}

.container-staff {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 100px;
  height: 100vh;
  gap: 20px;
  width: 100%;
}

.container-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

}

</style>