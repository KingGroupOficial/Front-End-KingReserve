
<template>
  <create-and-edit
      :entity="items"
      :edit="edit"
      :visible="visible"
      entityName="Service"
      @canceled="canceledEventHandler"
      @saved="saveEventHandler"
  >
    <template #content>
      <div class="p-fluid">
        <div class="field mt-5">
          <label for="name" class="label-input">Service Name</label>
          <pv-float-label>
            <pv-input-text
                id="name"
                v-model="items.name"
                :class="{'p-invalid': submitted && !items.name}"
            />
            <small v-if="submitted && !items.name" class="p-invalid">Service Name is required.</small>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <label for="status" class="label-input">Status</label>
          <pv-float-label>
            <pv-dropdown
                v-model="items.status"
                inputId="status"
                :options="statusOptions"
                placeholder="Select a Status"
                :class="{'p-invalid': submitted && !items.status}"
            />
            <small v-if="submitted && !items.status" class="p-invalid">Status is required.</small>
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<script>
import createAndEdit from "../../../shared/components/create-and-edit.component.vue";

export default {
  name: "service-create-and-edit",
  components: { createAndEdit },
  props: {
    items: Object,
    visible: Boolean,
    edit: Boolean,
  },
  data() {
    return {
      submitted: false,
      statusOptions: ['active', 'inactive'],
    };
  },
  methods: {
    canceledEventHandler() {
      this.$emit('canceled');
      this.submitted = false;
    },
    saveEventHandler() {
      this.submitted = true;
      if (this.items.name && this.items.status) {
        this.$emit('saved', this.items);
      }
    },
  },
};
</script>

<style scoped>
.label-input {
  font-size: 15px;
}
</style>
