<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "reserve-create-and-edit",
  components:{ createAndEdit},
  props:{
    item:null,
    visible: Boolean,
    edit:Boolean
  },
  data() {
    return {
      submitted: false,
      dateError: ''
    }
  },
  methods:{
    canceledEventHandler() {
      this.$emit('canceled');
      this.submitted = false;
    },
    savedEventHandler() {
      console.log("Enviar de reserve",this.item);
      this.submitted = true;
      //&& this.item.objective && this.validateDates()
       if (this.item.name&& this.item.objective && this.validateDates()) {
        console.log("si entre");
          this.$emit('saved2', this.item);
       }
    },
    validateDates() {
      if (this.item.dateEnd <= this.item.dateStart) {
        this.dateError = 'End date must be after start date.';
        return false;
      }
      this.dateError = '';
      return true;
    }
  }
}
</script>

<template>
  <create-and-edit :entity="item" :edit="edit" :visible="visible" entityName="Campaign" @canceled="canceledEventHandler" @saved="savedEventHandler">
    <template #content>

      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="name">Name</label>
            <pv-input-text id="name" v-model="item.name" :class="{'p-invalid': submitted && !item.name}"/>
            <small v-if="submitted && !item.name" class="p-invalid">Name is required.</small>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <pv-float-label>
            <label for="objective">Mensaje</label>
            <pv-input-text id="objective" v-model="item.objective" :class="{'p-invalid': submitted && !item.objective}"/>
            <small v-if="submitted && !item.objective" class="p-invalid">Mensaje is required.</small>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <pv-float-label>
            <pv-calendar inputId="date-start" v-model="item.dateStart" showIcon iconDisplay="input" />
            <label for="date-start">Date Start</label>
          </pv-float-label>
        </div>

        <div class="field mt-5">
          <pv-float-label>
            <pv-calendar inputId="date-end" v-model="item.dateEnd" showIcon iconDisplay="input" />
            <label for="date-end">Date End</label>
            <small v-if="submitted && dateError" class="p-invalid">{{ dateError }}</small>
          </pv-float-label>
        </div>

      </div>

    </template>
  </create-and-edit>

</template>

<style scoped>

</style>