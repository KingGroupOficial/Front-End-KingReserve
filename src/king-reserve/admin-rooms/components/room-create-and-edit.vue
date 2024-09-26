<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "room-create-and-edit",
  components: {createAndEdit},
  props:{
    item:null,
    visible: Boolean,
    edit:Boolean
  },
  data() {
    return {
      submitted: false,
      dateError: '',
      statusOptions:[
        { name: 'Empty'},
        { name: 'Busy' },
        { name: 'Full' }
      ]
    }
  },
  methods:{
    canceledEventHandler() {
      this.$emit('canceled');
      this.submitted = false;
    },
    savedEventHandler() {
      console.log("Enviar de room",this.item);
      this.submitted = true;
      if (this.item.name && this.item.area) {
        console.log("si entre");
        this.$emit('saved2', this.item);
      }
    }

  }
}
</script>

<template>
  <create-and-edit :entity="item" :edit="edit" :visible="visible" entityName="Room" @canceled="canceledEventHandler" @saved="savedEventHandler">
  <template #content>

    <div class="p-fluid">
      <div class="field mt-5">
        <label for="name" class="label-input">Name</label>
        <pv-float-label>

          <pv-input-text id="name" v-model="item.name" :class="{'p-invalid': submitted && !item.name}"/>
          <small v-if="submitted && !item.name" class="p-invalid">Name is required.</small>
        </pv-float-label>
      </div>

      <div class="field mt-5">
        <label for="area" class="label-input">Area</label>
        <pv-float-label >
          <pv-input-number  v-model="item.area" inputId="area" mode="decimal" showButtons :step="10" :min="0"/>
          <small v-if="!submitted" class="down-input-label">Area is in meters.</small>
          <small v-if="submitted && !item.area" class="p-invalid">Area is required.</small>
        </pv-float-label>
      </div>

      <div class="field mt-5">
        <label for="status" class="label-input">Status</label>
        <pv-float-label>
          <pv-dropdown v-model="item.status" inputId="status" :options="statusOptions" optionLabel="name" placeholder="Select a Status" :class="{'p-invalid': submitted && !item.status}"/>
          <small v-if="submitted && !item.status" class="p-invalid">Status is required.</small>
        </pv-float-label>
      </div>
    </div>
  </template>
  </create-and-edit>
</template>

<style scoped>
.label-input{
  font-size:15px;
}
.down-input-label{
  color:#CACEDE;
  font-weight:300;
}
</style>