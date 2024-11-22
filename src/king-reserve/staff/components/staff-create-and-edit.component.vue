<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";
export default {
  name: "staff-create-and-edit.component",
  components: { createAndEdit },
  props: {
    item: {
      type: Object,
      default: () => ({
        reserves_id: '',
        name: '',
        last_name: '',
        job_description: '',
        email: '',
        on_job_status: ''
      })
    },
    item2: null,
    visible: Boolean,
    statuses: Array
  },
  data() {
    return {
      submitted: false
    };
  },
  methods: {
    canceledEventHandler() {
      this.$emit("canceled");
    },
    savedEventHandler() {
      this.submitted = true;

      // Verificar si todos los campos requeridos están completos
      if (
          this.item.reserves_id &&
          this.item.name &&
          this.item.last_name &&
          this.item.email &&
          this.item.on_job_status &&
          this.item.job_description
      ) {
        // Crear un objeto con solo los campos requeridos
        const validItem = {
          reserves_id: this.item.reserves_id,
          name: this.item.name,
          last_name: this.item.last_name,
          job_description: this.item.job_description,
          email: this.item.email,
          on_job_status: this.item.on_job_status
        };

        this.$emit("saved", validItem); // Emitir solo los datos válidos
      } else {
        console.error("Error: Hay campos requeridos vacíos.");
      }
    }
  }
};
</script>

<template>
  <create-and-edit
      :entity="item"
      :visible="visible"
      entityName="Staff"
      @canceled="canceledEventHandler"
      @saved="savedEventHandler"
  >
    <template #content>
      <div class="p-fluid">
        <!-- reserves_id -->
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="reserves_id">Reserves ID</label>
            <pv-input-text
                id="reserves_id"
                v-model="item.reserves_id"
                :class="{ 'p-invalid': submitted && !item.reserves_id }"
            />
            <small
                v-if="submitted && !item.reserves_id"
                class="p-invalid"
            >Reserves ID is required.</small>
          </pv-float-label>
        </div>

        <!-- Name -->
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text
                id="name"
                v-model="item.name"
                :class="{ 'p-invalid': submitted && !item.name }"
            />
            <small
                v-if="submitted && !item.name"
                class="p-invalid"
            >Name is required.</small>
          </pv-float-label>
        </div>

        <!-- Last Name -->
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="last_name">Last Name</label>
            <pv-input-text
                id="last_name"
                v-model="item.last_name"
                :class="{ 'p-invalid': submitted && !item.last_name }"
            />
            <small
                v-if="submitted && !item.last_name"
                class="p-invalid"
            >Last Name is required.</small>
          </pv-float-label>
        </div>

        <!-- Email -->
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="email">Email</label>
            <pv-input-text
                id="email"
                v-model="item.email"
                :class="{ 'p-invalid': submitted && !item.email }"
            />
            <small
                v-if="submitted && !item.email"
                class="p-invalid"
            >Email is required.</small>
          </pv-float-label>
        </div>

        <!-- On Job Status -->
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="on_job_status">Job Status</label>
            <pv-input-text
                id="on_job_status"
                v-model="item.on_job_status"
                :class="{ 'p-invalid': submitted && !item.on_job_status }"
            />
            <small
                v-if="submitted && !item.on_job_status"
                class="p-invalid"
            >Job Status is required.</small>
          </pv-float-label>
        </div>

        <!-- Job Description -->
        <div class="p-field mt-5">
          <pv-float-label>
            <label for="job_description">Job Description</label>
            <pv-input-text
                id="job_description"
                v-model="item.job_description"
                :class="{ 'p-invalid': submitted && !item.job_description }"
            />
            <small
                v-if="submitted && !item.job_description"
                class="p-invalid"
            >Job Description is required.</small>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>
