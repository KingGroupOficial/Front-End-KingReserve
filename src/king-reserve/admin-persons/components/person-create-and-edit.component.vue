<template>
  <create-and-edit
      :entity="this.item"
      :visible="visible"
      entityName="Person"
      @canceled="canceledEventHandler"
      @saved="savedEventHandler"
      :size="this.dialogSize"
  >
    <template #content>
      <div class="p-fluid container-dialog">
        <div class="container-form">
          <div class="field mt-5 container-field">
            <label for="name">Name</label>
            <pv-float-label>
              <pv-input-text
                  id="name"
                  v-model="this.item.name"
                  :class="{ 'p-invalid': submitted && !this.item.name }"
              />
              <small v-if="submitted && !this.item.name" class="p-invalid">
                Name is required.
              </small>
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="age">Age</label>
            <pv-float-label>
              <pv-input-text
                  id="age"
                  v-model="this.item.age"
                  type="number"
                  :class="{ 'p-invalid': submitted && !this.item.age }"
              />
              <small v-if="submitted && !this.item.age" class="p-invalid">
                Age is required.
              </small>
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="date">Date</label>
            <pv-float-label>
              <pv-input-text
                  id="date"
                  v-model="this.item.date"
                  type="date"
                  :class="{ 'p-invalid': submitted && !this.item.date }"
              />
              <small v-if="submitted && !this.item.date" class="p-invalid">
                Date is required.
              </small>
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="room">Room</label>
            <pv-float-label>
              <pv-dropdown
                  id="room"
                  v-model="this.item.roomId"
                  :options="rooms"
                  optionLabel="name"
                  optionValue="id"
                  :class="{ 'p-invalid': submitted && !this.item.roomId }"
              />
              <small v-if="submitted && !this.item.roomId" class="p-invalid">
                Room is required.
              </small>
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="country">Country</label>
            <pv-float-label>
              <pv-input-text
                  id="country"
                  v-model="this.item.country"
                  :class="{ 'p-invalid': submitted && !this.item.country }"
              />
              <small v-if="submitted && !this.item.country" class="p-invalid">
                Country is required.
              </small>
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="city">City</label>
            <pv-float-label>
              <pv-input-text
                  id="city"
                  v-model="this.item.city"
                  :class="{ 'p-invalid': submitted && !this.item.city }"
              />
              <small v-if="submitted && !this.item.city" class="p-invalid">
                City is required.
              </small>
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="district">District</label>
            <pv-float-label>
              <pv-input-text
                  id="district"
                  v-model="this.item.district"
                  :class="{ 'p-invalid': submitted && !this.item.district }"
              />
              <small v-if="submitted && !this.item.district" class="p-invalid">
                District is required.
              </small>
            </pv-float-label>
          </div>

          <div class="field mt-5 container-field">
            <label for="observations">Observations</label>
            <pv-float-label>
              <pv-input-text
                  id="observations"
                  v-model="this.item.observations"
              />
            </pv-float-label>
          </div>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>

<script>
import CreateAndEdit from "@/shared/components/create-and-edit.component.vue";

export default {
  name: "person-create-and-edit-component",
  components: {CreateAndEdit},
  props: {
    item: Object,
    visible: Boolean,
    rooms: Array,
  },
  data() {
    return {
      dialogSize: "medium",
      submitted: false,
    };
  },
  methods: {
    canceledEventHandler() {
      this.$emit("canceled");
    },
    savedEventHandler() {
      this.submitted = true;
      if (this.validateForm()) {
        this.$emit("saved", this.item);
      }
    },
    validateForm() {
      return this.item.name && this.item.age && this.item.date && this.item.roomId && this.item.country && this.item.city && this.item.district;
    },
  },
};
</script>

<style scoped>
.container-dialog {
  margin: 20px;
}

.container-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Ensure 2 columns */
}

.container-field {
  width: calc(50% - 10px); /* Two fields per row with space */
  margin-bottom: 16px;
}

.p-invalid {
  color: red;
}

.field {
  margin-bottom: 16px;
}
</style>
