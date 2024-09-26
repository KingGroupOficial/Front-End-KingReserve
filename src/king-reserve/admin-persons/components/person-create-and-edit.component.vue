<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "person-create-and-edit",
  components: { createAndEdit },
  props: {
    item: null,
    item2: null,  // Información adicional relacionada con la persona (como origen o habitación)
    visible: Boolean,
    statuses: Array
  },
  data() {
    return {
      submitted: false,
      dialogSize: 'default'
    }
  },
  created() {
    console.log("Person create and edit", this.item);
  },
  watch: {
    visible: function(newValue) {
      if (!newValue) {
        this.resetForm();
      }
    }
  },
  mounted() {
    this.detectScreenSize();
    window.addEventListener('resize', this.detectScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.detectScreenSize);
  },
  methods: {
    resetForm() {
      this.submitted = false;
    },
    detectScreenSize() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        this.dialogSize = 'standard';
      } else if (screenWidth >= 768 && screenWidth < 1200) {
        this.dialogSize = 'large';
      } else {
        this.dialogSize = 'extra-large';
      }
    },
    canceledEventHandler() {
      this.$emit('canceled');
    },
    savedEventHandler() {
      this.updateItem();
      if (this.item.name && this.item.age && this.item.date) {
        this.$emit('saved2', this.item);
      }
      this.submitted = true;
    },
    updateItem() {
      if (!this.item.origin) {
        this.item.origin = {};
      }
      this.item.origin = this.item2;  // Vincula el item2 al origen
      console.log(this.item);
    }
  }
}
</script>

<template>
  <create-and-edit :entity="this.item" :visible="visible" entityName="Person" @canceled="canceledEventHandler" @saved="savedEventHandler" :size="this.dialogSize">
    <template #content>
      <div class="p-fluid container-dialog">
        <div class="container-form">
          <div class="field mt-5 container-field">
            <label for="name">Name</label>
            <pv-float-label>
              <pv-input-text id="name" v-model="this.item.name" :class="{'p-invalid': submitted && !this.item.name}"/>
              <small v-if="submitted && !this.item.name" class="p-invalid">Name is required.</small>
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="age">Age</label>
            <pv-float-label>
              <pv-input-number id="age" v-model="this.item.age" :class="{'p-invalid': submitted && !this.item.age}"/>
              <small v-if="submitted && !this.item.age" class="p-invalid">Age is required.</small>
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="date">Date of Birth</label>
            <pv-float-label>
              <pv-calendar inputId="date" v-model="this.item.date" showIcon iconDisplay="input" :class="{'p-invalid': submitted && !this.item.date}"/>
              <small v-if="submitted && !this.item.date" class="p-invalid">Date is required.</small>
            </pv-float-label>
          </div>

          <!-- Datos relacionados con la ubicación/origen de la persona -->
          <div class="field mt-5 container-field">
            <label for="department">Department</label>
            <pv-float-label>
              <pv-input-text id="department" v-model="this.item2.department" class="p-inputtext p-component" />
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="city">City</label>
            <pv-float-label>
              <pv-input-text id="city" v-model="this.item2.city" class="p-inputtext p-component" />
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="district">District</label>
            <pv-float-label>
              <pv-input-text id="district" v-model="this.item2.district" class="p-inputtext p-component" />
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="observations">Additional Information</label>
            <pv-float-label>
              <pv-textarea v-model="this.item.observations" autoResize rows="10" cols="30" />
            </pv-float-label>
          </div>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<style scoped>
.container-field label {
  margin-bottom: 5px;
}
@media (min-width: 1200px) {
  .container-dialog {
    display: flex;
    gap: 20px;
    width: 100%;
    height: 100%;
  }
  .container-form {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
  }
  .container-field {
    width: 100%;
  }
}
</style>
