<script>
import {Staff} from "../model/staff.entity.js"

export default {
  name: "staff-card",
  components: {},
  props: {
    staff: Staff,
  },

  computed: {
    cardColor(){
      switch (this.staff.on_job_status) {
        case 'Available':
          return { opacity: 1 }
        case 'Working':
          return { opacity: 0.5 }
        default:
          return { opacity: 1 }
      }
    },
  },

}
</script>

<template>
  <div class="card-container">
    <pv-toast/>
    <pv-card class="custom-card" v-bind:style="cardColor">

      <template #header >
        <div class="card-header">
          <i class="pi pi-user" style="font-size: 2.5rem"></i>
        </div>
      </template>

      <template #title >
        <div class="card-title"> {{ staff.name + " " + staff.last_name }} </div>
      </template>

      <template #subtitle>
        <div> Work on Campaign: {{ staff.campaigns_id }} </div>
      </template>

      <template #content>
        <div>
          <p style="font-weight: bold">Job Description:</p>
          {{ staff.job_description }}
        </div>
        <div>
          <br/>
          <p style="font-weight: bold">Status:</p>
          <pv-avatar :label="staff.on_job_status" class="mr-2" style="background-color: #34d399; color: #020617; width: 10rem;" />
        </div>
      </template>

      <template #footer>
        <div class="gap-3 mt-1">
          <p style="font-weight: bold">Email:</p>
          <pv-avatar :label="staff.email" class="mr-2" style="background-color: #34d399; color: #020617; width: 20rem;" />
        </div>
      </template>

    </pv-card>
  </div>

</template>

<style scoped>

.card-header{
  display: flex;
  justify-content: center;
  margin: 1rem;
}

.staff-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.card-container{
  position: relative;
}

.custom-card {
  overflow: hidden;
  margin: 0.5rem;
}

.card-title{
  font-size: 25px;
}

@media (min-width: 750px) {
  .custom-card {
    width: 30rem;
    height: 30rem;
  }
}

</style>