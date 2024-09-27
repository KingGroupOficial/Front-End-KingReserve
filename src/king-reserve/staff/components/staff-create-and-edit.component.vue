<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";
export default {
  name: "staff-create-and-edit.component",
  components: { createAndEdit },
  props: {
    item: null,
    item2:null,
    visible: Boolean,
    statuses: Array
  },
  data() {
    return {
      submitted: false
    }
  },
  methods:{
    getSeverity(status) {
      switch (status) {
        case 'Applied':
          return 'success';
        case 'Not applied':
          return 'info';
        default:
          return null;
      }
    },
    canceledEventHandler() {
      this.$emit('canceled');
    },
    savedEventHandler() {
      console.log(this.item);
      this.submitted = true;
      this.updateItem();
      // Verificar si los campos requeridos están llenos
      if (this.item.name && this.item.campaigns_id && this.item.name && this.item.last_name && this.item.email && this.item.on_job_status && this.item.job_description) {
        this.$emit('saved', this.item);
      }
    },
    updateItem() {
      if (!this.item.origin) {
        this.item.origin = {};
      }
      this.item.origin = this.item2;
      console.log(this.item);
    }

  }
}
</script>

<template>
  <create-and-edit :entity="item" :visible="visible" entityName="Staff" @canceled="canceledEventHandler" @saved="savedEventHandler">
    <template #content>
      <div class="p-fluid">
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="ID">ID</label>
            <pv-input-text id="ID" v-model="item.id"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="campaigns_id">Campaign ID</label>
            <pv-input-text id="campaigns_id" v-model="item.campaigns_id" :class="{'p-invalid': submitted && !item.name}"/>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="item.name" :class="{'p-invalid': submitted && !item.name}"/>
            <small v-if="submitted && !item.name" class="p-invalid">Name is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="last_name">Last Name</label>
            <input id="last_name" v-model="item.last_name" class="p-inputtext p-component" type="text"/>
            <small v-if="submitted && !item.last_name" class="p-invalid">Name is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="email">Email</label>
            <input id="email" v-model="item.email" class="p-inputtext p-component" type="text"/>
            <small v-if="submitted && !item.email" class="p-invalid">Email is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="on_job_status">Job Status</label>
            <pv-input-text id="on_job_status" v-model="item.on_job_status" :class="{'p-invalid': submitted && !item.code}"/>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="job_description">Job Description</label>
            <pv-input-text id="job_description" v-model="item.job_description" :class="{'p-invalid': submitted && !item.code}"/>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="date_start">  </label>
            <input id="date_start" v-model="item.date_start" class="p-inputtext p-component" type="date"/>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="date_end">  </label>
            <input id="date_end" v-model="item.date_end" class="p-inputtext p-component" type="date"/>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>
